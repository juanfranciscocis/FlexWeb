
import { useState, useEffect, useMemo } from 'react';
import {getListingByID} from "../../service/listings.service.ts";
export const useDescriptions = () => {
    const [id, setID] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);

useEffect(() => {
        const fetchListings = async () => {
            if (id !== 0) {
                const listing = await getListingByID(id);
                console.log(listing)
                const images = listing.listings.images || [];
                console.log(images)
                setImages(listing.listings.images || []);
            }
        };
        fetchListings();
    }, [id]);

    return {
        images,
        id,
        setID
    }
}



