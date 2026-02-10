import React from 'react';
import SelectBase from './SelectBase';

const SelectMinimal = ({ 
  className = '',
  optionClassName = '',
  dropdownClassName = '',
  ...props 
}) => {
  return (
    <SelectBase
      className={className}
      optionClassName={`
        ${optionClassName}
        border-b border-gray-100 last:border-b-0
        text-sm text-gray-700
        focus:bg-gray-50 focus:outline-none
        hover:bg-gray-50
      `}
      dropdownClassName={`
        ${dropdownClassName}
        border border-gray-200 rounded-lg shadow-sm
        bg-white
        backdrop-blur-sm
      `}
      maxHeight={240}
      {...props}
    />
  );
};

export default SelectMinimal;
