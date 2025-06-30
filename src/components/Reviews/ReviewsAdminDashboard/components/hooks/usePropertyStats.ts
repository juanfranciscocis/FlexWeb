import { useMemo } from 'react';
import type { Review } from '../../../interfaces/ReviewsResponse.ts';

export const usePropertyStats = (reviews: Review[]) => {
    return useMemo(() => {
        const getPropertyStats = (propertyName: string | null) => {
            const propertyReviews = reviews.filter((r) => r.listingName === propertyName);
            const avgRating =
                propertyReviews.length > 0
                    ? propertyReviews.reduce((sum, r) => sum + r.rating, 0) / propertyReviews.length
                    : 0;
            const totalReviews = propertyReviews.length;
            const recentReviews = propertyReviews.filter(
                (r) => new Date(r.submittedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            ).length;

            return { avgRating: avgRating.toFixed(1), totalReviews, recentReviews };
        };

        return { getPropertyStats };
    }, [reviews]);
};
