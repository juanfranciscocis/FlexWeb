export interface ReviewCategory {
    category: string;
    rating: number;
}

export interface Review {
    id: number;
    type: 'guest-to-host' | string;
    status: 'published' | string;
    rating: number;
    publicReview: string;
    reviewCategory: ReviewCategory[];
    submittedAt: string; // can also be Date if you parse it
    guestName: string;
    listingName: string;
    channel: 'Airbnb' | 'Booking.com' | string;
}

export interface ReviewsResponse {
    status: 'success' | string;
    reviews: Review[];
}
