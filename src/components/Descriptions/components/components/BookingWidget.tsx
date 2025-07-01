import React, {useState} from 'react';
import {Calendar, User, ChevronDown, Tag, Zap, MessageCircle} from 'lucide-react';

const BookingWidget = () => {
    const [guests, setGuests] = useState(1);

    const basePrice = 5930.96;
    const nights = 28;
    const lengthDiscount = 1186.19;
    const cleaningFee = 87.56;
    const total = basePrice - lengthDiscount + cleaningFee;

    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
            {/* Header */}
            <div className="bg-green-flex text-white px-6 py-6">
                <h1 className="text-2xl font-semibold mb-2">Book your stay</h1>
                <p className="text-gray-400 opacity-90">Select dates to see the total price</p>
            </div>

            {/* Date and Guest Selection */}
            <div className="flex gap-3 p-4">
                <div
                    className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-500"/>
                    <span className="text-gray-700">Aug 03 - Aug 31</span>
                </div>
                <div
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg min-w-[80px]">
                    <User className="w-4 h-4 text-gray-500"/>
                    <span className="text-gray-700">{guests}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500"/>
                </div>
            </div>

            {/* Details Section */}
            <div className="px-6 py-4">
                {/* Booking Details */}
                <div className="space-y-3 mb-5">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Check-in</span>
                        <span className="font-medium text-gray-900">Aug 03</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Check-out</span>
                        <span className="font-medium text-gray-900">Aug 31</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Guests</span>
                        <span className="font-medium text-gray-900">{guests} guest{guests !== 1 ? 's' : ''}</span>
                    </div>
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-5">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Base price ({nights} nights)</span>
                        <span className="font-medium text-gray-900">€{basePrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between bg-green-100  p-1 rounded-lg">
            <span className="text-green-600 flex items-center gap-2 bg-green-100">
              <Calendar className="w-4 h-4"/>
              20% length of stay discount
            </span>
                        <span className="font-semibold text-green-600">-€{lengthDiscount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Cleaning fee</span>
                        <span className="font-medium text-gray-900">€{cleaningFee.toFixed(2)}</span>
                    </div>
                </div>

                {/* Coupon Section */}
                <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-4 h-4 text-gray-600"/>
                        <span className="text-gray-600">Have a coupon code?</span>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={''}
                            placeholder="Enter code"
                            className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                        />
                        <button
                            className="px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>

            {/* Total Section */}
            <div className="border-t border-gray-200 px-6 py-5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">€{total.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-600">
                    You saved €{lengthDiscount.toFixed(2)}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6">
                <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-4 mb-3 bg-green-flex text-white rounded-lg font-semibold text-lg "
                >
                    <Calendar className="w-5 h-5"/>
                    Book Now
                </button>

                <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-4 mb-3 bg-white text-gray-600 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                    <MessageCircle className="w-5 h-5"/>
                    Send Inquiry
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4"/>
                    Instant confirmation
                </div>
            </div>
        </div>
    );
}

export default BookingWidget;
