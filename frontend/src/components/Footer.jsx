import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-16 mt-auto">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="font-heading font-bold text-2xl uppercase tracking-tighter mb-4">
                            VELVET<span className="font-normal text-accent">VIBE</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Elevating everyday essentials through premium design and sustainable craftsmanship.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Shop</h4>
                        <ul className="space-y-3">
                            <li><Link to="/shop" className="text-sm text-gray-400 hover:text-accent transition-colors">New Arrivals</Link></li>
                            <li><Link to="/shop" className="text-sm text-gray-400 hover:text-accent transition-colors">Men</Link></li>
                            <li><Link to="/shop" className="text-sm text-gray-400 hover:text-accent transition-colors">Women</Link></li>
                            <li><Link to="/shop" className="text-sm text-gray-400 hover:text-accent transition-colors">Sale</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-3">
                            <li><a href="#faq" className="text-sm text-gray-400 hover:text-accent transition-colors">FAQs</a></li>
                            <li><a href="#shipping" className="text-sm text-gray-400 hover:text-accent transition-colors">Shipping</a></li>
                            <li><a href="#returns" className="text-sm text-gray-400 hover:text-accent transition-colors">Returns</a></li>
                            <li><a href="#contact" className="text-sm text-gray-400 hover:text-accent transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-3">
                            <li><a href="#about" className="text-sm text-gray-400 hover:text-accent transition-colors">About Us</a></li>
                            <li><a href="#sustainability" className="text-sm text-gray-400 hover:text-accent transition-colors">Sustainability</a></li>
                            <li><a href="#careers" className="text-sm text-gray-400 hover:text-accent transition-colors">Careers</a></li>
                            <li><a href="#press" className="text-sm text-gray-400 hover:text-accent transition-colors">Press</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">&copy; 2026 Velvet Vibe. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-sm">
                        <a href="#privacy" className="text-gray-400 hover:text-accent transition-colors">Privacy Policy</a>
                        <span className="text-gray-700">|</span>
                        <a href="#terms" className="text-gray-400 hover:text-accent transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
