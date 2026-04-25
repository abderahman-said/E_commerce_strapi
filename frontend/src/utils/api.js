const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api';
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

export const getImageUrl = (image) => {
  if (!image) return null;
  const url = image.url || (image.data && image.data.attributes ? image.data.attributes.url : null);
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('files', file);

  const response = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: { ...getAuthHeaders() },
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'Upload failed');
  }

  const data = await response.json();
  return data[0]; // Returns the uploaded file object
};

export const api = {
  // ── Products ──────────────────────────────────────────────
  getProducts: (params = '') => fetchData(`products?populate=*${params}`),
  getProduct:  (id)          => fetchData(`products/${id}?populate=*`),

  createProduct: (data) => fetchData('products', {
    method: 'POST',
    body: JSON.stringify({ data }),
  }),

  updateProduct: (id, data) => fetchData(`products/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  }),

  deleteProduct: (id) => fetchData(`products/${id}`, {
    method: 'DELETE',
  }),

  // ── Categories ────────────────────────────────────────────
  getCategories: () => fetchData('categories?populate=*'),
  getCategory:  (id) => fetchData(`categories/${id}?populate=*`),

  createCategory: (data) => fetchData('categories', {
    method: 'POST',
    body: JSON.stringify({ data }),
  }),

  updateCategory: (id, data) => fetchData(`categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  }),

  deleteCategory: (id) => fetchData(`categories/${id}`, {
    method: 'DELETE',
  }),

  // ── Orders ────────────────────────────────────────────────
  getOrders: ()          => fetchData('orders?populate=*'),
  updateOrder: (id, data) => fetchData(`orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  }),

  createOrder: (data) => fetchData('orders', {
    method: 'POST',
    body: JSON.stringify({ data }),
  }),

  // ── Users ─────────────────────────────────────────────────
  getUsers: () => fetchData('users'),
};
