import React, { useState, useMemo } from 'react';
import { Hash, X, Plus, Search } from 'lucide-react';
import MultiSelect from './MultiSelect';

const TagFilter = ({
  tags = [],
  selectedTags = [],
  onChange,
  popularTags = [],
  maxVisible = 10,
  searchable = true,
  clearable = true,
  variant = 'default', // 'default', 'cloud', 'pill'
  className = ''
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = useMemo(() => {
    if (!searchQuery) return tags;
    return tags.filter(tag => 
      tag.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tags, searchQuery]);

  const displayTags = showAll ? filteredTags : filteredTags.slice(0, maxVisible);
  const hasMore = filteredTags.length > maxVisible;

  const handleTagToggle = (tagValue) => {
    const newSelection = selectedTags.includes(tagValue)
      ? selectedTags.filter(t => t !== tagValue)
      : [...selectedTags, tagValue];
    onChange(newSelection);
  };

  const handleClearAll = () => {
    onChange([]);
    setSearchQuery('');
  };

  const getTagSize = (tag) => {
    if (!tag.count) return 'base';
    if (tag.count > 20) return 'lg';
    if (tag.count > 10) return 'md';
    return 'sm';
  };

  const renderVariant = () => {
    switch (variant) {
      case 'cloud':
        return <CloudVariant />;
      case 'pill':
        return <PillVariant />;
      default:
        return <DefaultVariant />;
    }
  };

  const DefaultVariant = () => (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Hash className="w-4 h-4" />
          Tags
        </h3>
        {clearable && selectedTags.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tags..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="space-y-2">
        {popularTags.length > 0 && (
          <div>
            <p className="text-xs text-gray-600 font-medium mb-2">Popular</p>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <TagButton
                  key={tag.value}
                  tag={tag}
                  isSelected={selectedTags.includes(tag.value)}
                  onToggle={() => handleTagToggle(tag.value)}
                  variant="default"
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-xs text-gray-600 font-medium mb-2">All Tags</p>
          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <TagButton
                key={tag.value}
                tag={tag}
                isSelected={selectedTags.includes(tag.value)}
                onToggle={() => handleTagToggle(tag.value)}
                variant="default"
              />
            ))}
            {hasMore && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Show {filteredTags.length - maxVisible} more
              </button>
            )}
            {showAll && (
              <button
                onClick={() => setShowAll(false)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
              >
                Show less
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const CloudVariant = () => (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Hash className="w-4 h-4" />
          Tag Cloud
        </h3>
        {clearable && selectedTags.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {displayTags.map((tag) => {
          const size = getTagSize(tag);
          const isSelected = selectedTags.includes(tag.value);
          
          const sizeClasses = {
            sm: 'text-xs px-2 py-1',
            md: 'text-sm px-3 py-1',
            lg: 'text-base px-4 py-2',
            base: 'text-sm px-3 py-1'
          };

          return (
            <button
              key={tag.value}
              onClick={() => handleTagToggle(tag.value)}
              className={`
                ${sizeClasses[size]}
                rounded-full transition-all duration-200 hover:scale-105
                ${isSelected
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                ${tag.count ? 'font-medium' : 'font-normal'}
              `}
            >
              {tag.label}
              {tag.count && (
                <span className="ml-1 opacity-75">({tag.count})</span>
              )}
            </button>
          );
        })}
        
        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            +{filteredTags.length - maxVisible} more
          </button>
        )}
      </div>
    </div>
  );

  const PillVariant = () => (
    <div className={`space-y-3 ${className}`}>
      <MultiSelect
        options={tags}
        value={selectedTags}
        onChange={onChange}
        placeholder="Select tags..."
        searchable={searchable}
        clearable={clearable}
        tagVariant="pill"
        className="w-full"
      />
      
      {popularTags.length > 0 && (
        <div>
          <p className="text-xs text-gray-600 font-medium mb-2">Quick select</p>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <TagButton
                key={tag.value}
                tag={tag}
                isSelected={selectedTags.includes(tag.value)}
                onToggle={() => handleTagToggle(tag.value)}
                variant="pill"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const TagButton = ({ tag, isSelected, onToggle, variant }) => {
    const baseClasses = "transition-all duration-200 hover:scale-105";
    
    if (variant === 'pill') {
      return (
        <button
          onClick={onToggle}
          className={`
            ${baseClasses}
            px-3 py-1 text-sm rounded-full
            ${isSelected
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {tag.label}
        </button>
      );
    }

    return (
      <button
        onClick={onToggle}
        className={`
          ${baseClasses}
          px-3 py-1 text-sm rounded-full border
          ${isSelected
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
          }
        `}
      >
        {tag.label}
        {tag.count && (
          <span className="ml-1 text-xs text-gray-500">({tag.count})</span>
        )}
      </button>
    );
  };

  return renderVariant();
};

export default TagFilter;
