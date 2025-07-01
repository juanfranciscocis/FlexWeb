import { useState, useEffect, useMemo } from 'react';
import type { Review, ReviewsResponse } from '../../../interfaces/ReviewsResponse.ts';
import { getReviews } from "../../../services/reviews.service.ts";

export type Filters = {
    property: string;    // listingName
    channel: string;
    rating: string;      // can convert to number when sending
    dateRange: string;   // e.g. '30days', '7days', etc.
};

export const useReviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedReviews, setSelectedReviews] = useState<Set<number>>(new Set());
    const [filters, setFilters] = useState<Filters>({
        property: 'all',
        channel: 'all',
        rating: 'all',
        dateRange: 'all',
    });

    useEffect(() => {
        fetchReviews();
    }, [filters]);

    const fetchReviews = async () => {
        try {
            setLoading(true);

            // Build params object for backend query
            const params: Record<string, string | number> = {};

            if (filters.property !== 'all') params.listingName = filters.property;
            if (filters.channel !== 'all') params.channel = filters.channel;
            if (filters.rating !== 'all') params.rating = Number(filters.rating);

            // Handle dateRange filter - example converting "30days" to ISO date prefix for filtering
            if (filters.dateRange !== 'all') {
                const days = parseInt(filters.dateRange.replace('days', ''));
                if (!isNaN(days)) {
                    const date = new Date();
                    date.setDate(date.getDate() - days);
                    // Assuming backend expects "time" param as ISO string prefix "YYYY-MM-DD"
                    params.time = date.toISOString().slice(0, 10);
                }
            }

            params.sortBy = 'rating'; // Default sort by rating


            const response: ReviewsResponse = await getReviews(params);

            if (response.status === 'success') {
                setReviews(response.reviews);

                // Auto-select high-rated reviews for display
                const highRatedReviews = response.reviews
                    .filter((review) => review.rating >= 8)
                    .map((review) => review.id);
                setSelectedReviews(new Set(highRatedReviews));
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    // Since backend filters, filteredReviews = reviews directly
    const filteredReviews = reviews;

    // Properties & channels for filter options, still derived client-side
    const properties = useMemo(() =>
            [...new Set(reviews.map((review) => review.listingName))],
        [reviews]
    );

    const channels = useMemo(() =>
            [...new Set(reviews.map((review) => review.channel))],
        [reviews]
    );

    const toggleReviewSelection = (reviewId: number) => {
        const newSelected = new Set(selectedReviews);
        console.log('selected', reviewId)
        if (newSelected.has(reviewId)) {
            newSelected.delete(reviewId);
        } else {
            newSelected.add(reviewId);
        }
        setSelectedReviews(newSelected);
    };

    return {
        reviews,
        loading,
        selectedReviews,
        filters,
        filteredReviews,
        properties,
        channels,
        setFilters,
        toggleReviewSelection,
        refetch: fetchReviews,
    };
};
