import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type {Review} from "../../../../interfaces/ReviewsResponse.ts";
import {StarRating} from "../Stats/StarRating.tsx";


interface ReviewCardProps {
    review: Review;
    isSelected: boolean;
    onToggleSelection: (reviewId: number) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
                                                          review,
                                                          isSelected,
                                                          onToggleSelection,
                                                      }) => (
    <div className="p-6">
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <div className="flex items-center mb-2">
                    <h4 className="font-medium text-gray-900 mr-3">{review.guestName}</h4>
                    <StarRating rating={review.rating * 2} />
                    <span className="ml-2 text-sm text-gray-600">{review.rating}/10</span>
                    <span className="ml-4 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
            {review.channel}
          </span>
                </div>
                <p className="text-gray-600 mb-2">{review.listingName}</p>
                <p className="text-gray-800 mb-3">{review.publicReview}</p>
                <p className="text-xs text-gray-500">
                    {new Date(review.submittedAt).toLocaleDateString()}
                </p>
            </div>
            <button
                onClick={() => onToggleSelection(review.id)}
                className={`ml-4 p-2 rounded-full ${
                    isSelected
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                }`}
            >
                {isSelected ? (
                    <Eye className="h-5 w-5" />
                ) : (
                    <EyeOff className="h-5 w-5" />
                )}
            </button>
        </div>
    </div>
);
