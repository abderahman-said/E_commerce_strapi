import React, { useState } from 'react';
import { 
    CreditCard, Truck, ShieldCheck, ChevronRight, 
    Lock, ArrowLeft, ShoppingBag, CheckCircle2 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const formatPrice = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cib_card'); // Default to CIB
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Prepare order data
            const orderData = {
                items: cart,
                total: cartTotal,
                shippingAddress: formData,
                payment_method: paymentMethod,
            };

            // 2. Call Strapi to create order and get payment URL
            const response = await api.createOrder(orderData);
            
            if (response.payment_url) {
                // Redirect to CIB/Gateway Payment Page
                // In a real app, window.location.href = response.data.payment_url;
                // For this demo, we will show a success message or simulate the redirect
                console.log('Redirecting to:', response.data.payment_url);
                
                alert('Redirecting to CIB Secure Payment Gateway...');
                
                // Simulate successful payment for demo purposes after delay
                setTimeout(() => {
                    clearCart();
                    navigate('/');
                    alert('Order Placed Successfully! (Demo)');
                }, 2000);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <Link to="/shop" className="text-primary font-semibold flex items-center gap-1 hover:underline">
                    <ArrowLeft size={16} /> Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Column: Form */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                    <Truck size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">First Name</label>
                                        <input 
                                            required
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Last Name</label>
                                        <input 
                                            required
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                    <input 
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                                    <input 
                                        required
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="+20 123 456 7890"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Full Address</label>
                                    <textarea 
                                        required
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                        placeholder="Street name, Building number, Apartment..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">City</label>
                                        <input 
                                            required
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            placeholder="Cairo"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">ZIP Code</label>
                                        <input 
                                            required
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            placeholder="12345"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Payment Selection */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                    <CreditCard size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                            </div>

                            <div className="space-y-4">
                                <div 
                                    onClick={() => setPaymentMethod('cib_card')}
                                    className={`
                                        relative flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all
                                        ${paymentMethod === 'cib_card' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-100 hover:border-gray-200'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${paymentMethod === 'cib_card' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            <CreditCard size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 flex items-center gap-2">
                                                CIB Credit / Debit Card
                                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">Secure</span>
                                            </p>
                                            <p className="text-xs text-gray-500">Pay via Visa or Mastercard (CIB Gateway)</p>
                                        </div>
                                    </div>
                                    {paymentMethod === 'cib_card' && <CheckCircle2 size={24} className="text-primary" />}
                                </div>

                                <div 
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`
                                        relative flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all
                                        ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-100 hover:border-gray-200'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${paymentMethod === 'cod' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            <Truck size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Cash on Delivery</p>
                                            <p className="text-xs text-gray-500">Pay when your order is delivered</p>
                                        </div>
                                    </div>
                                    {paymentMethod === 'cod' && <CheckCircle2 size={24} className="text-primary" />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-[400px]">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                            
                            <div className="max-h-[300px] overflow-y-auto pr-2 mb-6 space-y-4 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                                            <p className="text-primary font-bold text-sm mt-1">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-gray-100 mb-6" />

                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-gray-500 text-sm font-medium">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 text-sm font-medium">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600">Free</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-primary">{formatPrice(cartTotal)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`
                                    w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-white transition-all shadow-lg shadow-primary/20
                                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover hover:-translate-y-1'}
                                `}
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Lock size={18} />
                                        {paymentMethod === 'cib_card' ? 'Pay with CIB Secure' : 'Place Order'}
                                    </>
                                )}
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">PCI DSS Secure</span>
                            </div>

                            <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex items-start gap-3">
                                <ShieldCheck size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-gray-500 leading-relaxed">
                                    Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
