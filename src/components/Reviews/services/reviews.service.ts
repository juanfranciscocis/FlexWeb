import axios from 'axios';
import type {Review, ReviewsResponse} from "../interfaces/ReviewsResponse.ts";
import type {ReviewQueryParams} from "../interfaces/ReviewQueryParams.ts";
import type {SummaryResponse} from "../interfaces/SummaryResponse.ts";


const API_URL = `${import.meta.env.PUBLIC_API_URL}`;

export async function getReviews(params: ReviewQueryParams = {}): Promise<ReviewsResponse> {
    try {
        const response = await axios.get<ReviewsResponse>(API_URL, { params });

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

export async function  getReviewsSumary():Promise<SummaryResponse>{
    try {
        const response = await axios.get(`${API_URL}/summary`);

        if (response.data.status === 'success') {
            return response.data;
        } else {
            throw new Error('Failed to fetch reviews summary: API returned non-success status');
        }
    } catch (error) {
        console.error('Error fetching reviews summary:', error);
        throw error;
    }
}


