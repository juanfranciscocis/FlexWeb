import React from 'react';
import { StarRating } from '../Stats/StarRating.tsx';
import type {Review} from "../../../../interfaces/ReviewsResponse.ts";
import {usePropertyStats} from "../../hooks/usePropertyStats.ts";

interface PropertyViewProps {
    selectedProperty: string;
    reviews: Review[];
    selectedReviews: Set<number>;
    onBackToDashboard: () => void;
}

export const PropertyView: React.FC<PropertyViewProps> = ({
                                                              selectedProperty,
                                                              reviews,
                                                              selectedReviews,
                                                              onBackToDashboard,
                                                          }) => {
    console.log(selectedProperty)

    const { getPropertyStats } = usePropertyStats();

    const stats = getPropertyStats(selectedProperty);

    const propertyReviews = reviews.filter(
        (review) =>
            review.listingName === selectedProperty
    );
    console.log(propertyReviews)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Property Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <button
                        onClick={onBackToDashboard}
                        className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedProperty}</h1>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                            <StarRating rating={Number(stats.avgRating) * 2} />
                            <span className="ml-2 text-lg font-medium">{stats.avgRating}/10</span>
                        </div>
                        <span className="text-gray-600">{stats.total} reviews</span>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
                        <p className="text-gray-600 mt-1">What our guests are saying</p>
                    </div>
                    <div className="p-6">
                        <div className="grid gap-6">
                            {propertyReviews.map((review) => (
                                <div key={review.id} className="border-l-4 border-blue-500 pl-6 py-4">
                                    <div className="flex items-center mb-3">
                                        <div className="flex items-center">
                                            <StarRating rating={review.rating * 2} />
                                            <span className="ml-2 font-medium text-gray-900">{review.rating}/10</span>
                                        </div>
                                        <span className="ml-4 text-gray-600">•</span>
                                        <span className="ml-4 text-gray-600">{review.guestName}</span>
                                        <span className="ml-4 text-gray-600">•</span>
                                        <span className="ml-4 text-sm text-gray-500">
                      {new Date(review.submittedAt).toLocaleDateString()}
                    </span>
                                    </div>
                                    <p className="text-gray-800 leading-relaxed">{review.publicReview}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
