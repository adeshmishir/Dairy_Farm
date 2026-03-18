import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../lib/auth';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Package, Plus, Trash2, Pencil, Upload, Image, Star,
  MessageSquare, Loader2, RefreshCw, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const API = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api';

type Tab = 'products' | 'add-product' | 'photos' | 'reviews';

const Admin = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('products');

  // Products state
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({ name: '', description: '', price: '', category: 'milk' });
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState('');
  const [submittingProduct, setSubmittingProduct] = useState(false);
  const productImageRef = useRef<HTMLInputElement>(null);

  // Photos state
  const [photos, setPhotos] = useState<any[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoCategory, setPhotoCategory] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Reviews state
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  if (!user || !user.isAdmin) {
    toast.error('Access denied. Admin privileges required.');
    return <Navigate to="/" replace />;
  }

  const authHeaders = { Authorization: `Bearer ${token}` };

  // ── Fetch functions ──────────────────────────────────────────────────────────
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch { toast.error('Failed to load products'); }
    finally { setLoadingProducts(false); }
  };

  const fetchPhotos = async () => {
    setLoadingPhotos(true);
    try {
      const res = await fetch(`${API}/photos`);
      const data = await res.json();
      setPhotos(Array.isArray(data) ? data : []);
    } catch { toast.error('Failed to load photos'); }
    finally { setLoadingPhotos(false); }
  };

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await fetch(`${API}/reviews`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch { toast.error('Failed to load reviews'); }
    finally { setLoadingReviews(false); }
  };

  useEffect(() => {
    fetchProducts();
    fetchPhotos();
    fetchReviews();
  }, []);

  // ── Product handlers ─────────────────────────────────────────────────────────
  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      setProductImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.description || !productForm.price) {
      toast.error('Please fill all required fields'); return;
    }
    setSubmittingProduct(true);
    try {
      const fd = new FormData();
      fd.append('name', productForm.name);
      fd.append('description', productForm.description);
      fd.append('price', productForm.price);
      fd.append('category', productForm.category);
      if (productImage) fd.append('image', productImage);

      const targetId = editingProductId ? editingProductId.split(':')[0] : '';
      const url = `${API}/products${targetId ? `/${targetId}` : ''}`;
      
      const res = await fetch(url, {
        method: editingProductId ? 'PUT' : 'POST',
        headers: authHeaders,
        body: fd,
      });
      if (!res.ok) throw new Error((await res.json()).message);
      toast.success(`Product ${editingProductId ? 'updated' : 'created'} successfully!`);
      setProductForm({ name: '', description: '', price: '', category: 'milk' });
      setProductImage(null);
      setProductImagePreview('');
      setEditingProductId(null);
      if (productImageRef.current) productImageRef.current.value = '';
      fetchProducts();
      setActiveTab('products');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create product');
    } finally { setSubmittingProduct(false); }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: 'DELETE', headers: authHeaders
      });
      if (!res.ok) throw new Error((await res.json()).message);
      toast.success(`"${name}" deleted`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err: any) { toast.error(err.message || 'Delete failed'); }
  };

  // ── Photo handlers ───────────────────────────────────────────────────────────
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setPhotoFile(file); setPhotoPreview(URL.createObjectURL(file)); }
  };

  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFile && !editingPhotoId) { toast.error('Please select a photo'); return; }
    setUploadingPhoto(true);
    try {
      const fd = new FormData();
      if (photoFile) fd.append('photo', photoFile);
      fd.append('caption', photoCaption);
      fd.append('category', photoCategory);
      const targetId = editingPhotoId ? editingPhotoId.split(':')[0] : '';
      const url = `${API}/photos${targetId ? `/${targetId}` : ''}`;
      
      const res = await fetch(url, {
        method: editingPhotoId ? 'PUT' : 'POST',
        headers: editingPhotoId ? { ...authHeaders, 'Content-Type': 'application/json' } : authHeaders,
        body: editingPhotoId ? JSON.stringify({ caption: photoCaption, category: photoCategory }) : fd,
      });
      // Note: If editing photo, we only allow caption/category update via JSON for now in backend
      // But let's adjust backend later if needed. For now simple captions.
      if (!res.ok) throw new Error((await res.json()).message);
      toast.success('Photo uploaded!');
      setPhotoFile(null); setPhotoPreview(''); setPhotoCaption(''); setPhotoCategory('');
      setEditingPhotoId(null);
      if (photoInputRef.current) photoInputRef.current.value = '';
      fetchPhotos();
    } catch (err: any) { toast.error(err.message || 'Upload failed'); }
    finally { setUploadingPhoto(false); }
  };

  const handleEditProductClick = (p: any) => {
    setEditingProductId(p._id);
    setProductForm({ name: p.name, description: p.description, price: p.price, category: p.category });
    setProductImagePreview(p.image);
    setActiveTab('add-product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditPhotoClick = (photo: any) => {
    setEditingPhotoId(photo._id);
    setPhotoCaption(photo.caption || '');
    setPhotoCategory(photo.category || '');
    setPhotoPreview(photo.url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    try {
      const res = await fetch(`${API}/photos/${id}`, {
        method: 'DELETE', headers: authHeaders
      });
      if (!res.ok) throw new Error((await res.json()).message);
      toast.success('Photo deleted');
      setPhotos(prev => prev.filter(p => p._id !== id));
    } catch (err: any) { toast.error(err.message || 'Delete failed'); }
  };

  // ── Review handlers ──────────────────────────────────────────────────────────
  const handleDeleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    try {
      const res = await fetch(`${API}/reviews/${id}`, {
        method: 'DELETE', headers: authHeaders
      });
      if (!res.ok) throw new Error((await res.json()).message);
      toast.success('Review deleted');
      setReviews(prev => prev.filter(r => r._id !== id));
    } catch (err: any) { toast.error(err.message || 'Delete failed'); }
  };

  // ── Tab metadata ─────────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'products',    label: 'Products',    icon: <Package size={18} />,      count: products.length },
    { id: 'add-product', label: 'Add Product', icon: <Plus size={18} /> },
    { id: 'photos',      label: 'Gallery',     icon: <Image size={18} />,        count: photos.length },
    { id: 'reviews',     label: 'Reviews',     icon: <MessageSquare size={18} />, count: reviews.length },
  ];

  return (
    <div className="min-h-screen bg-[#02110b] text-green-50/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Admin Dashboard</h1>
          <p className="text-green-100/40 text-xs sm:text-sm font-medium tracking-tight">Manage products, photos and reviews</p>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
                activeTab === t.id
                  ? 'bg-green-600 text-white shadow-lg shadow-green-900/40 -translate-y-0.5'
                  : 'bg-white/5 text-green-100/60 hover:bg-white/10 border border-white/5'
              }`}
            >
              {t.icon}
              {t.label}
              {t.count !== undefined && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-black ${
                  activeTab === t.id ? 'bg-white/20 text-white' : 'bg-green-500/10 text-green-400'
                }`}>{t.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Products List ── */}
        {activeTab === 'products' && (
          <div className="bg-[#0a2318] rounded-[1.5rem] sm:rounded-3xl shadow-xl border border-white/10 p-4 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Package className="text-green-400" /> All Products
              </h2>
              <button onClick={fetchProducts} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">
                <RefreshCw size={18} />
              </button>
            </div>
            {loadingProducts ? (
              <div className="flex justify-center py-16"><Loader2 className="animate-spin h-8 w-8 text-green-600" /></div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Package className="mx-auto h-12 w-12 mb-4 opacity-30" />
                <p className="font-bold">No products yet. Add one!</p>
              </div>
            ) : (
              <div>
                {/* Desktop Table View */}
                <table className="hidden sm:table w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-xs font-black text-green-500/40 uppercase tracking-wider">Product</th>
                      <th className="text-left py-3 px-4 text-xs font-black text-green-500/40 uppercase tracking-wider">Category</th>
                      <th className="text-left py-3 px-4 text-xs font-black text-green-500/40 uppercase tracking-wider">Price</th>
                      <th className="text-right py-3 px-4 text-xs font-black text-green-500/40 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            {p.image && <img src={p.image} alt={p.name} className="h-12 w-12 rounded-xl object-cover border border-white/10" />}
                            <div>
                              <p className="font-bold text-white">{p.name}</p>
                              <p className="text-xs text-green-100/40 line-clamp-1 max-w-xs">{p.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            p.category === 'milk' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                          }`}>{p.category}</span>
                        </td>
                        <td className="py-4 px-4 font-bold text-green-400">{p.price}</td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleEditProductClick(p)}
                              className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-xl transition-all" title="Edit Product"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p._id, p.name)}
                              className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all" title="Delete Product"
                            ><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Card View */}
                <div className="block sm:hidden space-y-4">
                  {products.map(p => (
                    <div key={p._id} className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-4">
                      <div className="flex items-center gap-4">
                        {p.image && <img src={p.image} alt={p.name} className="h-14 w-14 rounded-xl object-cover border border-white/10 flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-bold text-white text-sm truncate">{p.name}</h3>
                            <span className="text-green-400 font-black text-xs whitespace-nowrap">{p.price}</span>
                          </div>
                          <p className="text-[10px] text-green-100/40 line-clamp-1 mt-0.5">{p.description}</p>
                          <div className="mt-2 text-left">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                              p.category === 'milk' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                            }`}>{p.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2 border-t border-white/5">
                        <button 
                          onClick={() => handleEditProductClick(p)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500/10 text-green-400 rounded-xl text-xs font-bold transition-all active:scale-95"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id, p.name)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/10 text-red-400 rounded-xl text-xs font-bold transition-all active:scale-95"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Add Product ── */}
        {activeTab === 'add-product' && (
          <div className="bg-[#0a2318] rounded-3xl shadow-xl border border-white/10 p-8 max-w-2xl">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {editingProductId ? <Pencil className="text-green-400" /> : <Plus className="text-green-400" />}
                {editingProductId ? 'Edit Product' : 'Add New Product'}
              </div>
              {editingProductId && (
                <button 
                  onClick={() => { setEditingProductId(null); setProductForm({ name: '', description: '', price: '', category: 'milk' }); setProductImagePreview(''); }}
                  className="text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20"
                >Cancel Edit</button>
              )}
            </h2>
            <form onSubmit={handleCreateProduct} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-green-100/70 mb-1.5">Product Name *</label>
                  <input
                    type="text" required
                    value={productForm.name}
                    onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#02110b] text-white focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder:text-white/20"
                    placeholder="e.g. Fresh Buffalo Milk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-green-100/70 mb-1.5">Price *</label>
                  <input
                    type="text" required
                    value={productForm.price}
                    onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#02110b] text-white focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder:text-white/20"
                    placeholder="e.g. ₹60/L"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-green-100/70 mb-1.5">Category *</label>
                <select
                  value={productForm.category}
                  onChange={e => setProductForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-green-500 outline-none bg-[#02110b] text-white transition-all"
                >
                  <option value="milk">🥛 Dairy / Milk</option>
                  <option value="feed">🌾 Animal Feed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-green-100/70 mb-1.5">Description *</label>
                <textarea
                  required rows={3}
                  value={productForm.description}
                  onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#02110b] text-white focus:ring-2 focus:ring-green-500 outline-none resize-none transition-all placeholder:text-white/20"
                  placeholder="Describe the product quality and benefits..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-green-100/70 mb-1.5">Product Image (optional)</label>
                <div
                  onClick={() => productImageRef.current?.click()}
                  className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group relative overflow-hidden"
                >
                  {productImagePreview ? (
                    <div className="relative">
                      <img src={productImagePreview} alt="Preview" className="mx-auto h-40 object-cover rounded-xl" />
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); setProductImage(null); setProductImagePreview(''); }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      ><X size={14} /></button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-10 w-10 text-green-300/40 group-hover:text-green-500 mb-3 transition-colors" />
                      <p className="text-sm font-bold text-green-700/60">Click to upload image</p>
                      <p className="text-xs text-white/20 mt-1">PNG, JPG, WEBP up to 10MB</p>
                    </>
                  )}
                </div>
                <input ref={productImageRef} type="file" accept="image/*" className="hidden" onChange={handleProductImageChange} />
              </div>
              <Button type="submit" disabled={submittingProduct} size="lg" className="w-full rounded-2xl py-6 text-lg font-black shadow-lg shadow-green-100">
                {submittingProduct ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...</> : (editingProductId ? '💾 Update Product' : '✅ Create Product')}
              </Button>
            </form>
          </div>
        )}

        {/* ── Photo Gallery ── */}
        {activeTab === 'photos' && (
          <div className="space-y-8">
            {/* Upload Form */}
            <div className="bg-[#0a2318] rounded-3xl shadow-xl border border-white/10 p-8 max-w-2xl">
              <h2 className="text-2xl font-black text-white mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {editingPhotoId ? <Pencil className="text-green-400" /> : <Upload className="text-green-400" />}
                  {editingPhotoId ? 'Edit Photo Info' : 'Upload New Photo'}
                </div>
                {editingPhotoId && (
                  <button 
                    onClick={() => { setEditingPhotoId(null); setPhotoCaption(''); setPhotoCategory(''); setPhotoPreview(''); if (photoInputRef.current) photoInputRef.current.value = ''; }}
                    className="text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20"
                  >Cancel Edit</button>
                )}
              </h2>
              <form onSubmit={handleUploadPhoto} className="space-y-5">
                <div
                  onClick={() => photoInputRef.current?.click()}
                  className="border-2 border-dashed border-green-200/20 rounded-2xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  {photoPreview ? (
                    <div className="relative">
                      <img src={photoPreview} alt="Preview" className="mx-auto h-48 object-cover rounded-xl" />
                      <button type="button" onClick={e => { e.stopPropagation(); setPhotoFile(null); setPhotoPreview(''); }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"><X size={14} /></button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-10 w-10 text-green-300 group-hover:text-green-500 mb-3 transition-colors" />
                      <p className="text-sm font-bold text-green-700">Click to select farm photo</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                    </>
                  )}
                </div>
                <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                <input
                  type="text" value={photoCaption}
                  onChange={e => setPhotoCaption(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#02110b] text-white focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder:text-white/20"
                  placeholder="Caption (optional)"
                />
                <input
                  type="text" value={photoCategory}
                  onChange={e => setPhotoCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#02110b] text-white focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder:text-white/20"
                  placeholder="Category (e.g. Farm Life, Care, Nature)"
                />
                <Button type="submit" disabled={uploadingPhoto} size="lg" className="w-full rounded-2xl py-5 font-black shadow-lg shadow-green-100">
                  {uploadingPhoto ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...</> : (editingPhotoId ? '💾 Save Changes' : '📸 Upload Photo')}
                </Button>
              </form>
            </div>

            {/* Gallery Grid */}
            <div className="bg-[#0a2318] rounded-3xl shadow-xl border border-white/10 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Image className="text-green-400" /> Photo Gallery ({photos.length})
                </h2>
                <button onClick={fetchPhotos} className="p-2 text-green-100/40 hover:text-green-400 hover:bg-green-500/10 rounded-xl transition-all">
                  <RefreshCw size={18} />
                </button>
              </div>
              {loadingPhotos ? (
                <div className="flex justify-center py-16"><Loader2 className="animate-spin h-8 w-8 text-green-600" /></div>
              ) : photos.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <Image className="mx-auto h-12 w-12 mb-4 opacity-30" />
                  <p className="font-bold">No photos uploaded yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map(photo => (
                    <div key={photo._id} className="relative group rounded-2xl overflow-hidden border border-white/5 aspect-square">
                      <img src={photo.url} alt={photo.caption || 'Farm photo'} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                        <button 
                          onClick={() => handleEditPhotoClick(photo)}
                          className="bg-green-500/20 hover:bg-green-500 text-white rounded-full p-2.5 transition-all border border-green-500/30"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(photo._id)}
                          className="bg-red-500/20 hover:bg-red-500 text-white rounded-full p-2.5 transition-all border border-red-500/30"
                        ><Trash2 size={18} /></button>
                      </div>
                      {photo.caption && <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/40 backdrop-blur-sm"><p className="text-white text-[10px] truncate">{photo.caption}</p></div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Reviews ── */}
        {activeTab === 'reviews' && (
          <div className="bg-[#0a2318] rounded-[1.5rem] sm:rounded-3xl shadow-xl border border-white/10 p-4 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <MessageSquare className="text-green-400" /> Customer Reviews ({reviews.length})
              </h2>
              <button onClick={fetchReviews} className="p-2 text-green-100/40 hover:text-green-400 hover:bg-green-500/10 rounded-xl transition-all">
                <RefreshCw size={18} />
              </button>
            </div>

            {loadingReviews ? (
              <div className="flex justify-center py-16"><Loader2 className="animate-spin h-8 w-8 text-green-600" /></div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-30" />
                <p className="font-bold">No reviews yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Average rating summary */}
                <div className="bg-green-500/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 border border-white/5">
                  <div className="text-center">
                    <p className="text-4xl sm:text-5xl font-black text-green-400">
                      {reviews.length > 0 ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : '0.0'}
                    </p>
                    <p className="text-[10px] sm:text-xs font-bold text-green-500/60 mt-1 uppercase tracking-widest">Average Rating</p>
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`h-5 w-5 sm:h-6 sm:w-6 ${s <= Math.round(reviews.length > 0 ? reviews.reduce((a,r)=>a+r.rating,0)/reviews.length : 0) ? 'text-yellow-400 fill-current' : 'text-white/10'}`} />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-green-100/40 font-medium">{reviews.length} reviews total</p>
                </div>

                {reviews.map(r => (
                  <div key={r._id} className="flex flex-col sm:flex-row justify-between items-start gap-4 p-4 sm:p-5 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors group">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 sm:h-9 sm:w-9 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 font-black text-xs sm:text-sm uppercase">
                          {r.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white text-sm sm:text-base">{r.name}</p>
                          <p className="text-[10px] sm:text-xs text-green-100/40">{r.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className={`h-3 w-3 sm:h-4 sm:w-4 ${s <= r.rating ? 'text-yellow-400 fill-current' : 'text-white/10'}`} />
                          ))}
                        </div>
                        <button
                          onClick={() => handleDeleteReview(r._id)}
                          className="sm:hidden p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        ><Trash2 size={16} /></button>
                      </div>
                      <p className="text-green-100/70 italic text-xs sm:text-sm leading-relaxed">"{r.comment}"</p>
                    </div>
                    <button
                      onClick={() => handleDeleteReview(r._id)}
                      className="hidden sm:block p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all flex-shrink-0"
                    ><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
