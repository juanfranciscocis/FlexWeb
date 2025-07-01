export interface ListingResponse {
    status: string;
    listings: Listing;
}

export interface Listing {
    id: number;
    type: string;
    images: string[];
    guestNumber: number;
    bedrooms: number;
    bathrooms: number;
    beds: number;
    about: string;
    listingName: string;
    price: number;
}
