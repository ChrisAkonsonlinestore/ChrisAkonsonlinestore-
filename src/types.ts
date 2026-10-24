export type AvailabilityStatus = 'Available' | 'Out of Stock' | 'Pre-order';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  category: string;
  sku?: string;
  stock?: number;
  availability: AvailabilityStatus;
  mainImage: string;
  additionalImages?: string[];
  specs?: string;
  deliveryInfo?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  detailedDesc: string;
  price?: string;
  category?: string;
  availability?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  title?: string;
  description?: string;
  imageUrl: string;
  order?: number;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  ownerName: string;
  location: string;
  phone: string;
  email: string;
  whatsapp: string;
  whatsappUrl: string;
  facebookUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  bio: string;
  profileImageUrl: string;
  categories: string[];
  updatedAt?: string;
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: "chrisAkons online store",
  ownerName: "Christian Akobundu",
  location: "Owerri, Imo State, Nigeria",
  phone: "08109226976",
  email: "christianakobundu09@gmail.com",
  whatsapp: "2348109226976",
  whatsappUrl: "https://wa.me/2348109226976",
  facebookUrl: "https://www.facebook.com/share/1ErLVK3baj/",
  heroTitle: "Welcome to chrisAkons online store",
  heroSubtitle: "Discover quality products, explore available services, and shop with convenience in Owerri, Imo State, Nigeria. Direct WhatsApp ordering & personalized customer support.",
  bio: "My name is Christian Akobundu, based in Owerri, Imo State, Nigeria. I created chrisAkons online store to provide accessible online platform where customers can explore products, discover services, and connect directly. This platform is designed to make browsing convenient, product discovery simple, and customer communication straightforward. Thank you for visiting. I look forward to connecting with you.",
  profileImageUrl: "/christian-final.jpg",
  categories: ["Electronics", "Phones & Gadgets", "Fashion & Apparel", "Home & Living", "Services & Repairs", "Accessories"],
};
