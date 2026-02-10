import React, { useState, useCallback } from 'react';
import { DollarSign, Minus, X } from 'lucide-react';

const PriceRangeFilter = ({
  minPrice = 0,
  maxPrice = 1000,
  value = { min: 0, max: 1000 },
  onChange,
  currency = '$',
  steps = 10,
  variant = 'default', // 'default', 'compact', 'premium'
  className = ''
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(null);

  const handleSliderChange = useCallback((type, newValue) => {
    const updatedValue = {
      ...localValue,
      [type]: newValue
    };
    
    // Ensure min doesn't exceed max and vice versa
    if (type === 'min' && newValue > updatedValue.max) {
      updatedValue.max = newValue;
    } else if (type === 'max' && newValue < updatedValue.min) {
      updatedValue.min = newValue;
    }
    
    setLocalValue(updatedValue);
    onChange(updatedValue);
  }, [localValue, onChange]);

  const handleInputChange = useCallback((type, inputValue) => {
    const numValue = parseFloat(inputValue) || 0;
    const clampedValue = Math.max(minPrice, Math.min(maxPrice, numValue));
    handleSliderChange(type, clampedValue);
  }, [minPrice, maxPrice, handleSliderChange]);

  const handleClear = useCallback(() => {
    const defaultValue = { min: minPrice, max: maxPrice };
    setLocalValue(defaultValue);
    onChange(defaultValue);
  }, [minPrice, maxPrice, onChange]);

  const getPercentage = useCallback((value) => {
    return ((value - minPrice) / (maxPrice - minPrice)) * 100;
  }, [minPrice, maxPrice]);

  const isActive = localValue.min !== minPrice || localValue.max !== maxPrice;

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
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Price Range
        </h3>
        {isActive && (
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-blue-600 rounded-full"
              style={{
                left: `${getPercentage(localValue.min)}%`,
                right: `${100 - getPercentage(localValue.max)}%`
              }}
            />
          </div>
          
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localValue.min}
            onChange={(e) => handleSliderChange('min', parseFloat(e.target.value))}
            className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
            onMouseDown={() => setIsDragging('min')}
            onMouseUp={() => setIsDragging(null)}
          />
          
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localValue.max}
            onChange={(e) => handleSliderChange('max', parseFloat(e.target.value))}
            className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
            onMouseDown={() => setIsDragging('max')}
            onMouseUp={() => setIsDragging(null)}
          />
          
          <div
            className={`absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full -translate-y-1 transition-shadow ${
              isDragging === 'min' ? 'shadow-lg' : 'shadow-md'
            }`}
            style={{ left: `${getPercentage(localValue.min)}%`, transform: 'translateX(-50%) translateY(-25%)' }}
          />
          
          <div
            className={`absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full -translate-y-1 transition-shadow ${
              isDragging === 'max' ? 'shadow-lg' : 'shadow-md'
            }`}
            style={{ left: `${getPercentage(localValue.max)}%`, transform: 'translateX(-50%) translateY(-25%)' }}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-600 block mb-1">Min</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {currency}
              </span>
              <input
                type="number"
                value={localValue.min}
                onChange={(e) => handleInputChange('min', e.target.value)}
                className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={minPrice}
                max={maxPrice}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center pt-6">
            <Minus className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="flex-1">
            <label className="text-xs text-gray-600 block mb-1">Max</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {currency}
              </span>
              <input
                type="number"
                value={localValue.max}
                onChange={(e) => handleInputChange('max', e.target.value)}
                className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={minPrice}
                max={maxPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CompactVariant = () => (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Price</span>
        {isActive && (
          <button
            onClick={handleClear}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            {currency}
          </span>
          <input
            type="number"
            value={localValue.min}
            onChange={(e) => handleInputChange('min', e.target.value)}
            className="w-full pl-5 pr-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Min"
          />
        </div>
        
        <span className="text-gray-400">-</span>
        
        <div className="relative flex-1">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            {currency}
          </span>
          <input
            type="number"
            value={localValue.max}
            onChange={(e) => handleInputChange('max', e.target.value)}
            className="w-full pl-5 pr-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );

  const PremiumVariant = () => (
    <div className={`space-y-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <DollarSign className="w-3 h-3 text-white" />
          </div>
          Price Range
        </h3>
        {isActive && (
          <button
            onClick={handleClear}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/50"
          >
            <X className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="relative h-3">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full" />
          <div
            className="absolute h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
            style={{
              left: `${getPercentage(localValue.min)}%`,
              right: `${100 - getPercentage(localValue.max)}%`
            }}
          />
          
          <div
            className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 top-1/2 hover:scale-110 transition-transform"
            style={{ left: `${getPercentage(localValue.min)}%` }}
          />
          
          <div
            className="absolute w-5 h-5 bg-white border-2 border-purple-500 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 top-1/2 hover:scale-110 transition-transform"
            style={{ left: `${getPercentage(localValue.max)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <span className="text-gray-600">{currency}</span>
            <span className="font-semibold text-gray-900">{localValue.min}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">{currency}</span>
            <span className="font-semibold text-gray-900">{localValue.max}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return renderVariant();
};

export default PriceRangeFilter;
