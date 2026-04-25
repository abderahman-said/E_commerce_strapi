import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api, getImageUrl, uploadImage } from '../../utils/api';
import { 
  ArrowLeft, Save, Upload, X, Package, DollarSign, 
  Tag, Layers, Info, Loader2, CheckCircle2, AlertCircle
} from 'lucide-react';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: 10,
    slug: ''
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const catRes = await api.getCategories();
        setCategories(catRes.data);

        if (isEditMode) {
          const prodRes = await api.getProduct(id);
          const product = prodRes.data;
          setFormData({
            name: product.name || '',
            price: product.price || '',
            description: product.description || '',
            category: product.category?.documentId || product.category?.id || '',
            stock: product.stock || 10,
            slug: product.slug || ''
          });
          if (product.image) {
            setImagePreview(getImageUrl(product.image));
          }
        }
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [id, isEditMode]);

  // Auto-generate slug from name
  const handleNameChange = (value) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      slug: prev.slug === '' || prev.slug === autoSlug(prev.name)
        ? autoSlug(value)
        : prev.slug
    }));
  };

  const autoSlug = (name) => {
    let slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    // Fallback if name is entirely non-English (like Arabic)
    if (!slug || slug === '-') {
      slug = `product-${Date.now()}`;
    }
    return slug;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus(null);

    try {
      let imageId = null;

      // 1. Upload image if a new one was selected
      if (imageFile) {
        const uploaded = await uploadImage(imageFile);
        imageId = uploaded.id;
      }

      // 2. Build payload
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        slug: formData.slug || autoSlug(formData.name),
        ...(formData.category ? { category: formData.category } : {}),
        ...(imageId ? { image: imageId } : {}),
      };

      // 3. Create or Update
      if (isEditMode) {
        await api.updateProduct(id, productData);
      } else {
        await api.createProduct(productData);
      }

      setSaveStatus('success');
      setTimeout(() => navigate('/admin/products'), 1000);
    } catch (err) {
      console.error('Failed to save product:', err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-sm text-gray-500">
            {isEditMode ? 'Update product details below' : 'Fill in the details to add a new product'}
          </p>
        </div>
      </div>

      {/* Status Banner */}
      {saveStatus === 'success' && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          <CheckCircle2 size={18} />
          <span className="font-medium">Product saved successfully! Redirecting...</span>
        </div>
      )}
      {saveStatus === 'error' && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <AlertCircle size={18} />
          <span className="font-medium">Failed to save. Check permissions in Strapi admin.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-gray-900">Product Information</h2>
            </div>
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g. Classic White T-Shirt"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="Describe the product..."
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number" step="0.01" min="0" required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Quantity</label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number" min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-gray-900">Product Image</h2>
            </div>
            <div className="p-6">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:bg-gray-50 transition-colors cursor-pointer relative">
                {imagePreview ? (
                  <div className="relative w-full max-h-64 flex items-center justify-center">
                    <img src={imagePreview} alt="Preview" className="max-h-64 object-contain rounded-xl" />
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setImageFile(null); setImagePreview(null); }}
                      className="absolute -top-3 -right-3 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Click to upload product image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Organization */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-gray-900">Organization</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="">— No Category —</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.documentId || cat.id}>{cat.name}</option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    No categories yet. <Link to="/admin/categories" className="text-primary underline">Add one first.</Link>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_.~]/g, '') })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-mono"
                  placeholder="auto-generated-from-name"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </button>
            <Link
              to="/admin/products"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </Link>
          </div>

          {/* Product Preview hint */}
          <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-500 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Package size={16} className="text-gray-400" />
              <span className="font-medium text-gray-700">Quick Tips</span>
            </div>
            <ul className="space-y-1 text-xs mt-2">
              <li>• Slug is auto-generated from the product name.</li>
              <li>• Upload an image for better customer experience.</li>
              <li>• Set stock to 0 to mark as out of stock.</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
