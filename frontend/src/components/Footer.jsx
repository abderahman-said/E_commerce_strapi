import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-12 pb-8 sm:pt-16 mt-auto">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
                    <div>
                         <a href="/" className="inline-block">
                            <img src="/logo.png" alt="VELVETVIBE" className="h-16 rounded-xl mb-3 hover:opacity-80 transition-opacity" />
                         </a>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
                            Elevating everyday essentials through premium design and sustainable craftsmanship.
                        </p>
                        
                        {/* Social Media Icons */}
                        <div className="flex items-center gap-3">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Follow us on Facebook"
                            >
                                <Facebook size={16} className="text-white" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Follow us on Instagram"
                            >
                                <Instagram size={16} className="text-white" />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Follow us on Twitter"
                            >
                                <Twitter size={16} className="text-white" />
                            </a>
                            <a 
                                href="https://youtube.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Subscribe on YouTube"
                            >
                                <Youtube size={16} className="text-white" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">Shop</h4>
                        <ul className="space-y-3">
                            <li><Link to="/shop" className="text-xs sm:text-sm text-gray-400 hover:text-accent transition-colors">New Arrivals</Link></li>
                            <li><Link to="/shop" className="text-xs sm:text-sm text-gray-400 hover:text-accent transition-colors">Men</Link></li>
                            <li><Link to="/shop" className="text-xs sm:text-sm text-gray-400 hover:text-accent transition-colors">Women</Link></li>
                            <li><Link to="/shop" className="text-xs sm:text-sm text-gray-400 hover:text-accent transition-colors">Sale</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">Contact Info</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <MapPin size={16} className="text-gray-400" />
                                <span className="text-xs sm:text-sm text-gray-400">123 Fashion Street, NY 10001</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-gray-400" />
                                <a href="tel:+1234567890" className="text-xs sm:text-sm text-gray-400 hover:text-accent transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-gray-400" />
                                <a href="mailto:support@velvetvibe.com" className="text-xs sm:text-sm text-gray-400 hover:text-accent transition-colors">
                                    support@velvetvibe.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">Company</h4>
                        <ul className="space-y-3">
                            <li><a href="#about" className="text-xs sm:text-sm text-gray-400 hover:text-accent transition-colors">About Us</a></li>
                            <li><a href="#sustainability" className="text-xs sm:text-sm text-gray-400 hover:text-accent transition-colors">Sustainability</a></li>
                            <li><a href="#careers" className="text-xs sm:text-sm text-gray-400 hover:text-accent transition-colors">Careers</a></li>
                            <li><a href="#press" className="text-xs sm:text-sm text-gray-400 hover:text-accent transition-colors">Press</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 sm:pt-8 border-t border-gray-800">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <p className="text-xs sm:text-sm text-gray-400">&copy; 2026 Velvet Vibe. All rights reserved.</p>
                        
                         
                        
                        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                            <a href="#privacy" className="text-gray-400 hover:text-accent transition-colors">Privacy Policy</a>
                            <span className="text-gray-700">|</span>
                            <a href="#terms" className="text-gray-400 hover:text-accent transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
