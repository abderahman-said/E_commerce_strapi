import React, { useState, useCallback } from 'react';
import {
    Minus, Plus, ShoppingBag, Trash2, ArrowRight,
    Sparkles, Truck, Shield, CreditCard, Package,
    Star, Zap, Check, Eye, ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatPrice = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const ITEM_DETAILS = [
    { icon: Sparkles, label: 'Premium Quality' },
    { icon: Shield,   label: '2-Year Warranty' },
    { icon: Truck,    label: 'Free Shipping'   },
    { icon: Package,  label: 'Eco-Friendly'    },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const QuantityControl = ({ quantity, onDecrease, onIncrease, disabled }) => (
    <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
        <button
            onClick={onDecrease}
            disabled={disabled || quantity <= 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
            <Minus size={14} />
        </button>
        <span className="w-10 text-center font-bold text-primary text-base select-none">
            {quantity}
        </span>
        <button
            onClick={onIncrease}
            disabled={disabled}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
            <Plus size={14} />
        </button>
    </div>
);

const StarRating = ({ rating = 4.5 }) => (
    <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={11}
                className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
            />
        ))}
        <span className="text-xs text-gray-500 ml-0.5">({rating})</span>
    </div>
);

const ItemDetails = () => (
    <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2 animate-[fadeIn_0.2s_ease]">
        <div className="grid grid-cols-2 gap-2">
            {ITEM_DETAILS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-gray-600">
                    <Icon size={13} className="text-primary shrink-0" />
                    <span>{label}</span>
                </div>
            ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium pt-1 border-t border-gray-200">
            <Zap size={12} />
            In Stock · Ships Today
        </div>
    </div>
);

// ─── CartItem ────────────────────────────────────────────────────────────────

const CartItem = ({ item, index, onRemove, onQuantityChange }) => {
    const [expanded, setExpanded] = useState(false);
    const [updated,  setUpdated]  = useState(false);
    const [removing, setRemoving] = useState(false);

    const handleRemove = useCallback(async () => {
        setRemoving(true);
        await new Promise(r => setTimeout(r, 250));
        onRemove(item.id);
    }, [item.id, onRemove]);

    const handleQuantity = useCallback((delta) => {
        const next = item.quantity + delta;
        if (next < 1) return;
        onQuantityChange(item.id, next);
        setUpdated(true);
        setTimeout(() => setUpdated(false), 900);
    }, [item.id, item.quantity, onQuantityChange]);

    const savings = item.quantity > 1 ? item.price * item.quantity * 0.1 : 0;

    return (
        <div
            className={`
                relative bg-white rounded-2xl border p-4 transition-all duration-300
                hover:shadow-md hover:-translate-y-0.5
                ${removing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}
                ${updated  ? 'ring-2 ring-emerald-400 ring-offset-1 border-transparent' : 'border-gray-200'}
            `}
            style={{ animationDelay: `${index * 80}ms` }}
        >
            {/* Updated badge */}
            {updated && (
                <span className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    <Check size={11} /> Updated
                </span>
            )}

            <div className="flex gap-4">
                {/* Image */}
                <div className="relative group shrink-0">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-22 h-22 w-[88px] h-[88px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Quantity badge */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
                        {item.quantity}
                    </span>
                    {/* Quick-view overlay */}
                    <div className="absolute inset-0 bg-primary/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            onClick={() => {/* quick view */}}
                            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                            aria-label="Quick view"
                        >
                            <Eye size={15} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-primary text-base leading-tight truncate">
                            {item.name}
                        </h4>
                        <button
                            onClick={handleRemove}
                            disabled={removing}
                            className="shrink-0 p-1.5 rounded-lg text-red-400 hover:text-white hover:bg-red-500 transition-colors disabled:opacity-50"
                            aria-label="Remove item"
                        >
                            {removing
                                ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                : <Trash2 size={15} />
                            }
                        </button>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {item.category && (
                            <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                                {item.category}
                            </span>
                        )}
                        <StarRating />
                    </div>

                    {/* Controls + Price row */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <QuantityControl
                            quantity={item.quantity}
                            onDecrease={() => handleQuantity(-1)}
                            onIncrease={() => handleQuantity(+1)}
                            disabled={removing}
                        />
                        <div className="text-right">
                            <p className="text-xl font-bold text-primary leading-none">
                                {formatPrice(item.price * item.quantity)}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {formatPrice(item.price)} each
                            </p>
                            {savings > 0 && (
                                <p className="text-xs text-emerald-600 font-medium">
                                    Save {formatPrice(savings)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Expand toggle */}
                    <button
                        onClick={() => setExpanded(v => !v)}
                        className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary/70 hover:text-primary transition-colors"
                    >
                        {expanded ? 'Hide' : 'Show'} Details
                        <ChevronDown
                            size={13}
                            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {expanded && <ItemDetails />}
                </div>
            </div>
        </div>
    );
};

// ─── OrderSummary ─────────────────────────────────────────────────────────────

const FREE_SHIPPING_THRESHOLD = 100;

const OrderSummary = ({ cartTotal, onClearCart }) => {
    const toFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal;
    const hasFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-bold text-primary mb-5">Order Summary</h2>

            <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Subtotal</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(cartTotal)}</span>
                </div>

                {/* Shipping bar */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <Truck size={12} />
                            {hasFreeShipping ? 'Free shipping applied' : `${formatPrice(toFreeShipping)} away from free shipping`}
                        </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                        />
                    </div>
                </div>

                {hasFreeShipping && (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-3 py-2 rounded-xl">
                        <Truck size={14} />
                        You've qualified for free shipping!
                    </div>
                )}

                {/* Divider */}
                <hr className="border-gray-100" />

                {/* CTA */}
                <div className="space-y-2.5">
                    <Link
                        to="/checkout"
                        className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                        <CreditCard size={17} />
                        Proceed to Checkout
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <div className="flex gap-2">
                        <Link
                            to="/shop"
                            className="flex-1 px-4 py-2.5 text-center text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:border-primary hover:bg-gray-50 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                        <button
                            onClick={onClearCart}
                            className="px-4 py-2.5 text-sm font-medium text-gray-500 border border-gray-200 rounded-xl hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── EmptyCart ────────────────────────────────────────────────────────────────

const EmptyCart = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-16 text-center">
        <div className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">Your cart is empty</h3>
        <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
            You haven't added anything yet. Start shopping to fill it up!
        </p>
        <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
            <ShoppingBag size={16} />
            Start Shopping
        </Link>
    </div>
);

// ─── Cart (page) ──────────────────────────────────────────────────────────────

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const handleClearCart = useCallback(() => {
        cart.forEach(item => removeFromCart(item.id));
    }, [cart, removeFromCart]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm">
                        <ShoppingBag size={20} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-primary leading-none">Shopping Cart</h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {cart.length} {cart.length === 1 ? 'item' : 'items'}
                            {cart.length > 0 && ` · ${formatPrice(cartTotal)}`}
                        </p>
                    </div>
                </div>

                {cart.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Items list */}
                        <div className="lg:col-span-2 space-y-3">
                            {cart.map((item, index) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onRemove={removeFromCart}
                                    onQuantityChange={updateQuantity}
                                />
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <OrderSummary
                                cartTotal={cartTotal}
                                onClearCart={handleClearCart}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;