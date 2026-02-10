import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUpDown, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';

const ModernSortSelect = ({
  value = 'newest',
  onChange,
  className = '',
  variant = 'modern' // 'modern', 'minimal', 'premium'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { 
      value: 'newest', 
      label: 'Newest', 
      description: 'Latest items first',
      icon: '🆕',
      color: 'blue'
    },
    { 
      value: 'price-low', 
      label: 'Price: Low to High', 
      description: 'Best deals first',
      icon: '💰',
      color: 'green'
    },
    { 
      value: 'price-high', 
      label: 'Price: High to Low', 
      description: 'Premium items first',
      icon: '💎',
      color: 'purple'
    }
  ];

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const getSortIcon = (optionValue) => {
    switch (optionValue) {
      case 'price-low':
        return <ArrowUp className="w-4 h-4" />;
      case 'price-high':
        return <ArrowDown className="w-4 h-4" />;
      default:
        return <ArrowUpDown className="w-4 h-4" />;
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'from-blue-50 to-indigo-50',
        text: 'text-blue-700',
        border: 'border-blue-500',
        icon: 'text-blue-600'
      },
      green: {
        bg: 'from-green-50 to-emerald-50',
        text: 'text-green-700',
        border: 'border-green-500',
        icon: 'text-green-600'
      },
      purple: {
        bg: 'from-purple-50 to-pink-50',
        text: 'text-purple-700',
        border: 'border-purple-500',
        icon: 'text-purple-600'
      }
    };
    return colors[color] || colors.blue;
  };

  const renderVariant = () => {
    switch (variant) {
      case 'minimal':
        return <MinimalVariant />;
      case 'premium':
        return <PremiumVariant />;
      default:
        return <ModernVariant />;
    }
  };

  const ModernVariant = () => (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between
          bg-white border-2 border-gray-200 rounded-xl
          px-4 py-3 text-left font-medium
          hover:border-blue-400 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-300
          ${isOpen ? 'border-blue-500 shadow-xl ring-2 ring-blue-200' : ''}
        `}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
            {getSortIcon(value)}
          </div>
          <div>
            <div className="text-gray-900 font-semibold">
              {selectedOption?.label}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              {selectedOption?.icon} {selectedOption?.description}
            </div>
          </div>
        </div>
        
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </button>

      {isOpen && (
        <div className="
          absolute z-50 w-full mt-3 bg-white border-2 border-gray-200 rounded-2xl
          shadow-2xl overflow-hidden
          transform transition-all duration-300 ease-out
          opacity-100 scale-100 translate-y-0
        ">
          <div className="p-2">
            {options.map((option) => {
              const isSelected = option.value === value;
              const colors = getColorClasses(option.color);
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`
                    w-full p-3 rounded-xl transition-all duration-200
                    flex items-center gap-3 mb-2 last:mb-0
                    ${isSelected 
                      ? `bg-gradient-to-r ${colors.bg} ${colors.text} border-2 ${colors.border} shadow-md` 
                      : 'hover:bg-gray-50 text-gray-700 border-2 border-transparent'
                    }
                  `}
                >
                  <div className={`p-2 rounded-lg ${
                    isSelected 
                      ? 'bg-white bg-opacity-80' 
                      : 'bg-gray-100'
                  }`}>
                    <div className={isSelected ? colors.icon : 'text-gray-600'}>
                      {getSortIcon(option.value)}
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-xs opacity-75">{option.description}</div>
                  </div>
                  <div className="text-lg">{option.icon}</div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const MinimalVariant = () => (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between
          bg-white border border-gray-300 rounded-lg
          px-3 py-2 text-sm
          hover:border-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
        "
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{getSortIcon(value)}</span>
          <span className="text-gray-900">{selectedOption?.label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="
          absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg
        ">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-3 py-2 text-sm text-left transition-colors
                  flex items-center gap-2
                  ${isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'}
                `}
              >
                <span className="text-gray-600">{getSortIcon(option.value)}</span>
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  const PremiumVariant = () => (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between
          bg-gradient-to-r from-gray-900 to-gray-800 text-white
          border-2 border-gray-700 rounded-2xl
          px-6 py-4 text-left font-semibold
          hover:from-gray-800 hover:to-gray-700 hover:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          transition-all duration-300 shadow-xl
        "
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold">
              {selectedOption?.label}
            </div>
            <div className="text-xs text-gray-300 opacity-80">
              {selectedOption?.description}
            </div>
          </div>
        </div>
        
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-6 h-6 text-gray-300" />
        </div>
      </button>

      {isOpen && (
        <div className="
          absolute z-50 w-full mt-3 bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 rounded-2xl
          shadow-2xl overflow-hidden
        ">
          <div className="p-3">
            {options.map((option) => {
              const isSelected = option.value === value;
              const colors = getColorClasses(option.color);
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`
                    w-full p-4 rounded-xl transition-all duration-200
                    flex items-center gap-4 mb-2 last:mb-0
                    ${isSelected 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                      : 'hover:bg-gray-700 text-gray-200'
                    }
                  `}
                >
                  <div className={`p-3 rounded-lg ${
                    isSelected 
                      ? 'bg-white bg-opacity-20' 
                      : 'bg-gray-700'
                  }`}>
                    <div className={isSelected ? 'text-white' : 'text-gray-400'}>
                      {getSortIcon(option.value)}
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold">{option.label}</div>
                    <div className="text-xs opacity-80">{option.description}</div>
                  </div>
                  <div className="text-2xl">{option.icon}</div>
                  {isSelected && (
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return renderVariant();
};

export default ModernSortSelect;
