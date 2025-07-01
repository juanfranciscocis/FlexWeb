import axios from "axios";
import type {ListingResponse} from "../components/interfaces/ListingResponse.ts";

const API_URL = import.meta.env.PUBLIC_API_URL;

export async function getListingByID(id: number): Promise<ListingResponse> {
    try {
        const response = await axios.get<ListingResponse>(
            `${API_URL}/listings`,
            {params: {id}}
        );

        if (response.data && (response.data as any).status === 'success') {
            return response.data;
        } else {
            throw new Error('API returned non-success status');
        }
    } catch (error) {
        console.error('Error fetching listing by ID:', error);
        throw error;
    }
}
