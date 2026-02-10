import React, { useState } from 'react';
import SelectMinimal from '../components/ui/SelectMinimal';
import SelectModernSaaS from '../components/ui/SelectModernSaaS';
import SelectPremium from '../components/ui/SelectPremium';
import MultiSelect from '../components/ui/MultiSelect';
import CategoryFilter from '../components/ui/CategoryFilter';
import PriceRangeFilter from '../components/ui/PriceRangeFilter';
import TagFilter from '../components/ui/TagFilter';
import ProductVariantSelector from '../components/ui/ProductVariantSelector';
import EnhancedSelectDemo from '../components/ui/EnhancedSelectDemo';
import SortSelect from '../components/ui/SortSelect';
import ModernSortSelect from '../components/ui/ModernSortSelect';
import ReactSelectDemo from '../components/ui/ReactSelectDemo';

const ShopDemo = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({
    size: null,
    color: null,
    material: null
  });
  const [quantity, setQuantity] = useState(1);
  const [sortValue, setSortValue] = useState('newest');

  // Enhanced sample data with icons, descriptions, and badges
  const options = [
    { 
      value: 'option1', 
      label: 'Premium Package', 
      description: 'Best value with all features',
      badge: 'Popular',
      icon: '⭐'
    },
    { 
      value: 'option2', 
      label: 'Standard Package', 
      description: 'Perfect for small businesses',
      icon: '📦'
    },
    { 
      value: 'option3', 
      label: 'Basic Package', 
      description: 'Essential features included',
      badge: 'Budget',
      icon: '🔧'
    },
    { 
      value: 'option4', 
      label: 'Enterprise Package', 
      description: 'Advanced features and support',
      icon: '🏢'
    },
    { 
      value: 'option5', 
      label: 'Custom Solution', 
      description: 'Tailored to your needs',
      badge: 'New',
      icon: '🎯'
    },
  ];

  const categories = [
    { value: 'electronics', label: 'Electronics', count: 45 },
    { value: 'clothing', label: 'Clothing', count: 32 },
    { value: 'books', label: 'Books', count: 28 },
    { value: 'home', label: 'Home & Garden', count: 19 },
    { value: 'sports', label: 'Sports', count: 15 },
  ];

  const tags = [
    { value: 'bestseller', label: 'Bestseller', count: 25 },
    { value: 'new', label: 'New Arrival', count: 18 },
    { value: 'sale', label: 'On Sale', count: 12 },
    { value: 'premium', label: 'Premium', count: 8 },
    { value: 'eco', label: 'Eco-Friendly', count: 6 },
    { value: 'limited', label: 'Limited Edition', count: 4 },
  ];

  const productVariants = {
    sizes: [
      { value: 'xs', label: 'XS', available: true },
      { value: 's', label: 'S', available: true },
      { value: 'm', label: 'M', available: true },
      { value: 'l', label: 'L', available: true },
      { value: 'xl', label: 'XL', available: false },
      { value: 'xxl', label: 'XXL', available: false },
    ],
    colors: [
      { value: 'black', label: 'Black', hex: '#000000', available: true },
      { value: 'white', label: 'White', hex: '#FFFFFF', available: true },
      { value: 'navy', label: 'Navy', hex: '#1E3A8A', available: true },
      { value: 'red', label: 'Red', hex: '#DC2626', available: false },
      { value: 'forest', label: 'Forest Green', hex: '#14532D', available: true },
    ],
    materials: [
      { value: 'cotton', label: 'Cotton', available: true, price: 0 },
      { value: 'silk', label: 'Silk', available: true, price: 25 },
      { value: 'wool', label: 'Wool', available: false, price: 15 },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop UI Components Demo</h1>
          <p className="text-gray-600">Modern, accessible form controls for e-commerce</p>
        </div>

        {/* Enhanced Select Demo Section */}
        <div className="mb-12">
          <EnhancedSelectDemo />
        </div>

        {/* Sort Select Demo Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enhanced Sort Select</h2>
            <p className="text-gray-600">Modern replacement for default sorting dropdowns</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Standard Enhanced Sort Select */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enhanced Sort</h3>
              <p className="text-sm text-gray-600 mb-4">Clean design with icons and descriptions</p>
              <SortSelect
                value={sortValue}
                onChange={setSortValue}
              />
            </div>

            {/* Modern Sort Select */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Modern Sort</h3>
              <p className="text-sm text-gray-600 mb-4">Contemporary style with gradients</p>
              <ModernSortSelect
                value={sortValue}
                onChange={setSortValue}
                variant="modern"
              />
            </div>

            {/* Premium Sort Select */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Premium Sort</h3>
              <p className="text-sm text-gray-300 mb-4">Luxury dark theme with animations</p>
              <ModernSortSelect
                value={sortValue}
                onChange={setSortValue}
                variant="premium"
              />
            </div>
          </div>
        </div>

        {/* React Select Demo Section */}
        <div className="mb-12">
          <ReactSelectDemo />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          
          {/* Minimal Select */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Minimal Select</h2>
            <SelectMinimal
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Choose an option"
              searchable
            />
          </div>

          {/* Modern SaaS Select */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Modern SaaS Select</h2>
            <SelectModernSaaS
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Choose an option"
              searchable
              clearable
            />
          </div>

          {/* Premium Select */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Premium Select</h2>
            <SelectPremium
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Choose an option"
              searchable
              clearable
            />
          </div>

          {/* MultiSelect */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Multi-Select</h2>
            <MultiSelect
              options={options}
              value={selectedValues}
              onChange={setSelectedValues}
              placeholder="Select multiple options"
              searchable
              clearable
              tagVariant="default"
            />
          </div>

          {/* Category Filter - Default */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Filter</h2>
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
              variant="default"
            />
          </div>

          {/* Category Filter - Sidebar */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Filter - Sidebar</h2>
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
              variant="sidebar"
            />
          </div>

          {/* Price Range Filter - Default */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Range Filter</h2>
            <PriceRangeFilter
              minPrice={0}
              maxPrice={500}
              value={priceRange}
              onChange={setPriceRange}
              variant="default"
            />
          </div>

          {/* Price Range Filter - Premium */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Range - Premium</h2>
            <PriceRangeFilter
              minPrice={0}
              maxPrice={500}
              value={priceRange}
              onChange={setPriceRange}
              variant="premium"
            />
          </div>

          {/* Tag Filter - Cloud */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tag Filter - Cloud</h2>
            <TagFilter
              tags={tags}
              selectedTags={selectedTags}
              onChange={setSelectedTags}
              variant="cloud"
              popularTags={tags.slice(0, 3)}
            />
          </div>

          {/* Tag Filter - Pill */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tag Filter - Pill</h2>
            <TagFilter
              tags={tags}
              selectedTags={selectedTags}
              onChange={setSelectedTags}
              variant="pill"
              searchable
            />
          </div>

          {/* Product Variant Selector - Default */}
          <div className="bg-white p-6 rounded-lg shadow-sm border lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Variant Selector</h2>
            <ProductVariantSelector
              variants={productVariants}
              selectedVariants={selectedVariants}
              onChange={setSelectedVariants}
              quantity={quantity}
              onQuantityChange={setQuantity}
              maxQuantity={10}
              variant="default"
            />
          </div>

          {/* Product Variant Selector - Premium */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Variant Selector - Premium</h2>
            <ProductVariantSelector
              variants={productVariants}
              selectedVariants={selectedVariants}
              onChange={setSelectedVariants}
              quantity={quantity}
              onQuantityChange={setQuantity}
              maxQuantity={10}
              variant="premium"
            />
          </div>

        </div>

        {/* Keyboard Navigation Guide */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Keyboard Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Select Components</h3>
              <ul className="space-y-1 text-gray-600">
                <li><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter/Space</kbd> - Open dropdown</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">↑/↓</kbd> - Navigate options</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> - Select option</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Esc</kbd> - Close dropdown</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Type</kbd> - Search (when searchable)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Multi-Select</h3>
              <ul className="space-y-1 text-gray-600">
                <li><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter/Space</kbd> - Toggle selection</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Backspace</kbd> - Remove last tag</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Tab</kbd> - Navigate to clear button</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopDemo;
