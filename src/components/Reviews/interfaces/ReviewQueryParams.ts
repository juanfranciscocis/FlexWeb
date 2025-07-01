export interface ReviewQueryParams {
    guestName?: string;
    channel?: string;
    listingName?: string;
    rating?: number;
    category?: string;
    time?: string; // e.g., "2025-06"
    sortBy?: 'rating' | 'submittedAt';
    order?: 'asc' | 'desc';
    id?: string;
}
