import axios from 'axios';
import type {UrlsResponse} from "../Reviews/interfaces/UrlsResponse.ts";



const API_URL = `${import.meta.env.PUBLIC_API_URL}/url`;

export async function getURLs( ): Promise<UrlsResponse> {
    try {
        const response = await axios.get<UrlsResponse>(API_URL);

        if (response.data.status === 'success') {
            return response.data;
        } else {
            throw new Error('Failed to fetch reviews: API returned non-success status');
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
}
