import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Star, Minus, Plus, Heart, Share2, Check } from 'lucide-react';
import ProductVariantSelector from '../components/ui/ProductVariantSelector';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedVariant, setSelectedVariant] = useState({
        size: null,
        color: null,
        material: null
    });

    const product = SAMPLE_PRODUCTS.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">📦</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
                    <Link 
                        to="/shop" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        <ArrowLeft size={20} />
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleQuantityChange = (newQuantity) => {
        const clampedQuantity = Math.max(1, Math.min(99, newQuantity));
        setQuantity(clampedQuantity);
    };

    // Sample variants for demonstration
    const variants = {
        sizes: [
            { value: 'xs', label: 'XS', available: true },
            { value: 's', label: 'S', available: true },
            { value: 'm', label: 'M', available: true },
            { value: 'l', label: 'L', available: true },
            { value: 'xl', label: 'XL', available: false },
            { value: 'xxl', label: 'XXL', available: false },
        ],
        colors: [
            { value: 'black', label: 'Black', hex: '#000000', available: true },
            { value: 'white', label: 'White', hex: '#FFFFFF', available: true },
            { value: 'navy', label: 'Navy', hex: '#1E3A8A', available: true },
            { value: 'burgundy', label: 'Burgundy', hex: '#7F1D1D', available: true },
            { value: 'forest', label: 'Forest Green', hex: '#14532D', available: false },
        ],
        materials: [
            { value: 'cotton', label: 'Premium Cotton', available: true, price: 0 },
            { value: 'silk', label: 'Luxury Silk', available: true, price: 25 },
            { value: 'wool', label: 'Merino Wool', available: false, price: 15 },
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Breadcrumb Navigation */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Link 
                    to="/shop" 
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                >
                    <ArrowLeft size={18} />
                    Back to Collection
                </Link>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Gallery Section - Left Side */}
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            
                            {/* Action buttons overlay */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200">
                                    <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
                                </button>
                                <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200">
                                    <Share2 size={18} className="text-gray-600 hover:text-blue-500 transition-colors" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Thumbnail gallery */}
                        <div className="grid grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200">
                                    <img 
                                        src={product.image} 
                                        alt={`${product.name} view ${i}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Section - Right Side */}
                    <div className="space-y-6">
                        {/* Product Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={16} 
                                            className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                        />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-2">4.9 (128 reviews)</span>
                                </div>
                            </div>
                            
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                {product.name}
                            </h1>
                            
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                                <span className="text-lg text-gray-500 line-through">${(product.price * 1.5).toFixed(2)}</span>
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">Save 33%</span>
                            </div>
                        </div>

                        {/* Product Variant Selector */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <ProductVariantSelector
                                variants={variants}
                                selectedVariants={selectedVariant}
                                onChange={setSelectedVariant}
                                quantity={quantity}
                                onQuantityChange={handleQuantityChange}
                                maxQuantity={99}
                                variant="modern"
                            />
                        </div>

                        {/* Add to Cart Section */}
                        <div className="space-y-4">
                            <button 
                                onClick={handleAddToCart}
                                className="w-full bg-[#0f172a] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                            >
                                <ShoppingBag size={24} />
                                Add to Cart — ${(product.price * quantity).toFixed(2)}
                            </button>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <button className="py-3 px-4 border-2 border-gray-300 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2">
                                    <Heart size={18} />
                                    Wishlist
                                </button>
                                <button className="py-3 px-4 border-2 border-gray-300 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2">
                                    <Share2 size={18} />
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Product Tabs */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="flex border-b border-gray-200">
                                {[
                                    { id: 'description', label: 'Description' },
                                    { id: 'details', label: 'Details' },
                                    { id: 'shipping', label: 'Shipping' },
                                    { id: 'reviews', label: 'Reviews' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            flex-1 py-4 px-6 text-sm font-medium transition-all duration-200
                                            ${activeTab === tab.id 
                                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {activeTab === 'description' && (
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-gray-700 leading-relaxed">
                                            {product.description || "Experience the perfect blend of style and comfort with our premium collection. Each piece is thoughtfully designed to elevate your everyday wardrobe with meticulous attention to detail and quality craftsmanship."}
                                        </p>
                                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                                <Check className="text-blue-600" size={20} />
                                                <span className="text-sm font-medium text-blue-900">Premium Quality Materials</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                                <Check className="text-green-600" size={20} />
                                                <span className="text-sm font-medium text-green-900">Ethically Sourced</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                                <Check className="text-purple-600" size={20} />
                                                <span className="text-sm font-medium text-purple-900">Modern Fit & Design</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                                                <Check className="text-orange-600" size={20} />
                                                <span className="text-sm font-medium text-orange-900">30-Day Returns</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'details' && (
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Material</span>
                                                    <span className="font-medium text-gray-900">Premium Cotton Blend</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Care</span>
                                                    <span className="font-medium text-gray-900">Machine Washable</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Origin</span>
                                                    <span className="font-medium text-gray-900">Made in Portugal</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Fit Type</span>
                                                    <span className="font-medium text-gray-900">Regular Fit</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Season</span>
                                                    <span className="font-medium text-gray-900">All Season</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Weight</span>
                                                    <span className="font-medium text-gray-900">Lightweight</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'shipping' && (
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900 mb-3">Shipping & Returns</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                                                <Truck className="text-green-600 mt-1" size={24} />
                                                <div>
                                                    <h4 className="font-medium text-green-900">Free Express Shipping</h4>
                                                    <p className="text-sm text-green-700 mt-1">On all orders over $200. Delivery within 2-3 business days.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                                                <ShieldCheck className="text-blue-600 mt-1" size={24} />
                                                <div>
                                                    <h4 className="font-medium text-blue-900">30-Day Returns</h4>
                                                    <p className="text-sm text-blue-700 mt-1">Not satisfied? Return within 30 days for a full refund.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                                                <ShieldCheck className="text-purple-600 mt-1" size={24} />
                                                <div>
                                                    <h4 className="font-medium text-purple-900">Quality Guarantee</h4>
                                                    <p className="text-sm text-purple-700 mt-1">Lifetime warranty against manufacturing defects.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900 mb-3">Customer Reviews</h3>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-gray-900">4.9</div>
                                                <div className="flex gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star 
                                                            key={i} 
                                                            size={16} 
                                                            className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="space-y-2">
                                                    {[5, 4, 3, 2, 1].map((rating) => (
                                                        <div key={rating} className="flex items-center gap-2">
                                                            <span className="text-sm text-gray-600 w-3">{rating}</span>
                                                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                                <div 
                                                                    className="bg-yellow-400 h-2 rounded-full" 
                                                                    style={{ width: rating === 5 ? '70%' : rating === 4 ? '20%' : '5%' }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-sm text-gray-600 w-8">
                                                                {rating === 5 ? '90' : rating === 4 ? '25' : '8'}%
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t pt-4">
                                            <p className="text-sm text-gray-600">128 reviews • Verified purchases</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <Truck className="text-blue-600" size={24} />
                                <div>
                                    <h4 className="font-medium text-gray-900">Free Shipping</h4>
                                    <p className="text-sm text-gray-600">On orders over $200</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <ShieldCheck className="text-green-600" size={24} />
                                <div>
                                    <h4 className="font-medium text-gray-900">Quality Guarantee</h4>
                                    <p className="text-sm text-gray-600">Lifetime warranty</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
