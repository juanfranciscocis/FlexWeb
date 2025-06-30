import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, className = "" }) => {
    return (
        <div className={`flex ${className}`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${
                        star <= Math.floor(rating / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                />
            ))}
        </div>
    );
};
