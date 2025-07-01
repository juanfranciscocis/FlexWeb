
import { useState, useEffect, useMemo } from 'react';
import {getListingByID} from "../../service/listings.service.ts";

export interface ListingInfo {
    guestNumber: number;
    bedrooms: number;
    bathrooms: number;
    beds: number;
}

export interface OperativeInfo{
    about: string;
    amenities: string[];
    policies: {
        checkIn: string;
        checkOut: string;
        houseRules: string[];
        cancellationPolicy: {
            title:string;
            description: string;
        }[];
    };
}


export const useDescriptions = () => {
    const [id, setID] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);
    const [listing, setListing] = useState<string>('');
    const [listingInfo, setListingInfo] = useState<ListingInfo>({} as ListingInfo);
    const [operativeInfo, setOperativeInfo] = useState<OperativeInfo>({} as OperativeInfo);

useEffect(() => {
        const fetchListings = async () => {
            if (id !== 0) {
                const listing = await getListingByID(id);
                const listingInfo:ListingInfo = {
                    guestNumber: listing.listings.guestNumber,
                    bedrooms: listing.listings.bedrooms,
                    bathrooms: listing.listings.bathrooms,
                    beds: listing.listings.beds,
                }
                const operativeInfo:OperativeInfo = {
                    about: listing.listings.about,
                    amenities: listing.listings.amenities || [],
                    policies: {
                        checkIn: listing.listings.policies.checkIn,
                        checkOut: listing.listings.policies.checkOut,
                        houseRules: listing.listings.policies.houseRules || [],
                        cancellationPolicy: listing.listings.policies.cancellationPolicy || []
                    }
                }
                setImages(listing.listings.images || []);
                setListing(listing.listings.listingName || '');
                setListingInfo(listingInfo);
                setOperativeInfo(operativeInfo);
            }
        };
        fetchListings();
    }, [id]);

    return {
        images,
        listingInfo,
        listing,
        id,
        operativeInfo,
        setID
    }
}



