import React, { useState } from 'react';
import { Minus, Plus, Check, Palette, Ruler } from 'lucide-react';

const ProductVariantSelector = ({
  variants = {
    sizes: [],
    colors: [],
    materials: []
  },
  selectedVariants = {
    size: null,
    color: null,
    material: null
  },
  onChange,
  quantity = 1,
  onQuantityChange,
  maxQuantity = 10,
  variant = 'default', // 'default', 'compact', 'premium'
  className = ''
}) => {
  const [hoveredColor, setHoveredColor] = useState(null);

  const handleVariantChange = (type, value) => {
    const newSelection = {
      ...selectedVariants,
      [type]: value
    };
    onChange(newSelection);
  };

  const handleQuantityChange = (newQuantity) => {
    const clampedQuantity = Math.max(1, Math.min(maxQuantity, newQuantity));
    onQuantityChange(clampedQuantity);
  };

  const renderVariant = () => {
    switch (variant) {
      case 'compact':
        return <CompactVariant />;
      case 'premium':
        return <PremiumVariant />;
      default:
        return <DefaultVariant />;
    }
  };

  const DefaultVariant = () => (
    <div className={`space-y-6 ${className}`}>
      {/* Size Selector */}
      {variants.sizes?.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium text-gray-900">Size</h3>
            {selectedVariants.size && (
              <span className="text-sm text-gray-600">
                ({variants.sizes.find(s => s.value === selectedVariants.size)?.label})
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {variants.sizes.map((size) => {
              const isSelected = selectedVariants.size === size.value;
              const isDisabled = !size.available;
              
              return (
                <button
                  key={size.value}
                  onClick={() => !isDisabled && handleVariantChange('size', size.value)}
                  disabled={isDisabled}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200
                    ${isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : isDisabled
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }
                  `}
                >
                  {size.label}
                  {size.price && (
                    <span className="ml-1 text-xs text-gray-500">+${size.price}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {variants.colors?.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium text-gray-900">Color</h3>
            {selectedVariants.color && (
              <span className="text-sm text-gray-600">
                ({variants.colors.find(c => c.value === selectedVariants.color)?.label})
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {variants.colors.map((color) => {
              const isSelected = selectedVariants.color === color.value;
              const isDisabled = !color.available;
              
              return (
                <div key={color.value} className="relative">
                  <button
                    onClick={() => !isDisabled && handleVariantChange('color', color.value)}
                    disabled={isDisabled}
                    onMouseEnter={() => setHoveredColor(color.value)}
                    onMouseLeave={() => setHoveredColor(null)}
                    className={`
                      relative w-10 h-10 rounded-full border-2 transition-all duration-200
                      ${isSelected
                        ? 'border-blue-500 ring-2 ring-blue-200 scale-110'
                        : isDisabled
                        ? 'border-gray-300 opacity-50 cursor-not-allowed'
                        : 'border-gray-300 hover:border-gray-400 hover:scale-105'
                      }
                    `}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow-md" />
                      </div>
                    )}
                  </button>
                  {hoveredColor === color.value && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                      {color.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Material Selector */}
      {variants.materials?.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Material</h3>
          <div className="grid grid-cols-2 gap-2">
            {variants.materials.map((material) => {
              const isSelected = selectedVariants.material === material.value;
              const isDisabled = !material.available;
              
              return (
                <button
                  key={material.value}
                  onClick={() => !isDisabled && handleVariantChange('material', material.value)}
                  disabled={isDisabled}
                  className={`
                    px-3 py-2 text-sm rounded-lg border transition-all duration-200 text-left
                    ${isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : isDisabled
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }
                  `}
                >
                  <div className="font-medium">{material.label}</div>
                  {material.price && (
                    <div className="text-xs text-gray-500">+${material.price}</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Quantity</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="w-16 text-center">
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min={1}
              max={maxQuantity}
              className="w-full text-center border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const CompactVariant = () => (
    <div className={`space-y-4 ${className}`}>
      {variants.sizes?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Size</span>
            <span className="text-xs text-gray-500">
              {selectedVariants.size ? variants.sizes.find(s => s.value === selectedVariants.size)?.label : 'Select'}
            </span>
          </div>
          <div className="flex gap-1">
            {variants.sizes.map((size) => (
              <button
                key={size.value}
                onClick={() => handleVariantChange('size', size.value)}
                disabled={!size.available}
                className={`
                  px-3 py-1 text-xs font-medium rounded border transition-colors
                  ${selectedVariants.size === size.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }
                  ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {variants.colors?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Color</span>
            <span className="text-xs text-gray-500">
              {selectedVariants.color ? variants.colors.find(c => c.value === selectedVariants.color)?.label : 'Select'}
            </span>
          </div>
          <div className="flex gap-2">
            {variants.colors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleVariantChange('color', color.value)}
                disabled={!color.available}
                className={`
                  w-8 h-8 rounded-full border-2 transition-all
                  ${selectedVariants.color === color.value
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300'
                  }
                  ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );

  const PremiumVariant = () => (
    <div className={`space-y-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl ${className}`}>
      {variants.sizes?.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Ruler className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Size</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {variants.sizes.map((size) => {
              const isSelected = selectedVariants.size === size.value;
              return (
                <button
                  key={size.value}
                  onClick={() => handleVariantChange('size', size.value)}
                  disabled={!size.available}
                  className={`
                    px-4 py-3 text-sm font-medium rounded-xl border transition-all duration-300 hover:scale-105
                    ${isSelected
                      ? 'border-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md'
                    }
                    ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {variants.colors?.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Color</h3>
          </div>
          <div className="flex gap-4">
            {variants.colors.map((color) => {
              const isSelected = selectedVariants.color === color.value;
              return (
                <div key={color.value} className="relative">
                  <button
                    onClick={() => handleVariantChange('color', color.value)}
                    disabled={!color.available}
                    className={`
                      relative w-12 h-12 rounded-2xl border-2 transition-all duration-300 hover:scale-110
                      ${isSelected
                        ? 'border-transparent shadow-xl'
                        : 'border-gray-300'
                      }
                      ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    style={{ 
                      backgroundColor: color.hex,
                      boxShadow: isSelected ? `0 0 20px ${color.hex}40` : undefined
                    }}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-gray-800" />
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">#</span>
          </div>
          <h3 className="font-semibold text-gray-900">Quantity</h3>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-all hover:scale-105"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="w-20 text-center">
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min={1}
              max={maxQuantity}
              className="w-full text-center text-lg font-semibold border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
            />
          </div>
          
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return renderVariant();
};

export default ProductVariantSelector;
