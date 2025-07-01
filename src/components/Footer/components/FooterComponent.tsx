import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const FooterComponent: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Handle subscription logic here
    };

    return (
        <footer className="bg-green-flex text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-semibold mb-4 text-white">Join The Flex</h3>
                        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                            Sign up now and stay up to date on our latest news and exclusive deals including 5% off your first stay!
                        </p>

                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 bg-slate-100 border border-slate-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 bg-slate-100 border border-slate-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                                />
                            </div>

                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-slate-100 border border-slate-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                            />

                            <div className="flex">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-slate-100 border border-slate-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-white text-slate-800 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                            >
                                ✈️ Subscribe
                            </button>
                        </div>
                    </div>

                    {/* The Flex */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-semibold mb-4 text-white">The Flex</h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Professional property management services for landlords, flexible corporate lets for businesses and quality accommodations for short-term and long-term guests.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Blog</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Careers</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms & Conditions</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Locations */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-semibold mb-4 text-white">Locations</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">London</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Paris</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Algiers</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>

                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                                📞 Support Numbers
                            </h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-400">🇬🇧 United Kingdom</span>
                                </div>
                                <div className="text-gray-300 text-sm">+44 77 2374 5618</div>

                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-400">🇩🇿 Algeria</span>
                                </div>
                                <div className="text-gray-300 text-sm">+33 7 57 59 22 41</div>

                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-400">🇫🇷 France</span>
                                </div>
                                <div className="text-gray-300 text-sm">+33 6 44 64 57 17</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-gray-300 text-sm">📧 info@theflex.global</div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-700 mt-12 pt-8 text-center">
                    <p className="text-white text-sm">© 2025 The Flex. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
