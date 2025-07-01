export interface SummaryResponse {
    status: string;
    summary: ListingSummary[];
}

export interface ListingSummary {
    listingName: string;
    total: number;
    thisMonth: number;
    unpublished: number;
    published: number;
    avgRating: number;
}
