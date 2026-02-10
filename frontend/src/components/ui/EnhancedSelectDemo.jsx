import React, { useState } from 'react';
import SelectMinimal from './SelectMinimal';
import SelectModernSaaS from './SelectModernSaaS';
import SelectPremium from './SelectPremium';

const EnhancedSelectDemo = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);

  // Enhanced sample data with rich content
  const productOptions = [
    { 
      value: 'premium', 
      label: 'Premium Package', 
      description: 'Best value with all features included',
      badge: 'Popular',
      icon: '⭐'
    },
    { 
      value: 'standard', 
      label: 'Standard Package', 
      description: 'Perfect for small businesses',
      icon: '📦'
    },
    { 
      value: 'basic', 
      label: 'Basic Package', 
      description: 'Essential features for getting started',
      badge: 'Budget',
      icon: '🔧'
    },
    { 
      value: 'enterprise', 
      label: 'Enterprise Package', 
      description: 'Advanced features and priority support',
      icon: '🏢'
    },
    { 
      value: 'custom', 
      label: 'Custom Solution', 
      description: 'Tailored specifically to your needs',
      badge: 'New',
      icon: '🎯'
    },
  ];

  const categoryOptions = [
    { 
      value: 'electronics', 
      label: 'Electronics & Gadgets', 
      description: 'Latest technology and devices',
      badge: '45 items',
      icon: '📱'
    },
    { 
      value: 'clothing', 
      label: 'Fashion & Apparel', 
      description: 'Trendy clothing and accessories',
      badge: '32 items',
      icon: '👕'
    },
    { 
      value: 'books', 
      label: 'Books & Media', 
      description: 'Educational and entertainment content',
      badge: '28 items',
      icon: '📚'
    },
    { 
      value: 'home', 
      label: 'Home & Garden', 
      description: 'Everything for your living space',
      badge: '19 items',
      icon: '🏡'
    },
    { 
      value: 'sports', 
      label: 'Sports & Outdoors', 
      description: 'Equipment for active lifestyle',
      badge: '15 items',
      icon: '⚽'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enhanced Select Components</h2>
        <p className="text-gray-600">Modern UI with rich content, icons, descriptions, and badges</p>
      </div>

      {/* Enhanced Select Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Minimal with Rich Content */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Minimal Style</h3>
          <p className="text-sm text-gray-600 mb-4">Clean and simple with enhanced content display</p>
          <SelectMinimal
            options={productOptions}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Choose a package..."
            searchable
            clearable
          />
        </div>

        {/* Modern SaaS with Rich Content */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Modern SaaS Style</h3>
          <p className="text-sm text-gray-600 mb-4">Professional appearance with gradient effects</p>
          <SelectModernSaaS
            options={productOptions}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Select your plan..."
            searchable
            clearable
          />
        </div>

        {/* Premium with Rich Content */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Premium Style</h3>
          <p className="text-sm text-gray-600 mb-4">Luxurious design with animations and gradients</p>
          <SelectPremium
            options={productOptions}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Experience premium..."
            searchable
            clearable
          />
        </div>

        {/* Category Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Selection</h3>
          <p className="text-sm text-gray-600 mb-4">Browse products by category with item counts</p>
          <SelectModernSaaS
            options={categoryOptions}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Browse categories..."
            searchable
            clearable
          />
        </div>

      </div>

      {/* Feature Highlights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">✨ Enhanced Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Rich Content:</strong> Icons, descriptions, and badges
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Smooth Animations:</strong> Transitions and micro-interactions
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Visual Feedback:</strong> Hover states and selection indicators
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Enhanced Search:</strong> Better search input with icons
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Empty States:</strong> Helpful messages with clear actions
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <div>
              <strong>Accessibility:</strong> Full keyboard navigation support
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EnhancedSelectDemo;
