import React, { useState, useEffect } from 'react';
import { Card } from "@mui/material";
import { FaStar, FaUser, FaCalendarDay } from 'react-icons/fa';
import { MdRateReview } from "react-icons/md";
import { getReviews } from '../../../Reviews/services/reviews.service';
import type {Review} from "../../../Reviews/interfaces/ReviewsResponse.ts";




interface ListingReviewsProps {
    listingId: number;
}

const ListingReviews: React.FC<ListingReviewsProps> = ({ listingId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [totalReviews, setTotalReviews] = useState<number>(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await getReviews({
                    id: listingId.toString(),
                });

                setReviews(response.reviews);
                setError(null);
            } catch (err) {
                setError('Failed to load reviews');
                console.error('Error fetching reviews:', err);
            } finally {
                setLoading(false);
            }
        };

        if (listingId) {
            fetchReviews();
        }
    }, [listingId]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                className={`text-lg ${
                    index < Math.floor(rating)
                        ? 'text-yellow-400'
                        : index < rating
                            ? 'text-yellow-200'
                            : 'text-gray-300'
                }`}
            />
        ));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex flex-row gap-4 min-w-full">
                <div className="flex flex-col items-center justify-center min-w-3/4 gap-4">
                    <Card className="w-full rounded-2xl shadow-xl p-6 border border-gray-200">
                        <div className="p-4">
                            <div className="animate-pulse">
                                <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-row gap-4 min-w-full">
                <div className="flex flex-col items-center justify-center min-w-3/4 gap-4">
                    <Card className="w-full rounded-2xl shadow-xl p-6 border border-gray-200">
                        <div className="p-4">
                            <div className="text-red-500 text-center">
                                <MdRateReview className="text-4xl mx-auto mb-2" />
                                <p>{error}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="flex flex-row gap-4 min-w-full">
                <div className="flex flex-col items-center justify-center min-w-3/4 gap-4">
                    <Card className="w-full rounded-2xl shadow-xl p-6 border border-gray-200">
                        <div className="p-4">
                            <div className="text-gray-500 text-center">
                                <MdRateReview className="text-4xl mx-auto mb-2" />
                                <p>No reviews available yet.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-row gap-4 min-w-full">
            <div className="flex flex-col items-center justify-center min-w-3/4 gap-4">
                {/* Individual Reviews */}
                <Card className="w-full rounded-2xl shadow-xl p-6 border border-gray-200">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">What guests are saying</h2>
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <Card key={review.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <div className="p-4">
                                        {/* Review Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <FaUser className="text-gray-500 text-lg" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        {review.guestName}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <FaCalendarDay className="text-gray-400 text-sm" />
                                                        <span className="text-gray-500 text-sm">
                                                            {formatDate(review.submittedAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                {renderStars(review.rating)}
                                            </div>
                                        </div>

                                        {/* Review Comment */}
                                        <div className="text-gray-700 leading-relaxed">
                                            "{review.publicReview}"
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ListingReviews;
