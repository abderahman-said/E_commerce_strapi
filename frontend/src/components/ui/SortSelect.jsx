import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const SortSelect = ({
  value = 'newest',
  onChange,
  options = [
    { value: 'newest', label: 'Newest', icon: '🆕' },
    { value: 'price-low', label: 'Price: Low to High', icon: '💰' },
    { value: 'price-high', label: 'Price: High to Low', icon: '💎' }
  ],
  className = '',
  placeholder = 'Sort by'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);

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

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
    } else {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            handleSelect(options[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    }
  };

  const getSortIcon = (value) => {
    switch (value) {
      case 'price-low':
        return <ArrowUp className="w-4 h-4" />;
      case 'price-high':
        return <ArrowDown className="w-4 h-4" />;
      default:
        return <ArrowUpDown className="w-4 h-4" />;
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          w-full flex items-center justify-between
          bg-white border-2 border-gray-200 rounded-xl
          px-4 py-3 text-left font-medium
          hover:border-blue-400 hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          ${isOpen ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="text-blue-600">
            {getSortIcon(value)}
          </div>
          <div>
            <div className="text-gray-900 font-medium">
              {selectedOption?.label || placeholder}
            </div>
            <div className="text-xs text-gray-500">
              {selectedOption?.icon} Sort order
            </div>
          </div>
        </div>
        
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </button>

      {isOpen && (
        <div className="
          absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl
          shadow-2xl overflow-hidden
          transform transition-all duration-200 ease-out
          opacity-100 scale-100 translate-y-0
        ">
          <div className="py-2" role="listbox">
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`
                    w-full px-4 py-3 text-left transition-all duration-200
                    flex items-center gap-3
                    ${isSelected 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent'
                    }
                    ${isHighlighted ? 'bg-gray-100' : ''}
                  `}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className={isSelected ? 'text-blue-600' : 'text-gray-500'}>
                    {getSortIcon(option.value)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">
                      {option.icon} {option.value === 'newest' ? 'Latest items first' : 
                        option.value === 'price-low' ? 'Lowest price first' : 'Highest price first'}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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
};

export default SortSelect;
