import React from 'react';
import SelectBase from './SelectBase';

const SelectModernSaaS = ({ 
  className = '',
  optionClassName = '',
  dropdownClassName = '',
  ...props 
}) => {
  return (
    <SelectBase
      className={`
        ${className}
        border-gray-200 rounded-xl
        shadow-sm hover:shadow-lg transition-all duration-300
        focus:border-blue-500 focus:shadow-blue-100
        bg-white
      `}
      optionClassName={`
        ${optionClassName}
        px-4 py-3 text-sm
        border-l-4 border-transparent
        hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50
        focus:bg-gradient-to-r focus:from-blue-50 focus:to-indigo-50 focus:border-blue-500 focus:outline-none
        transition-all duration-200
      `}
      dropdownClassName={`
        ${dropdownClassName}
        border border-gray-200 rounded-2xl shadow-2xl
        bg-white backdrop-blur-md
        mt-3
      `}
      maxHeight={320}
      {...props}
    />
  );
};

export default SelectModernSaaS;
