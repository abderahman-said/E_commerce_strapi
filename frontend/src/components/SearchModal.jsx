import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api, getImageUrl } from '../utils/api';

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < results.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault();
                handleProductClick(results[selectedIndex]);
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose, results.length, selectedIndex]);

    useEffect(() => {
        const searchProducts = async () => {
            if (query.trim().length > 1) {
                try {
                    const res = await api.getProducts(`&filters[name][$containsi]=${query}`);
                    const mappedResults = res.data.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        category: item.category?.name || 'Uncategorized',
                        image: getImageUrl(item.image)
                    }));
                    setResults(mappedResults);
                } catch (err) {
                    console.error('Search failed:', err);
                }
            } else {
                setResults([]);
            }
            setSelectedIndex(-1);
        };

        const timeoutId = setTimeout(searchProducts, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`);
        onClose();
        setQuery('');
    };

    const handleSearchAll = () => {
        if (query.trim()) {
            navigate(`/shop?search=${encodeURIComponent(query)}`);
            onClose();
            setQuery('');
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={onClose}
            />
            
            {/* Search Modal */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[55] overflow-hidden">
                {/* Search Input */}
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <Search size={20} className="text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search products, categories..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 text-lg placeholder-gray-400 focus:outline-none"
                        />
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Search Results */}
                <div className="max-h-96 overflow-y-auto">
                    {query.trim() && results.length > 0 ? (
                        <>
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Products ({results.length})
                            </div>
                            {results.map((product, index) => (
                                <div
                                    key={product.id}
                                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3 ${
                                        selectedIndex === index ? 'bg-gray-50' : ''
                                    }`}
                                    onClick={() => handleProductClick(product)}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 truncate">
                                            {product.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 truncate">
                                            {product.category}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-primary">
                                            {formatPrice(product.price)}
                                        </p>
                                        {product.originalPrice && (
                                            <p className="text-xs text-gray-400 line-through">
                                                {formatPrice(product.originalPrice)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {/* Search All Results Button */}
                            <div className="p-4 border-t border-gray-100">
                                <button
                                    onClick={handleSearchAll}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium"
                                >
                                    Search all results for "{query}"
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </>
                    ) : query.trim() ? (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No products found
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Try searching with different keywords
                            </p>
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Start typing to search
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Search for products, categories, and more
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchModal;
