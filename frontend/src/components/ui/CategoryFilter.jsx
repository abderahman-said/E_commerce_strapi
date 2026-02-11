import React, { useState } from 'react';
import { ChevronDown, ChevronRight, X, Filter } from 'lucide-react';
import SelectMinimal from './SelectMinimal';

const CategoryFilter = ({
  categories = [],
  selectedCategories = [],
  onChange,
  expanded = true,
  clearable = true,
  className = '',
  variant = 'default' // 'default', 'sidebar', 'inline'
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleCategoryChange = (value) => {
    const newSelection = selectedCategories.includes(value)
      ? selectedCategories.filter(cat => cat !== value)
      : [...selectedCategories, value];
    onChange(newSelection);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const renderVariant = () => {
    switch (variant) {
      case 'sidebar':
        return <SidebarVariant />;
      case 'inline':
        return <InlineVariant />;
      default:
        return <DefaultVariant />;
    }
  };

  const DefaultVariant = () => (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Categories
        </h3>
        {clearable && selectedCategories.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      <SelectMinimal
        multiSelect={true}
        value={selectedCategories}
        onChange={onChange}
        options={categories}
        placeholder="Select categories"
        clearable={clearable}
        searchable={categories.length > 8}
      />
    </div>
  );

  const SidebarVariant = () => (
    <div className={`border-b border-gray-200 pb-4 ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-900 hover:text-gray-700 transition-colors"
      >
        <span className="flex items-center gap-2">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          Categories
          {selectedCategories.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {selectedCategories.length}
            </span>
          )}
        </span>
        {clearable && selectedCategories.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {categories.map((category) => (
            <label
              key={category.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.value)}
                onChange={() => handleCategoryChange(category.value)}
                className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
              />
              <span className="text-sm text-gray-700">{category.label}</span>
              {category.count && (
                <span className="text-xs text-gray-500 ml-auto">({category.count})</span>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const InlineVariant = () => (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700">Categories:</span>
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.value);
        return (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={`
              px-3 py-1 text-sm rounded-full transition-all duration-200
              ${isSelected
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {category.label}
            {category.count && ` (${category.count})`}
          </button>
        );
      })}
      {clearable && selectedCategories.length > 0 && (
        <button
          onClick={handleClearAll}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );

  return renderVariant();
};

export default CategoryFilter;
