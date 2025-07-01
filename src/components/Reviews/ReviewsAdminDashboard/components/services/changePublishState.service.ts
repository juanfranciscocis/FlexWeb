import axios from 'axios';
import type {Review} from "../../../interfaces/ReviewsResponse.ts";


const API_URL = `${import.meta.env.PUBLIC_API_URL}`;
export async function changePublishState(id: number): Promise<Review> {
    try {
        const response = await axios.patch(
            `${API_URL}/${id}/publish-status`
        );

        if (response.data.status === 'success') {
            return response.data.review;
        } else {
            throw new Error('Failed to change publish state: API returned non-success status');
        }
    } catch (error) {
        console.error('Error changing publish state:', error);
        throw error;
    }
}
