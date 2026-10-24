import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  addDoc,
  getDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  db,
  auth,
  googleProvider,
  handleFirestoreError,
  OperationType,
  testConnection,
  cleanFirestoreData,
} from '../firebase';
import {
  Product,
  ServiceItem,
  GalleryItem,
  CartItem,
  Inquiry,
  StoreSettings,
  DEFAULT_STORE_SETTINGS,
} from '../types';

interface StoreContextType {
  products: Product[];
  services: ServiceItem[];
  gallery: GalleryItem[];
  inquiries: Inquiry[];
  settings: StoreSettings;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  user: User | null;
  isAdmin: boolean;
  isAuthLoading: boolean;
  isDataLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  // Product actions
  saveProduct: (productData: Omit<Product, 'id'>, id?: string) => Promise<string>;
  removeProduct: (productId: string) => Promise<void>;
  // Service actions
  saveService: (serviceData: Omit<ServiceItem, 'id'>, id?: string) => Promise<string>;
  removeService: (serviceId: string) => Promise<void>;
  // Gallery actions
  saveGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<string>;
  removeGalleryItem: (itemId: string) => Promise<void>;
  // Settings & profile
  saveSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  // Inquiries
  sendInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateInquiryStatus: (inquiryId: string, status: Inquiry['status']) => Promise<void>;
  deleteInquiry: (inquiryId: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const ADMIN_EMAILS = [
  'christianakobundu09@gmail.com',
  'prolordaichristian001@gmail.com',
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chrisakons_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chrisakons_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to sync cart to storage', e);
    }
  }, [cart]);

  // Auth state listener
  useEffect(() => {
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const email = currentUser.email?.toLowerCase() || '';
        const isWhitelisted = ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === email);
        if (isWhitelisted) {
          setIsAdmin(true);
        } else {
          // Check admins doc
          try {
            const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
            setIsAdmin(adminDoc.exists());
          } catch {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to Settings
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'settings', 'general'),
      (snap) => {
        if (snap.exists()) {
          setSettings({ ...DEFAULT_STORE_SETTINGS, ...snap.data() } as StoreSettings);
        } else {
          setSettings(DEFAULT_STORE_SETTINGS);
        }
      },
      (err) => {
        console.warn('Settings load error (using default):', err.message);
      }
    );
    return () => unsub();
  }, []);

  // Listen to Products
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'products'),
      (snap) => {
        const items: Product[] = [];
        snap.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as Product);
        });
        setProducts(items);
        setIsDataLoading(false);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'products');
        setIsDataLoading(false);
      }
    );
    return () => unsub();
  }, []);

  // Listen to Services
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'services'),
      (snap) => {
        const items: ServiceItem[] = [];
        snap.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as ServiceItem);
        });
        setServices(items);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'services');
      }
    );
    return () => unsub();
  }, []);

  // Listen to Gallery
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'gallery'),
      (snap) => {
        const items: GalleryItem[] = [];
        snap.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as GalleryItem);
        });
        // Sort by order or createdAt
        items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setGallery(items);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'gallery');
      }
    );
    return () => unsub();
  }, []);

  // Listen to Inquiries (admin only)
  useEffect(() => {
    if (!isAdmin) {
      setInquiries([]);
      return;
    }

    const unsub = onSnapshot(
      collection(db, 'inquiries'),
      (snap) => {
        const items: Inquiry[] = [];
        snap.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as Inquiry);
        });
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setInquiries(items);
      },
      (err) => {
        console.warn('Inquiries listener error:', err.message);
      }
    );
    return () => unsub();
  }, [isAdmin]);

  // Cart Helpers
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, item) =>
      acc + (item.product.discountedPrice || item.product.price) * item.quantity,
    0
  );

  // Authentication actions
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (email: string, pass: string) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const logoutUser = async () => {
    await signOut(auth);
  };

  // Product CRUD
  const saveProduct = async (productData: Omit<Product, 'id'>, id?: string): Promise<string> => {
    const cleanId = id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const docRef = doc(db, 'products', cleanId);

    try {
      const payload = cleanFirestoreData({
        ...productData,
        updatedAt: now,
        ...(id ? {} : { createdAt: now }),
      });
      await setDoc(docRef, payload, { merge: true });
      return cleanId;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `products/${cleanId}`);
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${productId}`);
    }
  };

  // Service CRUD
  const saveService = async (serviceData: Omit<ServiceItem, 'id'>, id?: string): Promise<string> => {
    const cleanId = id || `srv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const docRef = doc(db, 'services', cleanId);

    try {
      const payload = cleanFirestoreData({
        ...serviceData,
        updatedAt: now,
        ...(id ? {} : { createdAt: now }),
      });
      await setDoc(docRef, payload, { merge: true });
      return cleanId;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `services/${cleanId}`);
    }
  };

  const removeService = async (serviceId: string) => {
    try {
      await deleteDoc(doc(db, 'services', serviceId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `services/${serviceId}`);
    }
  };

  // Gallery CRUD
  const saveGalleryItem = async (item: Omit<GalleryItem, 'id'>): Promise<string> => {
    const cleanId = `gal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const docRef = doc(db, 'gallery', cleanId);

    try {
      const payload = cleanFirestoreData({
        ...item,
        order: item.order ?? Date.now(),
        createdAt: now,
      });
      await setDoc(docRef, payload);
      return cleanId;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `gallery/${cleanId}`);
    }
  };

  const removeGalleryItem = async (itemId: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', itemId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `gallery/${itemId}`);
    }
  };

  // Settings
  const saveSettings = async (newSettings: Partial<StoreSettings>) => {
    try {
      const payload = cleanFirestoreData({
        ...settings,
        ...newSettings,
        updatedAt: new Date().toISOString(),
      });
      await setDoc(doc(db, 'settings', 'general'), payload, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings/general');
    }
  };

  // Inquiries
  const sendInquiry = async (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const cleanId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    try {
      const payload = cleanFirestoreData({
        ...inquiryData,
        status: 'new',
        createdAt: now,
      });
      await setDoc(doc(db, 'inquiries', cleanId), payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `inquiries/${cleanId}`);
    }
  };

  const updateInquiryStatus = async (inquiryId: string, status: Inquiry['status']) => {
    try {
      await updateDoc(doc(db, 'inquiries', inquiryId), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `inquiries/${inquiryId}`);
    }
  };

  const deleteInquiry = async (inquiryId: string) => {
    try {
      await deleteDoc(doc(db, 'inquiries', inquiryId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `inquiries/${inquiryId}`);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        services,
        gallery,
        inquiries,
        settings,
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        user,
        isAdmin,
        isAuthLoading,
        isDataLoading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logoutUser,
        saveProduct,
        removeProduct,
        saveService,
        removeService,
        saveGalleryItem,
        removeGalleryItem,
        saveSettings,
        sendInquiry,
        updateInquiryStatus,
        deleteInquiry,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
