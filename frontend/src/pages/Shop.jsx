import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ChevronDown, Filter, X } from 'lucide-react';
import { api, getImageUrl } from '../utils/api';
import CategoryFilter from '../components/ui/CategoryFilter';
import PriceRangeFilter from '../components/ui/PriceRangeFilter';
import TagFilter from '../components/ui/TagFilter';
import SortSelect from '../components/ui/SortSelect';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' }
];

const Shop = () => {
    const [searchParams] = useSearchParams();
    const activeCategory = searchParams.get('active');
    const urlSearchQuery = searchParams.get('search') || '';

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
    const [selectedTags, setSelectedTags] = useState([]);

    // Fetch data from Strapi
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [productsRes, categoriesRes] = await Promise.all([
                    api.getProducts(),
                    api.getCategories()
                ]);

                const mappedProducts = productsRes.data.map(item => ({
                    id: item.id,
                    documentId: item.documentId,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    slug: item.slug,
                    category: item.category?.name || 'Uncategorized',
                    image: getImageUrl(item.image),
                    stock: 10,
                    rating: 4.5
                }));

                const mappedCategories = [
                    { value: 'all', label: 'All', count: mappedProducts.length },
                    ...categoriesRes.data.map(cat => ({
                        value: cat.slug || cat.name.toLowerCase().replace(' ', '-'),
                        label: cat.name,
                        count: mappedProducts.filter(p => p.category === cat.name).length
                    }))
                ];

                setProducts(mappedProducts);
                setCategories(mappedCategories);
            } catch (err) {
                console.error('Failed to load data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Set active category from URL parameter
    useEffect(() => {
        if (activeCategory) {
            const categoryMap = {
                'new-arrivals': 'New Arrivals',
                'men': 'Men',
                'women': 'Women',
                'accessories': 'Accessories'
            };
            const category = categoryMap[activeCategory];
            if (category && !selectedCategories.includes(category)) {
                setSelectedCategories([category]);
            }
        }
    }, [activeCategory, selectedCategories]);

    const tags = [
      { value: 'bestseller', label: 'Bestseller', count: 0 },
      { value: 'new', label: 'New Arrival', count: 0 },
      { value: 'sale', label: 'On Sale', count: 0 },
    ];

    const filteredProducts = useMemo(() => {
        let result = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
            const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => 
                product.tags && product.tags.includes(tag)
            );
            return matchesSearch && matchesCategory && matchesPrice && matchesTags;
        });

        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }
        // 'newest' assumes default order for now

        return result;
    }, [searchQuery, selectedCategories, sortBy, priceRange, selectedTags]);

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedCategories([]);
        setPriceRange({ min: 0, max: 500 });
        setSelectedTags([]);
        setSortBy('newest');
    };

    const activeFiltersCount = [
        searchQuery !== '',
        selectedCategories.length > 0,
        priceRange.min > 0 || priceRange.max < 500,
        selectedTags.length > 0
    ].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-white">
            {/* Header Banner */}
            <div 
                className="bg-gray-900 text-white py-12 sm:py-16 mb-8 sm:mb-12 relative overflow-hidden"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=400&fit=crop&crop=center)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-3 sm:mb-4">The Collection</h1>
                        <p className="text-base sm:text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto">
                            Curated essentials for modern wardrobe. Timeless pieces designed for everyday luxury.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-16 sm:pb-20">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-4 sm:mb-6 flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        {filteredProducts.length} Products
                    </h2>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation"
                    >
                        <SlidersHorizontal size={16} className="sm:size-18" />
                        <span className="text-sm">Filters</span>
                        {activeFiltersCount > 0 && (
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 sm:gap-8">
                    
                    {/* Sidebar Filters */}
                    <aside className="hidden lg:block space-y-4 sm:space-y-6">
                        {/* Filter Header */}
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Filter size={18} className=" " />
                                Filters
                            </h2>
                            {activeFiltersCount > 0 && (
                                <button
                                    onClick={clearAllFilters}
                                    className="text-sm text-gray-900 hover:text-gray-700 font-medium flex items-center gap-1 touch-manipulation"
                                >
                                    <X size={14} className="" />
                                    Clear All
                                </button>
                            )}
                        </div>

                        {/* Search */}
                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Search</h3>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 sm:size-18" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Sort By</h3>
                            <SortSelect
                                value={sortBy}
                                onChange={setSortBy}
                                options={SORT_OPTIONS}
                            />
                        </div>

                        {/* Categories */}
                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
                            <CategoryFilter
                                categories={categories}
                                selectedCategories={selectedCategories.map(cat => cat.toLowerCase().replace(' ', '-'))}
                                onChange={(cats) => {
                                    const categoryMap = {
                                        'new-arrivals': 'New Arrivals',
                                        'men': 'Men',
                                        'women': 'Women',
                                        'accessories': 'Accessories'
                                    };
                                    setSelectedCategories(cats.map(cat => categoryMap[cat] || cat));
                                }}
                                variant="sidebar"
                            />
                        </div>

                        {/* Price Range */}
                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
                            <PriceRangeFilter
                                minPrice={0}
                                maxPrice={500}
                                value={priceRange}
                                onChange={setPriceRange}
                                variant="compact"
                            />
                        </div>

                        {/* Tags */}
                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200">
                            <TagFilter
                                tags={tags}
                                selectedTags={selectedTags}
                                onChange={setSelectedTags}
                                variant="default"
                                popularTags={tags.slice(0, 3)}
                            />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div>
                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <span className="text-sm text-gray-600">
                                    Showing <strong className="text-gray-900">{filteredProducts.length}</strong> products
                                </span>
                                {activeFiltersCount > 0 && (
                                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                        {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                                    </span>
                                )}
                            </div>

                            {/* Mobile Filter Toggle */}
                            <button 
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center gap-2 text-sm font-medium bg-white border border-gray-300 px-3 sm:px-4 py-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors shadow-sm touch-manipulation"
                            >
                                <SlidersHorizontal size={14} className="sm:size-16" />
                                {showFilters ? 'Hide' : 'Show'} Filters
                                {activeFiltersCount > 0 && (
                                    <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full" />
                                )}
                            </button>
                        </div>

                        {/* Mobile Filters */}
                        {showFilters && (
                            <div className="lg:hidden mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-xl shadow-lg border border-gray-200">
                                <div className="space-y-3 sm:space-y-4">
                                    {/* Mobile Search */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Search</h3>
                                        <div className="relative">
                                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 sm:size-18" />
                                            <input
                                                type="text"
                                                placeholder="Search products..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Mobile Categories */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Category</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {CATEGORIES.map(category => (
                                                <button
                                                    key={category}
                                                    onClick={() => {
                                                        if (category === 'All') {
                                                            setSelectedCategories([]);
                                                        } else if (selectedCategories.includes(category)) {
                                                            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
                                                        } else {
                                                            setSelectedCategories([...selectedCategories, category]);
                                                        }
                                                    }}
                                                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors touch-manipulation ${
                                                        selectedCategories.includes(category) 
                                                            ? 'bg-blue-600 text-white' 
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                            {loading ? (
                                // Loading Skeletons
                                [...Array(8)].map((_, i) => (
                                    <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-[400px]"></div>
                                ))
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full py-12 sm:py-16 md:py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-300">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 overflow-hidden">
                                        <img 
                                            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&h=100&fit=crop&crop=center" 
                                            alt="No products found" 
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
                                        Try adjusting your filters or search terms to find what you're looking for.
                                    </p>
                                    <button
                                        onClick={clearAllFilters}
                                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium touch-manipulation"
                                    >
                                        <X size={16} className="sm:size-18" />
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
