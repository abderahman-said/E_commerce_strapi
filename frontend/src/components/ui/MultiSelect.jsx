import React, { useState } from 'react';
import { X, Tag } from 'lucide-react';
import SelectBase from './SelectBase';

const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = 'Select options',
  disabled = false,
  error = false,
  loading = false,
  searchable = true,
  clearable = true,
  maxTags = 5,
  tagVariant = 'default', // 'default', 'pill', 'minimal'
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const selectedOptions = React.useMemo(() => {
    return options.filter(option => 
      Array.isArray(value) && value.includes(option.value)
    );
  }, [options, value]);

  const handleRemoveTag = (optionValue, e) => {
    e.stopPropagation();
    const newValue = value.filter(v => v !== optionValue);
    onChange(newValue);
  };

  const renderValue = () => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }

    const displayTags = selectedOptions.slice(0, maxTags);
    const remainingCount = selectedOptions.length - maxTags;

    return (
      <div className="flex flex-wrap items-center gap-1">
        {displayTags.map((option) => (
          <TagItem
            key={option.value}
            option={option}
            onRemove={(e) => handleRemoveTag(option.value, e)}
            variant={tagVariant}
            disabled={disabled}
          />
        ))}
        {remainingCount > 0 && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  };

  const TagItem = ({ option, onRemove, variant, disabled }) => {
    const baseClasses = "inline-flex items-center gap-1 text-xs font-medium transition-all duration-200";
    
    const variantClasses = {
      default: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      pill: "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full",
      minimal: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
    };

    return (
      <span
        className={`${baseClasses} ${variantClasses[variant]} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {option.label}
        {!disabled && (
          <button
            onClick={onRemove}
            className="hover:opacity-70 transition-opacity"
            aria-label={`Remove ${option.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </span>
    );
  };

  return (
    <SelectBase
      multiSelect={true}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      loading={loading}
      searchable={searchable}
      clearable={clearable}
      renderValue={renderValue}
      className={`
        ${className}
        ${isFocused ? 'ring-2 ring-blue-200' : ''}
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default MultiSelect;
