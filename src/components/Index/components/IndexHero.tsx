import React, {useEffect, useState} from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaMinus, FaPlus, FaChevronDown } from 'react-icons/fa';
import {getURLs} from "../../services/url.service.ts";

const IndexHero: React.FC = () => {

    const  [url, setURL] = useState<string>('');

    const [selectedCity, setSelectedCity] = useState('City');
    const [guestCount, setGuestCount] = useState(1);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [dates, setDates] = useState('Dates');

    const cities = ['London, UK', 'Paris, France', 'Algiers, Algeria'];

    const handleGuestIncrement = () => {
        setGuestCount(prev => prev + 1);
    };

    const handleGuestDecrement = () => {
        if (guestCount > 1) {
            setGuestCount(prev => prev - 1);
        }
    };

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
    };


    useEffect(() => {

        const chooseRandomURL = async () => {
            const urlsResponse = await getURLs();
            console.log(urlsResponse)
            if (urlsResponse && Array.isArray(urlsResponse.urls) && urlsResponse.urls.length > 0) {
                const randomIndex = Math.floor(Math.random() * urlsResponse.urls.length);
                return urlsResponse.urls[randomIndex];
            }
            return '';
        }

        chooseRandomURL().then((url) => {
            setURL(url.toString());
        })

    }, []);



    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Hero Image with responsive adjustments */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="https://theflex.global/home/Hero_Desktop_Large.webp"
                    className="w-full h-full object-cover object-center"
                    alt="Beautiful hotel interior"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl mx-auto">
                    {/* Hero Title - Responsive typography */}
                    <div className=" mb-8 sm:mb-12 lg:mb-16">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight">
                            Book
                        </h1>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight">
                            Beautiful Stays
                        </h1>
                    </div>

                    {/* Search Form - Mobile-first responsive design */}
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="bg-beige-flex backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
                            {/* Mobile: Stacked layout, Desktop: Horizontal layout */}
                            <div className="flex flex-col sm:flex-col lg:flex-row gap-3 sm:gap-4">

                                {/* City Selector */}
                                <div className="flex-1 relative">
                                    <div
                                        className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl cursor-pointer hover:border-gray-300 transition-colors bg-white touch-manipulation"
                                        onClick={() => setShowCityDropdown(!showCityDropdown)}
                                    >
                                        <FaMapMarkerAlt className="text-gray-500 text-base sm:text-lg flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <span className={`text-base sm:text-lg truncate block ${selectedCity === 'City' ? 'text-gray-500' : 'text-gray-900'}`}>
                                                {selectedCity}
                                            </span>
                                        </div>
                                        <FaChevronDown className={`text-gray-400 transition-transform flex-shrink-0 ${showCityDropdown ? 'rotate-180' : ''}`} />
                                    </div>

                                    {/* Dropdown - Responsive positioning */}
                                    {showCityDropdown && (
                                        <>
                                            {/* Mobile backdrop */}
                                            <div
                                                className="fixed inset-0 z-10 bg-black/20 sm:hidden"
                                                onClick={() => setShowCityDropdown(false)}
                                            />
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                                                {cities.map((city) => (
                                                    <div
                                                        key={city}
                                                        className="p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-base sm:text-lg touch-manipulation"
                                                        onClick={() => handleCitySelect(city)}
                                                    >
                                                        {city}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Dates Selector */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl cursor-pointer hover:border-gray-300 transition-colors bg-white touch-manipulation">
                                        <FaCalendarAlt className="text-gray-500 text-base sm:text-lg flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <span className={`text-base sm:text-lg truncate block ${dates === 'Dates' ? 'text-gray-500' : 'text-gray-900'}`}>
                                                {dates}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Guest Counter - Optimized for mobile */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl bg-white">
                                        <FaUser className="text-gray-500 text-base sm:text-lg flex-shrink-0" />
                                        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center sm:justify-start">
                                            <button
                                                onClick={handleGuestDecrement}
                                                disabled={guestCount <= 1}
                                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex-shrink-0"
                                            >
                                                <FaMinus className="text-gray-600 text-xs" />
                                            </button>
                                            <span className="text-base sm:text-lg font-medium text-gray-900 min-w-[70px] sm:min-w-[80px] text-center px-1">
                                                {guestCount} Guest{guestCount !== 1 ? 's' : ''}
                                            </span>
                                            <button
                                                onClick={handleGuestIncrement}
                                                className="w-4 h-4 sm:w-9 sm:h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors touch-manipulation flex-shrink-0"
                                            >
                                                <FaPlus className="text-gray-600 text-xs" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button - Full width on mobile */}
                                <div className="w-full lg:flex-shrink-0 lg:w-auto">
                                    <a
                                        href={`Descriptions/${url}`}
                                    >
                                    <button
                                        className="w-full lg:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-semibold text-base sm:text-lg rounded-lg sm:rounded-xl transition-colors shadow-lg hover:shadow-xl touch-manipulation"
                                    >
                                        Search
                                    </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexHero;
