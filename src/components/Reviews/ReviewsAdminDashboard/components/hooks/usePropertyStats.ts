import {useEffect, useState} from 'react';
import {getReviewsSumary} from '../../../services/reviews.service';
import type {SummaryResponse} from '../../../interfaces/SummaryResponse';
import type { Review } from '../../../interfaces/ReviewsResponse';


export const usePropertyStats = () => {
    const [stats, setStats] = useState<SummaryResponse>({} as SummaryResponse);
    useEffect(() => {
        getReviewsSumary()
            .then((data) => {
                setStats(data);
            })
            .catch(() => setStats({} as SummaryResponse));
    }, []);

    const getPropertyStats = (propertyName: string | null) => {
        if (
            !propertyName ||
            typeof stats !== 'object' ||
            !stats.summary ||
            !Array.isArray(stats.summary)
        ) {
            return {avgRating: '0.0', total: 0, thisMonth: 0, unpublished: 0, published: 0};
        }
        return stats.summary.find((summary) => summary.listingName === propertyName) || {
            avgRating: '0.0',
            total: 0,
            thisMonth: 0,
            unpublished: 0,
            published: 0
        };
    };

    return {
        getPropertyStats
    };
};
