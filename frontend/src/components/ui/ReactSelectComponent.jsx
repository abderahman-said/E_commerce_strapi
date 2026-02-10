import React from 'react';
import Select from 'react-select';

const ReactSelectComponent = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  isMulti = false,
  isSearchable = true,
  isClearable = true,
  className = '',
  variant = 'default', // 'default', 'modern', 'minimal', 'dark'
  ...props
}) => {
  // Custom styles for react-select
  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '48px',
      border: `2px solid ${state.isFocused ? '#3B82F6' : '#E5E7EB'}`,
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#9CA3AF',
      },
      backgroundColor: variant === 'dark' ? '#1F2937' : '#FFFFFF',
      color: variant === 'dark' ? '#FFFFFF' : '#111827',
    }),
    
    placeholder: (base) => ({
      ...base,
      color: variant === 'dark' ? '#9CA3AF' : '#6B7280',
      fontWeight: '500',
    }),
    
    input: (base) => ({
      ...base,
      color: variant === 'dark' ? '#FFFFFF' : '#111827',
    }),
    
    singleValue: (base) => ({
      ...base,
      color: variant === 'dark' ? '#FFFFFF' : '#111827',
      fontWeight: '600',
    }),
    
    multiValue: (base) => ({
      ...base,
      backgroundColor: variant === 'dark' ? '#374151' : '#DBEAFE',
      borderRadius: '8px',
      padding: '2px 8px',
      margin: '2px',
    }),
    
    multiValueLabel: (base) => ({
      ...base,
      color: variant === 'dark' ? '#FFFFFF' : '#1E40AF',
      fontWeight: '500',
      fontSize: '14px',
    }),
    
    multiValueRemove: (base) => ({
      ...base,
      color: variant === 'dark' ? '#9CA3AF' : '#6B7280',
      '&:hover': {
        backgroundColor: variant === 'dark' ? '#4B5563' : '#FEE2E2',
        color: variant === 'dark' ? '#FFFFFF' : '#DC2626',
      },
    }),
    
    dropdownIndicator: (base, state) => ({
      ...base,
      color: variant === 'dark' ? '#9CA3AF' : '#6B7280',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform 0.2s ease',
      '&:hover': {
        color: variant === 'dark' ? '#D1D5DB' : '#374151',
      },
    }),
    
    clearIndicator: (base) => ({
      ...base,
      color: variant === 'dark' ? '#9CA3AF' : '#6B7280',
      '&:hover': {
        color: variant === 'dark' ? '#EF4444' : '#DC2626',
      },
    }),
    
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: variant === 'dark' ? '#374151' : '#E5E7EB',
    }),
    
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '2px solid #E5E7EB',
      backgroundColor: variant === 'dark' ? '#1F2937' : '#FFFFFF',
      overflow: 'hidden',
      marginTop: '8px',
    }),
    
    menuList: (base) => ({
      ...base,
      padding: '8px',
      borderRadius: '12px',
      backgroundColor: variant === 'dark' ? '#1F2937' : '#FFFFFF',
    }),
    
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? variant === 'dark' ? '#374151' : '#DBEAFE'
        : state.isFocused 
        ? variant === 'dark' ? '#374151' : '#F3F4F6'
        : 'transparent',
      color: state.isSelected 
        ? variant === 'dark' ? '#FFFFFF' : '#1E40AF'
        : variant === 'dark' ? '#FFFFFF' : '#111827',
      borderRadius: '8px',
      padding: '12px 16px',
      margin: '2px 0',
      cursor: 'pointer',
      fontWeight: state.isSelected ? '600' : '400',
      '&:active': {
        backgroundColor: variant === 'dark' ? '#4B5563' : '#E5E7EB',
      },
    }),
    
    noOptionsMessage: (base) => ({
      ...base,
      color: variant === 'dark' ? '#9CA3AF' : '#6B7280',
      padding: '16px',
      textAlign: 'center',
    }),
  };

  // Enhanced options with icons and descriptions
  const formatOptionLabel = (option) => (
    <div className="flex items-center gap-3">
      {option.icon && (
        <span className="text-lg">{option.icon}</span>
      )}
      <div className="flex-1">
        <div className="font-medium">{option.label}</div>
        {option.description && (
          <div className="text-xs opacity-75 mt-1">{option.description}</div>
        )}
      </div>
      {option.badge && (
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
          {option.badge}
        </span>
      )}
    </div>
  );

  // Custom single value display
  const formatSingleValue = (option) => (
    <div className="flex items-center gap-2">
      {option.icon && <span>{option.icon}</span>}
      <span className="font-medium">{option.label}</span>
    </div>
  );

  return (
    <div className={className}>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={isClearable}
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
        formatSingleValue={formatSingleValue}
        components={{
          DropdownIndicator: () => (
            <div style={{ padding: '0 8px' }}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                style={{ color: variant === 'dark' ? '#9CA3AF' : '#6B7280' }}
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          ),
          ClearIndicator: (props) => (
            <div {...props} style={{ padding: '0 8px', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          ),
        }}
        {...props}
      />
    </div>
  );
};

export default ReactSelectComponent;
