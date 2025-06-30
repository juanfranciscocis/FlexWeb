import React from 'react';
import { StarRating } from './StarRating.tsx';

interface PropertyCardProps {
    property: string;
    avgRating: string;
    totalReviews: number;
    recentReviews: number;
    onClick: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
                                                              property,
                                                              avgRating,
                                                              totalReviews,
                                                              recentReviews,
                                                              onClick,
                                                          }) => (
    <div
        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
        onClick={onClick}
    >
        <div className="flex-1">
            <h4 className="font-medium text-gray-900">{property}</h4>
            <div className="flex items-center mt-1">
                <StarRating rating={Number(avgRating)} />
                <span className="ml-2 text-sm text-gray-600">{avgRating}/10</span>
            </div>
        </div>
        <div className="text-right">
            <p className="text-sm text-gray-600">{totalReviews} total reviews</p>
            <p className="text-sm text-green-600">{recentReviews} this month</p>
        </div>
    </div>
);
