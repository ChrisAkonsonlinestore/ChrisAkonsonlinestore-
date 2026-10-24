import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
  Sparkles,
  Camera,
  Eye,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { compressImageFile } from '../utils/format';
import { GalleryItem } from '../types';

interface GalleryPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { gallery, isAdmin, saveGalleryItem, removeGalleryItem, settings } = useStore();
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const dataUrl = await compressImageFile(file);
      setSelectedFileUrl(dataUrl);
      setShowUploadModal(true);
    } catch (err: any) {
      alert(err.message || 'Failed to process image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveItem = async () => {
    if (!selectedFileUrl) return;

    try {
      setIsUploading(true);
      const galItem: Record<string, any> = {
        imageUrl: selectedFileUrl,
        order: Date.now(),
      };
      if (uploadTitle.trim()) galItem.title = uploadTitle.trim();
      if (uploadDesc.trim()) galItem.description = uploadDesc.trim();

      await saveGalleryItem(galItem as any);
      setShowUploadModal(false);
      setSelectedFileUrl('');
      setUploadTitle('');
      setUploadDesc('');
    } catch (err: any) {
      alert(err.message || 'Failed to save gallery item');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this gallery photo?')) {
      await removeGalleryItem(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1931]">
            Our Gallery
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Explore photos of products, client orders, service deliverables, and behind-the-scenes moments from chrisAkons in Owerri, Nigeria.
          </p>
        </div>

        {isAdmin && (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-5 py-2.5 rounded-xl bg-[#0a1931] hover:bg-[#12284c] text-white text-xs font-bold shadow-md transition flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>{isUploading ? 'Processing...' : 'Upload New Photo'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Gallery Grid or Empty State */}
      {gallery.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#0a1931] mb-2">
            No Gallery Photos Added Yet
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
            Photos of delivered orders, in-stock products, and store updates will be posted here. Follow us on Facebook or chat on WhatsApp to see current inventory!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition"
            >
              Visit Facebook Page
            </a>
            {isAdmin && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl bg-[#0a1931] text-white font-semibold text-xs transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Upload First Photo</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative w-full h-64 bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title || 'chrisAkons gallery item'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white text-xs flex items-center gap-1.5 font-medium">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Click to view photo</span>
                  </div>
                </div>

                {isAdmin && (
                  <button
                    onClick={(e) => handleDeleteItem(item.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-rose-600 text-white transition shadow-md"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {(item.title || item.description) && (
                <div className="p-4 space-y-1">
                  {item.title && (
                    <h3 className="font-bold text-sm text-[#0a1931]">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title || 'chrisAkons full size photo'}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 text-white space-y-2 bg-slate-900">
              <h3 className="text-lg font-bold">
                {activeImage.title || 'chrisAkons Showcase'}
              </h3>
              {activeImage.description && (
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Details Modal for Admin */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#0a1931]">Add Photo Details</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedFileUrl}
                alt="Selected preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. New Gadget Dispatch in Owerri"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Caption / Description (Optional)
                </label>
                <textarea
                  placeholder="Details about this photo..."
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  rows={3}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveItem}
                disabled={isUploading}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a1931] font-bold text-xs shadow-md transition"
              >
                {isUploading ? 'Saving...' : 'Publish to Gallery'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
