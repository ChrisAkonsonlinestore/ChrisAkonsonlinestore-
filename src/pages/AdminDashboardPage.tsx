import React, { useState, useRef } from 'react';
import {
  ShoppingBag,
  Wrench,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Camera,
  Check,
  X,
  ExternalLink,
  Phone,
  Mail,
  Shield,
  LogOut,
  Save,
  AlertCircle,
  Eye,
  Star,
  RefreshCw,
  Search,
  MessageCircle,
} from 'lucide-react';
import { deleteField } from 'firebase/firestore';
import { useStore } from '../context/StoreContext';
import { formatNaira, compressImageFile } from '../utils/format';
import { Product, ServiceItem, GalleryItem, AvailabilityStatus } from '../types';

interface AdminDashboardPageProps {
  onNavigate: (page: string, params?: any) => void;
  initialTab?: string;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
  initialTab = 'products',
}) => {
  const {
    products,
    services,
    gallery,
    inquiries,
    settings,
    isAdmin,
    user,
    logoutUser,
    saveProduct,
    removeProduct,
    saveService,
    removeService,
    saveGalleryItem,
    removeGalleryItem,
    saveSettings,
    updateInquiryStatus,
    deleteInquiry,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'products' | 'services' | 'gallery' | 'inquiries' | 'settings'
  >((initialTab as any) || 'products');

  // Product Form state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscount, setProductDiscount] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productSku, setProductSku] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productAvailability, setProductAvailability] = useState<AvailabilityStatus>('Available');
  const [productMainImage, setProductMainImage] = useState('');
  const [productAdditionalImages, setProductAdditionalImages] = useState<string[]>([]);
  const [productSpecs, setProductSpecs] = useState('');
  const [productDelivery, setProductDelivery] = useState('');
  const [productFeatured, setProductFeatured] = useState(false);
  const [isProductSaving, setIsProductSaving] = useState(false);

  // Service Form state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceShortDesc, setServiceShortDesc] = useState('');
  const [serviceDetailedDesc, setServiceDetailedDesc] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [serviceAvailability, setServiceAvailability] = useState('Available');
  const [serviceImages, setServiceImages] = useState<string[]>([]);
  const [isServiceSaving, setIsServiceSaving] = useState(false);

  // Gallery Uploader state
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Settings state
  const [settingsForm, setSettingsForm] = useState(settings);
  const [isSettingsSaving, setIsSettingsSaving] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const profilePhotoInputRef = useRef<HTMLInputElement>(null);

  // File upload refs
  const productMainImageInputRef = useRef<HTMLInputElement>(null);
  const productAdditionalImageInputRef = useRef<HTMLInputElement>(null);
  const serviceImageInputRef = useRef<HTMLInputElement>(null);

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Access Restricted</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          You must be logged in as an authorized administrator ({' '}
          <strong className="text-slate-800">Christian Akobundu</strong> ) to access this dashboard.
        </p>
        <button
          onClick={() => onNavigate('login')}
          className="px-6 py-2.5 rounded-xl bg-[#0a1931] text-white text-xs font-bold"
        >
          Go to Admin Login
        </button>
      </div>
    );
  }

  // --- Handlers for Products ---
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductName('');
    setProductDesc('');
    setProductPrice('');
    setProductDiscount('');
    setProductCategory(settings.categories[0] || 'Electronics');
    setProductSku('');
    setProductStock('');
    setProductAvailability('Available');
    setProductMainImage('');
    setProductAdditionalImages([]);
    setProductSpecs('');
    setProductDelivery('');
    setProductFeatured(false);
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductName(p.name);
    setProductDesc(p.description);
    setProductPrice(p.price.toString());
    setProductDiscount(p.discountedPrice ? p.discountedPrice.toString() : '');
    setProductCategory(p.category);
    setProductSku(p.sku || '');
    setProductStock(p.stock !== undefined ? p.stock.toString() : '');
    setProductAvailability(p.availability);
    setProductMainImage(p.mainImage);
    setProductAdditionalImages(p.additionalImages || []);
    setProductSpecs(p.specs || '');
    setProductDelivery(p.deliveryInfo || '');
    setProductFeatured(!!p.featured);
    setShowProductModal(true);
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImageFile(file);
      setProductMainImage(dataUrl);
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    }
  };

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImageFile(file);
      setProductAdditionalImages((prev) => [...prev, dataUrl]);
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    }
  };

  const handleSaveProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !productPrice) {
      alert('Product name and price are required');
      return;
    }

    try {
      setIsProductSaving(true);
      const productPayload: Record<string, any> = {
        name: productName.trim(),
        description: productDesc.trim(),
        price: parseFloat(productPrice) || 0,
        category: productCategory || 'General',
        availability: productAvailability,
        mainImage: productMainImage,
        additionalImages: productAdditionalImages,
        featured: productFeatured,
      };

      if (productDiscount && productDiscount.trim() !== '') {
        productPayload.discountedPrice = parseFloat(productDiscount);
      } else if (editingProduct?.discountedPrice !== undefined) {
        productPayload.discountedPrice = deleteField();
      }

      if (productSku && productSku.trim() !== '') {
        productPayload.sku = productSku.trim();
      } else if (editingProduct?.sku !== undefined) {
        productPayload.sku = deleteField();
      }

      if (productStock && productStock.trim() !== '') {
        productPayload.stock = parseInt(productStock, 10);
      } else if (editingProduct?.stock !== undefined) {
        productPayload.stock = deleteField();
      }

      if (productSpecs && productSpecs.trim() !== '') {
        productPayload.specs = productSpecs.trim();
      } else if (editingProduct?.specs !== undefined) {
        productPayload.specs = deleteField();
      }

      if (productDelivery && productDelivery.trim() !== '') {
        productPayload.deliveryInfo = productDelivery.trim();
      } else if (editingProduct?.deliveryInfo !== undefined) {
        productPayload.deliveryInfo = deleteField();
      }

      await saveProduct(productPayload as any, editingProduct?.id);
      setShowProductModal(false);
    } catch (err: any) {
      alert('Error saving product: ' + err.message);
    } finally {
      setIsProductSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await removeProduct(id);
    }
  };

  // --- Handlers for Services ---
  const handleOpenAddService = () => {
    setEditingService(null);
    setServiceName('');
    setServiceShortDesc('');
    setServiceDetailedDesc('');
    setServicePrice('');
    setServiceCategory('General Service');
    setServiceAvailability('Available');
    setServiceImages([]);
    setShowServiceModal(true);
  };

  const handleOpenEditService = (s: ServiceItem) => {
    setEditingService(s);
    setServiceName(s.name);
    setServiceShortDesc(s.shortDesc);
    setServiceDetailedDesc(s.detailedDesc || '');
    setServicePrice(s.price || '');
    setServiceCategory(s.category || 'General Service');
    setServiceAvailability(s.availability || 'Available');
    setServiceImages(s.images || []);
    setShowServiceModal(true);
  };

  const handleServiceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImageFile(file);
      setServiceImages((prev) => [...prev, dataUrl]);
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    }
  };

  const handleSaveServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim() || !serviceShortDesc.trim()) {
      alert('Service name and short description are required.');
      return;
    }

    try {
      setIsServiceSaving(true);
      const servicePayload: Record<string, any> = {
        name: serviceName.trim(),
        shortDesc: serviceShortDesc.trim(),
        availability: serviceAvailability,
        images: serviceImages,
      };

      if (serviceDetailedDesc && serviceDetailedDesc.trim() !== '') {
        servicePayload.detailedDesc = serviceDetailedDesc.trim();
      } else if (editingService?.detailedDesc) {
        servicePayload.detailedDesc = deleteField();
      }

      if (servicePrice && servicePrice.trim() !== '') {
        servicePayload.price = servicePrice.trim();
      } else if (editingService?.price) {
        servicePayload.price = deleteField();
      }

      if (serviceCategory && serviceCategory.trim() !== '') {
        servicePayload.category = serviceCategory.trim();
      } else if (editingService?.category) {
        servicePayload.category = deleteField();
      }

      await saveService(servicePayload as any, editingService?.id);
      setShowServiceModal(false);
    } catch (err: any) {
      alert('Error saving service: ' + err.message);
    } finally {
      setIsServiceSaving(false);
    }
  };

  // --- Handlers for Gallery ---
  const handleDirectGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingGallery(true);
      const dataUrl = await compressImageFile(file);
      await saveGalleryItem({
        imageUrl: dataUrl,
        title: file.name.split('.')[0] || 'Showcase Photo',
        order: Date.now(),
      });
    } catch (err: any) {
      alert(err.message || 'Gallery upload failed');
    } finally {
      setIsUploadingGallery(false);
    }
  };

  // --- Handlers for Settings ---
  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImageFile(file);
      setSettingsForm((prev) => ({ ...prev, profileImageUrl: dataUrl }));
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    }
  };

  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSettingsSaving(true);
      await saveSettings(settingsForm);
      setSettingsSuccess(true);
      setTimeout(() => setSettingsSuccess(false), 3000);
    } catch (err: any) {
      alert('Error saving settings: ' + err.message);
    } finally {
      setIsSettingsSaving(false);
    }
  };

  // Stats calculation
  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.availability === 'Available').length;
  const totalServices = services.length;
  const totalGallery = gallery.length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner & Profile Bar */}
      <div className="bg-[#0a1931] text-white p-6 rounded-3xl border border-amber-400/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="/logo-white.png"
            alt="ChrisAkons STORE Logo"
            className="w-14 h-14 rounded-2xl object-contain bg-white p-1.5 shadow-lg shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Store Admin Portal
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live & Connected
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Christian Akobundu &bull; Owerri, Imo State, Nigeria &bull; {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>View Public Store</span>
          </button>
          <button
            onClick={logoutUser}
            className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition border border-rose-500/30"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          onClick={() => setActiveTab('products')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-amber-400 transition"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Products</span>
            <ShoppingBag className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#0a1931]">{totalProducts}</div>
          <div className="text-[11px] text-slate-500 mt-1">{availableProducts} in stock</div>
        </div>

        <div
          onClick={() => setActiveTab('services')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-amber-400 transition"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Services</span>
            <Wrench className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-[#0a1931]">{totalServices}</div>
          <div className="text-[11px] text-slate-500 mt-1">Active offerings</div>
        </div>

        <div
          onClick={() => setActiveTab('gallery')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-amber-400 transition"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Gallery</span>
            <ImageIcon className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-[#0a1931]">{totalGallery}</div>
          <div className="text-[11px] text-slate-500 mt-1">Uploaded photos</div>
        </div>

        <div
          onClick={() => setActiveTab('inquiries')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-amber-400 transition"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Inquiries</span>
            <MessageSquare className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-[#0a1931]">{inquiries.length}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">
            {newInquiries} unread messages
          </div>
        </div>

        <div
          onClick={() => setActiveTab('settings')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-amber-400 transition col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Store Config</span>
            <Settings className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-sm font-bold text-slate-800">Christian Akobundu</div>
          <div className="text-[11px] text-slate-500 mt-1">Owerri, Imo State</div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-[#0a1931] text-amber-400 shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
            activeTab === 'services'
              ? 'bg-[#0a1931] text-amber-400 shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Services ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
            activeTab === 'gallery'
              ? 'bg-[#0a1931] text-amber-400 shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Gallery ({gallery.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 relative ${
            activeTab === 'inquiries'
              ? 'bg-[#0a1931] text-amber-400 shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Customer Inquiries ({inquiries.length})</span>
          {newInquiries > 0 && (
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-[#0a1931] text-amber-400 shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Profile & Store Settings</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0a1931]">Product Catalogue</h2>
              <p className="text-xs text-slate-500">
                Add, modify prices, update photos, manage stock and toggle availability.
              </p>
            </div>
            <button
              onClick={handleOpenAddProduct}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a1931] text-xs font-bold shadow-md transition flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Products in Database</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Click "Add New Product" to create your first item with image, Naira price, and description.
              </p>
              <button
                onClick={handleOpenAddProduct}
                className="px-5 py-2 rounded-xl bg-[#0a1931] text-white text-xs font-bold"
              >
                Add First Product
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price (₦)</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Featured</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                            {p.mainImage ? (
                              <img
                                src={p.mainImage}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <ShoppingBag className="w-4 h-4 opacity-30" />
                              </div>
                            )}
                          </div>
                          <div>
                            <strong className="text-slate-900 block font-semibold">
                              {p.name}
                            </strong>
                            {p.sku && (
                              <span className="text-[10px] text-slate-400 font-mono">
                                SKU: {p.sku}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="p-4">{p.category}</td>

                        <td className="p-4 font-bold text-slate-900">
                          {formatNaira(p.discountedPrice || p.price)}
                          {p.discountedPrice && (
                            <span className="text-[10px] text-slate-400 line-through block font-normal">
                              {formatNaira(p.price)}
                            </span>
                          )}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.availability === 'Available'
                                ? 'bg-emerald-100 text-emerald-800'
                                : p.availability === 'Pre-order'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {p.availability}
                          </span>
                        </td>

                        <td className="p-4">
                          {p.stock !== undefined ? p.stock : 'Unlimited'}
                        </td>

                        <td className="p-4">
                          {p.featured ? (
                            <span className="text-amber-500 font-bold flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-current" /> Yes
                            </span>
                          ) : (
                            <span className="text-slate-400">No</span>
                          )}
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 text-slate-600 hover:text-amber-600 rounded-md hover:bg-slate-100"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SERVICES MANAGEMENT */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0a1931]">Services Management</h2>
              <p className="text-xs text-slate-500">
                Offer maintenance, procurement, repairs, or technical consulting.
              </p>
            </div>
            <button
              onClick={handleOpenAddService}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a1931] text-xs font-bold shadow-md transition flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>

          {services.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
              <Wrench className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Services Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Add your technical and consulting services so clients can request them on WhatsApp.
              </p>
              <button
                onClick={handleOpenAddService}
                className="px-5 py-2 rounded-xl bg-[#0a1931] text-white text-xs font-bold"
              >
                Add First Service
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    {s.images && s.images[0] && (
                      <img
                        src={s.images[0]}
                        alt={s.name}
                        className="w-full h-36 object-cover rounded-xl mb-2"
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                        {s.category || 'General'}
                      </span>
                      {s.price && (
                        <span className="text-xs font-bold text-slate-900">
                          {s.price}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-[#0a1931]">{s.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{s.shortDesc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenEditService(s)}
                      className="text-xs font-semibold text-amber-600 hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => removeService(s.id)}
                      className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GALLERY MANAGEMENT */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0a1931]">Showcase Gallery</h2>
              <p className="text-xs text-slate-500">
                Upload photos of products, store events, and customer deliveries.
              </p>
            </div>

            <div>
              <input
                type="file"
                ref={galleryFileInputRef}
                onChange={handleDirectGalleryUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => galleryFileInputRef.current?.click()}
                disabled={isUploadingGallery}
                className="px-5 py-2.5 rounded-xl bg-[#0a1931] hover:bg-[#12284c] text-white text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>{isUploadingGallery ? 'Compressing...' : 'Upload Photo'}</span>
              </button>
            </div>
          </div>

          {gallery.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
              <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Gallery Photos</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Upload photos to display in the public showcase gallery.
              </p>
              <button
                onClick={() => galleryFileInputRef.current?.click()}
                className="px-5 py-2 rounded-xl bg-amber-500 text-[#0a1931] text-xs font-bold"
              >
                Upload First Photo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm aspect-square"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Gallery item'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-3 text-white">
                    <button
                      onClick={() => removeGalleryItem(item.id)}
                      className="self-end p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-medium line-clamp-1">
                      {item.title || 'Showcase Image'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CUSTOMER INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0a1931]">Customer Inquiries</h2>
            <p className="text-xs text-slate-500">
              Private messages submitted through the website contact form.
            </p>
          </div>

          {inquiries.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
              <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Inquiries Received</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Customer contact form submissions will appear here privately for your review.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`p-6 rounded-2xl border bg-white shadow-sm transition space-y-3 ${
                    inq.status === 'new'
                      ? 'border-amber-400/80 ring-1 ring-amber-400/30'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-base font-bold text-[#0a1931]">
                          {inq.name}
                        </strong>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            inq.status === 'new'
                              ? 'bg-amber-100 text-amber-800'
                              : inq.status === 'replied'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {inq.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3 mt-1">
                        <a
                          href={`mailto:${inq.email}`}
                          className="hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{inq.email}</span>
                        </a>
                        {inq.phone && (
                          <a
                            href={`tel:${inq.phone}`}
                            className="hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{inq.phone}</span>
                          </a>
                        )}
                        <span>
                          {new Date(inq.createdAt).toLocaleDateString('en-NG', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {inq.phone && (
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${inq.name}, this is Christian Akobundu from chrisAkons online store in response to your inquiry.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
                          title="Reply on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() =>
                          updateInquiryStatus(
                            inq.id,
                            inq.status === 'new' ? 'read' : 'replied'
                          )
                        }
                        className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 font-medium"
                      >
                        Mark as {inq.status === 'new' ? 'Read' : 'Replied'}
                      </button>
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {inq.subject && (
                    <div className="text-xs font-semibold text-slate-800">
                      Subject: {inq.subject}
                    </div>
                  )}

                  <div className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl leading-relaxed whitespace-pre-line border border-slate-100">
                    {inq.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: PROFILE & STORE SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettingsSubmit} className="space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-[#0a1931]">Store Profile & Settings</h2>
              <p className="text-xs text-slate-500">
                Update Christian Akobundu's bio, profile photo, phone number, and store headlines.
              </p>
            </div>
            {settingsSuccess && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved Successfully!
              </span>
            )}
          </div>

          {/* Profile Photo Uploader */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-amber-400 bg-slate-800 shrink-0">
              <img
                src={settingsForm.profileImageUrl || '/christian-final.jpg'}
                alt="Christian Akobundu"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-bold text-slate-900 text-sm">
                Owner Profile Photo
              </h3>
              <p className="text-xs text-slate-500 max-w-md">
                Upload your portrait photo (JPG, PNG, or WebP). Displayed on the homepage and About Us page.
              </p>
              <div className="flex items-center gap-2 justify-center sm:justify-start pt-1">
                <input
                  type="file"
                  ref={profilePhotoInputRef}
                  onChange={handleProfilePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => profilePhotoInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-[#0a1931] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Upload / Replace Photo</span>
                </button>
                {settingsForm.profileImageUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      setSettingsForm((prev) => ({ ...prev, profileImageUrl: '' }))
                    }
                    className="px-3 py-2 text-xs text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={settingsForm.storeName}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, storeName: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Owner Name
              </label>
              <input
                type="text"
                value={settingsForm.ownerName}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, ownerName: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location
              </label>
              <input
                type="text"
                value={settingsForm.location}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, location: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number (Calls)
              </label>
              <input
                type="text"
                value={settingsForm.phone}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, phone: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={settingsForm.email}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, email: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Facebook Page Link
              </label>
              <input
                type="url"
                value={settingsForm.facebookUrl}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Homepage Hero Subtitle
            </label>
            <textarea
              rows={2}
              value={settingsForm.heroSubtitle}
              onChange={(e) =>
                setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })
              }
              className="w-full border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Meet the Owner Bio (Displayed on About page)
            </label>
            <textarea
              rows={5}
              value={settingsForm.bio}
              onChange={(e) =>
                setSettingsForm({ ...settingsForm, bio: e.target.value })
              }
              className="w-full border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 leading-relaxed"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSettingsSaving}
              className="px-8 py-3.5 rounded-xl bg-[#0a1931] hover:bg-[#12284c] text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>{isSettingsSaving ? 'Saving Changes...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      )}

      {/* PRODUCT ADD/EDIT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[#0a1931]">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveProductSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Watch Ultra 2 with Cellular"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Regular Price (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 45000"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Discounted Price (₦ Optional)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 38000"
                    value={productDiscount}
                    onChange={(e) => setProductDiscount(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    {settings.categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Other">Other Category</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Availability
                  </label>
                  <select
                    value={productAvailability}
                    onChange={(e) => setProductAvailability(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Available">Available (In Stock)</option>
                    <option value="Pre-order">Pre-order</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 15"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Main Image Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Main Product Image (Upload file from camera/gallery or paste URL)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={productMainImageInputRef}
                    onChange={handleMainImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => productMainImageInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0a1931] text-xs font-bold flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4 text-amber-600" />
                    <span>Upload Image</span>
                  </button>
                  <span className="text-xs text-slate-400">or URL:</span>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={productMainImage}
                    onChange={(e) => setProductMainImage(e.target.value)}
                    className="flex-1 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                  />
                </div>

                {productMainImage && (
                  <div className="mt-2 w-24 h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group">
                    <img
                      src={productMainImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setProductMainImage('')}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 text-white text-xs flex items-center justify-center font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Additional Images */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Additional Images (Gallery)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={productAdditionalImageInputRef}
                    onChange={handleAdditionalImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => productAdditionalImageInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Gallery Image</span>
                  </button>
                </div>

                {productAdditionalImages.length > 0 && (
                  <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
                    {productAdditionalImages.map((img, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 relative group shrink-0"
                      >
                        <img
                          src={img}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setProductAdditionalImages((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            )
                          }
                          className="absolute inset-0 bg-rose-600/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Key features, condition, warranty..."
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Specifications Table (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Battery: 5000mAh&#10;Color: Midnight Blue&#10;RAM: 8GB"
                  value={productSpecs}
                  onChange={(e) => setProductSpecs(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={productFeatured}
                  onChange={(e) => setProductFeatured(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded"
                />
                <label htmlFor="featuredToggle" className="text-xs font-bold text-slate-800">
                  Feature this product on homepage
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProductSaving}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a1931] font-bold text-xs shadow-md transition"
                >
                  {isProductSaving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SERVICE ADD/EDIT MODAL */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[#0a1931]">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setShowServiceModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveServiceSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Device Diagnostic & Hardware Repair"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Price or Rate
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. From ₦5,000 / Negotiable"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Technical / Maintenance"
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Service image upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Service Image
                </label>
                <input
                  type="file"
                  ref={serviceImageInputRef}
                  onChange={handleServiceImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => serviceImageInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2"
                >
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>Upload Service Image</span>
                </button>

                {serviceImages.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {serviceImages.map((img, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 relative group"
                      >
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() =>
                            setServiceImages((prev) => prev.filter((_, idx) => idx !== i))
                          }
                          className="absolute inset-0 bg-rose-600/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Summary of this service..."
                  value={serviceShortDesc}
                  onChange={(e) => setServiceShortDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Detailed Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed workflow, what clients should prepare..."
                  value={serviceDetailedDesc}
                  onChange={(e) => setServiceDetailedDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isServiceSaving}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a1931] font-bold text-xs shadow-md transition"
                >
                  {isServiceSaving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
