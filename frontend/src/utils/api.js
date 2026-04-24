const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api';
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

export const getImageUrl = (image) => {
  if (!image) return null;
  
  // Handle different Strapi media structures
  const url = image.url || (image.data && image.data.attributes ? image.data.attributes.url : null);
  
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
};

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
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

export const api = {
  getProducts: (params = '') => fetchData(`products?populate=*${params}`),
  getProduct: (idOrSlug) => fetchData(`products/${idOrSlug}?populate=*`),
  getCategories: () => fetchData('categories?populate=*'),
  
  // Admin methods (will need auth later)
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
};
