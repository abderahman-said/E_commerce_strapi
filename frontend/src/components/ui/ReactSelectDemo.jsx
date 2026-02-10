import React, { useState } from 'react';
import ReactSelectComponent from './ReactSelectComponent';

const ReactSelectDemo = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [sortValue, setSortValue] = useState('newest');

  // Enhanced options for React Select
  const sortOptions = [
    { 
      value: 'newest', 
      label: 'Newest', 
      description: 'Latest items first',
      icon: '🆕',
      badge: 'Default'
    },
    { 
      value: 'price-low', 
      label: 'Price: Low to High', 
      description: 'Best deals first',
      icon: '💰',
      badge: 'Popular'
    },
    { 
      value: 'price-high', 
      label: 'Price: High to Low', 
      description: 'Premium items first',
      icon: '💎',
      badge: 'Premium'
    },
    { 
      value: 'rating', 
      label: 'Top Rated', 
      description: 'Highest rated products',
      icon: '⭐',
      badge: 'Trending'
    },
    { 
      value: 'name', 
      label: 'Name: A-Z', 
      description: 'Alphabetical order',
      icon: '🔤'
    }
  ];

  const categoryOptions = [
    { 
      value: 'electronics', 
      label: 'Electronics', 
      description: 'Gadgets and devices',
      icon: '📱',
      badge: '45 items'
    },
    { 
      value: 'clothing', 
      label: 'Fashion', 
      description: 'Clothing and accessories',
      icon: '👕',
      badge: '32 items'
    },
    { 
      value: 'home', 
      label: 'Home & Garden', 
      description: 'For your living space',
      icon: '🏡',
      badge: '19 items'
    },
    { 
      value: 'sports', 
      label: 'Sports', 
      description: 'Equipment and gear',
      icon: '⚽',
      badge: '15 items'
    }
  ];

  const brandOptions = [
    { value: 'apple', label: 'Apple', icon: '🍎' },
    { value: 'samsung', label: 'Samsung', icon: '📱' },
    { value: 'nike', label: 'Nike', icon: '👟' },
    { value: 'adidas', label: 'Adidas', icon: '👟' },
    { value: 'sony', label: 'Sony', icon: '📷' },
    { value: 'lg', label: 'LG', icon: '📺' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">React Select Library</h2>
        <p className="text-gray-600">Professional select component from popular UI library</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Default Variant */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Style</h3>
          <p className="text-sm text-gray-600 mb-4">Clean and professional appearance</p>
          <ReactSelectComponent
            value={sortValue}
            onChange={setSortValue}
            options={sortOptions}
            placeholder="Sort by..."
            variant="default"
          />
        </div>

        {/* Modern Variant */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Modern Style</h3>
          <p className="text-sm text-gray-600 mb-4">Enhanced with better spacing</p>
          <ReactSelectComponent
            value={selectedValue}
            onChange={setSelectedValue}
            options={categoryOptions}
            placeholder="Choose category..."
            variant="modern"
          />
        </div>

        {/* Multi-Select */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi-Select</h3>
          <p className="text-sm text-gray-600 mb-4">Select multiple brands</p>
          <ReactSelectComponent
            value={selectedValues}
            onChange={setSelectedValues}
            options={brandOptions}
            placeholder="Select brands..."
            isMulti={true}
            variant="default"
          />
        </div>

        {/* Dark Variant */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Dark Style</h3>
          <p className="text-sm text-gray-300 mb-4">Modern dark theme</p>
          <ReactSelectComponent
            value={sortValue}
            onChange={setSortValue}
            options={sortOptions}
            placeholder="Sort by..."
            variant="dark"
          />
        </div>

      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 React Select Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Professional Library:</strong> Battle-tested and widely used
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Custom Styling:</strong> Full control over appearance
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Multi-Select:</strong> Built-in support for multiple values
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Async Options:</strong> Load options dynamically
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Accessibility:</strong> WCAG compliant out of the box
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Keyboard Navigation:</strong> Full keyboard support
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReactSelectDemo;
