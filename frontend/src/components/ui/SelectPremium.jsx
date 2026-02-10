import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SelectBase from './SelectBase';

const SelectPremium = ({ 
  className = '',
  optionClassName = '',
  dropdownClassName = '',
  ...props 
}) => {
  return (
    <SelectBase
      className={`
        ${className}
        border-gray-300 rounded-xl
        bg-gradient-to-r from-white to-gray-50
        shadow-sm hover:shadow-lg transition-all duration-300
        focus:border-purple-500 focus:shadow-purple-200
        backdrop-blur-sm
      `}
      optionClassName={`
        ${optionClassName}
        px-4 py-3 text-sm font-medium
        rounded-lg mx-2 my-1
        hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50
        hover:shadow-md hover:scale-[1.02]
        focus:outline-none focus:ring-2 focus:ring-purple-400
        transition-all duration-200
      `}
      dropdownClassName={`
        ${dropdownClassName}
        border-0 rounded-2xl shadow-2xl
        bg-gradient-to-br from-white via-purple-50 to-pink-50
        backdrop-blur-xl
        mt-3
      `}
      maxHeight={320}
      renderOption={(option, isSelected, isHighlighted, onSelect) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onSelect}
          className={`
            px-4 py-3 text-sm font-medium cursor-pointer
            rounded-lg mx-2 my-1
            ${isSelected 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
              : 'hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:shadow-md'
            }
            ${isHighlighted && !isSelected ? 'bg-gradient-to-r from-purple-100 to-pink-100' : ''}
            transition-all duration-200
          `}
          role="option"
          aria-selected={isSelected}
        >
          <div className="flex items-center justify-between">
            <span>{option.label}</span>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
      {...props}
    />
  );
};

export default SelectPremium;
