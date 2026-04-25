import React, { useState, useEffect, useRef } from 'react';
import { api, getImageUrl, uploadImage } from '../../utils/api';
import {
  Tag, Plus, Edit2, Trash2, Search, Loader2,
  Check, X, AlertCircle, FolderOpen, Upload, Image as ImageIcon
} from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  // ── Add form state ──
  const [showAddForm, setShowAddForm] = useState(false);
  const [addName, setAddName] = useState('');
  const [addImageFile, setAddImageFile] = useState(null);
  const [addImagePreview, setAddImagePreview] = useState(null);
  const [addLoading, setAddLoading] = useState(false);

  // ── Edit state ──
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const addInputRef = useRef(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (showAddForm) setTimeout(() => addInputRef.current?.focus(), 100);
  }, [showAddForm]);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError('');
      const res = await api.getCategories();
      setCategories(res.data.map(cat => ({
        id: cat.documentId || cat.id,
        numericId: cat.id,
        name: cat.name,
        slug: cat.slug || '',
        image: cat.image,
        productCount: cat.products?.length || 0,
      })));
    } catch (err) {
      setError('Failed to load categories. Check API permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── IMAGE HANDLERS ───────────────────────────────────────
  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAddImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setEditImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ── ADD ──────────────────────────────────────────────────
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addName.trim()) return;
    setAddLoading(true);
    try {
      let imageId = null;
      if (addImageFile) {
        const uploaded = await uploadImage(addImageFile);
        imageId = uploaded.id;
      }

      const res = await api.createCategory({ 
        name: addName.trim(),
        ...(imageId ? { image: imageId } : {})
      });
      
      // Reload to get full populated data
      await loadCategories();
      
      setAddName('');
      setAddImageFile(null);
      setAddImagePreview(null);
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to create category. Make sure you have admin permissions.');
    } finally {
      setAddLoading(false);
    }
  };

  // ── EDIT ─────────────────────────────────────────────────
  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditImagePreview(getImageUrl(cat.image));
    setEditImageFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditImageFile(null);
    setEditImagePreview(null);
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    setEditLoading(true);
    try {
      let payload = { name: editName.trim() };
      
      if (editImageFile) {
        const uploaded = await uploadImage(editImageFile);
        payload.image = uploaded.id;
      }

      await api.updateCategory(id, payload);
      await loadCategories(); // Reload to get fresh image data
      cancelEdit();
    } catch (err) {
      setError('Failed to update category.');
    } finally {
      setEditLoading(false);
    }
  };

  // ── DELETE ───────────────────────────────────────────────
  const handleDelete = async (id) => {
    const cat = categories.find(c => c.id === id);
    if (cat?.productCount > 0) {
      if (!window.confirm(`"${cat.name}" has ${cat.productCount} product(s). Deleting it will unlink them. Continue?`)) return;
    } else {
      if (!window.confirm(`Delete "${cat?.name}"?`)) return;
    }

    try {
      await api.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError('Failed to delete category. It may still have linked products.');
    }
  };

  const filtered = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-gray-500">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">{categories.length} categories total</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all font-medium shadow-sm"
        >
          {showAddForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Category</>}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
          <button onClick={() => setError('')} className="ml-auto p-1 hover:bg-red-100 rounded-lg">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-primary/20 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center gap-2">
            <Tag size={18} className="text-primary" />
            <h2 className="font-semibold text-gray-900">New Category</h2>
          </div>
          <form onSubmit={handleAdd} className="p-5 space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Upload Area */}
              <div className="w-full md:w-48 shrink-0">
                <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden group">
                  {addImagePreview ? (
                    <>
                      <img src={addImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="text-white" size={24} />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <ImageIcon size={32} className="mb-2" />
                      <span className="text-sm font-medium text-gray-500">Upload Image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleAddImageChange} className="hidden" />
                </label>
              </div>

              {/* Form Fields */}
              <div className="flex-1 flex flex-col justify-center space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={addInputRef}
                    type="text"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    placeholder="e.g. Menswear"
                    required
                    className="w-full max-w-md px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={addLoading || !addName.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                    Create Category
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowAddForm(false); setAddName(''); setAddImageFile(null); setAddImagePreview(null); }}
                    className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase w-16">Image</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase hidden md:table-cell">Slug</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Products</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(cat => (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {editingId === cat.id ? (
                      <label className="block w-12 h-12 rounded-lg border-2 border-dashed border-primary/40 flex items-center justify-center cursor-pointer overflow-hidden group relative">
                        {editImagePreview ? (
                          <>
                            <img src={editImagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Upload className="text-white w-4 h-4" />
                            </div>
                          </>
                        ) : (
                          <ImageIcon size={16} className="text-gray-400" />
                        )}
                        <input type="file" accept="image/*" onChange={handleEditImageChange} className="hidden" />
                      </label>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                        {cat.image ? (
                          <img src={getImageUrl(cat.image)} alt={cat.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={20} className="text-gray-300" />
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === cat.id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        className="w-full px-3 py-2 bg-white border border-primary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm"
                      />
                    ) : (
                      <div className="font-semibold text-gray-900">{cat.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                      {cat.slug || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${
                      cat.productCount > 0 ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <FolderOpen size={12} />
                      {cat.productCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editingId === cat.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleUpdate(cat.id)}
                          disabled={editLoading}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-all disabled:opacity-50"
                        >
                          {editLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(cat)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {searchQuery ? 'No results found' : 'No categories yet'}
            </h3>
            <p className="text-gray-500 mt-1">
              {searchQuery ? `Try different search terms.` : 'Click "Add Category" to get started.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
