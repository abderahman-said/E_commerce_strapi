import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Sparkles, Truck, Shield, CreditCard, Package, Star, Heart, Zap, Check, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);
    const [expandedItems, setExpandedItems] = useState(new Set());
    const [removingItems, setRemovingItems] = useState(new Set());
    const [addedToCart, setAddedToCart] = useState(new Set());
    const drawerRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isCartOpen) {
                setIsCartOpen(false);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isCartOpen, setIsCartOpen]);

    useEffect(() => {
        if (isCartOpen) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    const handleOpenChange = (isOpen) => {
        setIsCartOpen(isOpen);
    };

    const handleRemoveItem = async (itemId, e) => {
        e.stopPropagation();
        setRemovingItems(prev => new Set(prev).add(itemId));
        
        const itemElement = document.getElementById(`cart-item-${itemId}`);
        if (itemElement) {
            itemElement.classList.add('animate-slideOutLeft');
            await new Promise(resolve => setTimeout(resolve, 300));
            removeFromCart(itemId);
            setRemovingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }
    };

    const handleQuantityChange = (itemId, newQuantity, e) => {
        e.stopPropagation();
        if (newQuantity > 0) {
            updateQuantity(itemId, newQuantity);
            
            // Add success animation
            setAddedToCart(prev => new Set(prev).add(itemId));
            setTimeout(() => {
                setAddedToCart(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(itemId);
                    return newSet;
                });
            }, 1000);
        }
    };

    const toggleItemExpansion = (itemId) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const CartItem = ({ item, index }) => {
        const isExpanded = expandedItems.has(item.id);
        const isRemoving = removingItems.has(item.id);
        const isAdded = addedToCart.has(item.id);
        
        return (
            <div 
                id={`cart-item-${item.id}`}
                className={`
                    relative bg-white rounded-2xl border border-gray-200 p-5 mb-4
                    transition-all duration-500 ease-out
                    hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1
                    animate-slideInUp
                    ${isRemoving ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
                    ${isAdded ? 'ring-2 ring-green-500 ring-offset-2' : ''}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
            >
                {/* Success Badge */}
                {isAdded && (
                    <div className="absolute top-2 right-2 z-10">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-bounce">
                            <Check size={12} />
                            Updated!
                        </div>
                    </div>
                )}

                <div className="flex gap-4">
                    {/* Product Image with Hover Effect */}
                    <div className="relative group min-w-24" >
                        <div className="absolute inset-0 bg-gray-900/10 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg animate-pulse">
                            {item.quantity}
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="absolute inset-0 bg-gray-900/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Quick view functionality
                                }}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200"
                            >
                                <Eye size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1 group-hover:text-gray-900 transition-colors duration-200">
                                    {item.name}
                                </h4>
                                <div className="flex items-center gap-2 mb-2">
                                    {item.category && (
                                        <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                                            {item.category}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className={i < 4 ? "fill-gray-900 text-gray-900" : "text-gray-300"} />
                                        ))}
                                        <span className="text-xs text-gray-600">(4.5)</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={(e) => handleRemoveItem(item.id, e)}
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-xl transition-all duration-200 hover:scale-110"
                                title="Remove item"
                                disabled={isRemoving}
                            >
                                {isRemoving ? (
                                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Trash2 size={18} />
                                )}
                            </button>
                        </div>

                        {/* Expandable Details */}
                        <div className="space-y-2">
                            <button
                                onClick={() => toggleItemExpansion(item.id)}
                                className="flex items-center gap-2 text-sm text-gray-900 hover:text-gray-900 font-semibold transition-colors duration-200 group"
                            >
                                <span>{isExpanded ? 'Hide' : 'Show'} Details</span>
                                <ArrowRight 
                                    size={16} 
                                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''} group-hover:translate-x-1`}
                                />
                            </button>
                        </div>

                        {isExpanded && (
                            <div className="animate-slideInUp space-y-3 p-4 bg-gray-50 rounded-xl">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Sparkles className="w-4 h-4 text-gray-900" />
                                        <span className="font-medium">Premium Quality</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Shield className="w-4 h-4 text-gray-900" />
                                        <span className="font-medium">2-Year Warranty</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Truck className="w-4 h-4 text-gray-900" />
                                        <span className="font-medium">Free Shipping</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Package className="w-4 h-4 text-gray-900" />
                                        <span className="font-medium">Eco-Friendly</span>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-gray-300">
                                    <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                                        <Zap className="w-4 h-4" />
                                        In Stock - Ships Today
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-3">
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</span>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                                <button
                                    onClick={(e) => handleQuantityChange(item.id, item.quantity - 1, e)}
                                    className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 flex items-center justify-center border border-gray-300 hover:border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={item.quantity <= 1 || isRemoving}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-12 text-center font-bold text-gray-900 text-lg">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={(e) => handleQuantityChange(item.id, item.quantity + 1, e)}
                                    className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 flex items-center justify-center border border-gray-300 hover:border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isRemoving}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-sm text-gray-500">
                                {formatPrice(item.price)} each
                            </div>
                            {item.quantity > 1 && (
                                <div className="text-xs text-gray-900 font-medium">
                                    Save {formatPrice((item.price * item.quantity) * 0.1)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Enhanced Backdrop */}
            <div 
                className={`
                    fixed inset-0 bg-black/70 backdrop-blur-md z-40
                    transition-all duration-300
                    ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => handleOpenChange(false)}
            />

            {/* Enhanced Cart Drawer */}
            <div 
                ref={drawerRef}
                className={`
                    fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl z-50
                    transform transition-all duration-500 ease-out
                    ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
                    ${isAnimating ? 'scale-95' : 'scale-100'}
                `}
            >
                {/* Enhanced Header */}
                <div className="bg-gray-900 text-white p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                                <span className="text-sm opacity-90 flex items-center gap-2">
                                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                                    {cart.length > 0 && (
                                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                                            {formatPrice(cartTotal)}
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleOpenChange(false)}
                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-110"
                            title="Close cart"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Cart Content */}
                <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-96 p-8">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                                    <ShoppingBag className="w-16 h-16 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                                <p className="text-gray-600 mb-6 max-w-sm">
                                    Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
                                </p>
                                <div className="flex gap-3">
                                    <Link 
                                        to="/shop"
                                        onClick={() => handleOpenChange(false)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        <ShoppingBag size={18} />
                                        Start Shopping
                                    </Link>
                                    <button
                                        onClick={() => handleOpenChange(false)}
                                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-colors duration-200 font-semibold"
                                    >
                                        Maybe Later
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 space-y-4">
                            {cart.map((item, index) => (
                                <CartItem key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Enhanced Footer */}
                <div className="border-t border-gray-300 p-6 bg-gray-50">
                    <div className="space-y-4">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 font-medium">Subtotal</span>
                            <span className="text-3xl font-bold text-gray-900">
                                {formatPrice(cartTotal)}
                            </span>
                        </div>

                        {/* Savings */}
                        {cartTotal > 100 && (
                            <div className="flex items-center gap-2 text-gray-900 bg-gray-100 px-4 py-2 rounded-xl">
                                <Truck className="w-5 h-5" />
                                <span className="font-medium">You've qualified for free shipping!</span>
                            </div>
                        )}

                        {/* Shipping Info */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Truck className="w-4 h-4" />
                            <span>{cartTotal >= 100 ? 'Free shipping applied' : `Add ${formatPrice(100 - cartTotal)} more for free shipping`}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Link 
                                to="/checkout"
                                onClick={() => handleOpenChange(false)}
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 group"
                            >
                                <CreditCard className="w-5 h-5 group-hover:animate-pulse" />
                                Proceed to Checkout
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                            
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleOpenChange(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 font-medium"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 font-medium"
                                    onClick={() => {
                                        // Clear cart functionality
                                        cart.forEach(item => removeFromCart(item.id));
                                    }}
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
