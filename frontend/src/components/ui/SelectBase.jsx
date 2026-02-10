import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check, X, Search, Loader2 } from 'lucide-react';

const SelectBase = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  loading = false,
  searchable = false,
  multiSelect = false,
  clearable = false,
  className = '',
  optionClassName = '',
  dropdownClassName = '',
  maxHeight = 240,
  emptyMessage = 'No options available',
  noResultsMessage = 'No results found',
  renderOption,
  renderValue,
  onSearch,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const searchInputRef = useRef(null);

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery || !searchable) return options;
    return options.filter(option => 
      option.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, searchable]);

  const selectedOptions = React.useMemo(() => {
    if (multiSelect) {
      return options.filter(option => 
        Array.isArray(value) && value.includes(option.value)
      );
    }
    return options.find(option => option.value === value);
  }, [options, value, multiSelect]);

  const handleToggle = useCallback(() => {
    if (disabled || loading) return;
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setHighlightedIndex(-1);
      setSearchQuery('');
    }
  }, [disabled, loading, isOpen]);

  const handleSelect = useCallback((option) => {
    if (disabled || loading) return;
    
    if (multiSelect) {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(option.value)
        ? currentValue.filter(v => v !== option.value)
        : [...currentValue, option.value];
      onChange(newValue);
    } else {
      onChange(option.value);
      setIsOpen(false);
    }
    
    if (searchable) {
      setSearchQuery('');
      setHighlightedIndex(-1);
    }
  }, [disabled, loading, multiSelect, value, onChange, searchable]);

  const handleClear = useCallback((e) => {
    e.stopPropagation();
    if (multiSelect) {
      onChange([]);
    } else {
      onChange(null);
    }
    setSearchQuery('');
  }, [multiSelect, onChange]);

  const handleKeyDown = useCallback((e) => {
    if (disabled || loading) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else {
          handleToggle();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
        inputRef.current?.focus();
        break;
      case 'Backspace':
        if (searchable && !searchQuery && multiSelect && Array.isArray(value) && value.length > 0) {
          onChange(value.slice(0, -1));
        }
        break;
    }
  }, [disabled, loading, isOpen, highlightedIndex, filteredOptions, handleSelect, handleToggle, searchable, searchQuery, multiSelect, value]);

  const handleSearchChange = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHighlightedIndex(-1);
    onSearch?.(query);
  }, [onSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable) {
      searchInputRef.current?.focus();
    }
  }, [isOpen, searchable]);

  const displayValue = React.useMemo(() => {
    if (renderValue) {
      return renderValue(selectedOptions);
    }

    if (multiSelect) {
      if (Array.isArray(value) && value.length > 0) {
        return `${value.length} selected`;
      }
      return placeholder;
    }

    return selectedOptions?.label || placeholder;
  }, [selectedOptions, multiSelect, value, placeholder, renderValue]);

  const hasValue = multiSelect 
    ? Array.isArray(value) && value.length > 0
    : value !== null && value !== undefined;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={inputRef}
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between
          border-2 rounded-xl px-4 py-3 text-left
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          shadow-sm hover:shadow-md
          ${error 
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50' 
            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-gray-300'
          }
          ${isOpen ? 'border-blue-500 shadow-lg ring-2 ring-blue-200 ring-offset-2' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        {...props}
      >
        <span className={`truncate flex-1 ${!hasValue ? 'text-gray-400' : 'text-gray-900 font-medium'}`}>
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : displayValue}
        </span>
        
        <div className="flex items-center gap-2 ml-2">
          {clearable && hasValue && !disabled && !loading && (
            <button
              onClick={handleClear}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
              aria-label="Clear selection"
            >
              <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
            </button>
          )}
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className={`w-5 h-5 text-gray-500 ${isOpen ? 'text-blue-500' : ''}`} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div 
          className={`
            absolute z-50 w-full mt-2 bg-white border-2 rounded-xl shadow-2xl overflow-hidden
            transform transition-all duration-200 ease-out
            ${dropdownClassName}
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
          `}
        >
          {searchable && (
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search options..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                />
              </div>
            </div>
          )}

          <div 
            className="overflow-y-auto"
            style={{ maxHeight: `${maxHeight}px` }}
            role="listbox"
            aria-multiselectable={multiSelect}
          >
            {filteredOptions.length === 0 ? (
              <div className="p-6 text-center">
                <div className="text-gray-400 mb-2">
                  {searchQuery ? (
                    <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  )}
                </div>
                <p className="text-gray-500 font-medium">
                  {searchQuery ? noResultsMessage : emptyMessage}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = multiSelect
                  ? Array.isArray(value) && value.includes(option.value)
                  : value === option.value;
                const isHighlighted = index === highlightedIndex;

                if (renderOption) {
                  return renderOption(option, isSelected, isHighlighted, () => handleSelect(option));
                }

                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`
                      px-4 py-3 cursor-pointer transition-all duration-200
                      flex items-center justify-between
                      border-l-4 border-transparent
                      ${isSelected 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-blue-500 font-medium' 
                        : 'hover:bg-gray-50 hover:border-l-gray-400 text-gray-700'
                      }
                      ${isHighlighted ? 'bg-gray-100 border-l-gray-400' : ''}
                      ${optionClassName}
                    `}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {option.icon && (
                        <span className="text-gray-400">{option.icon}</span>
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-sm text-gray-500 mt-0.5">{option.description}</div>
                        )}
                      </div>
                      {option.badge && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <div className="ml-3">
                        <Check className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectBase;
