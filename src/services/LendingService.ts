import apiClient from '~api/apiClient';

class LendingService {
    static async getAll(params: URLSearchParams) {
        const response = await apiClient.get('/products', {
            params, // Axios will serialize this into the query string
        });
        return response.data;
    }
    static async getById(id: string) {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    }
}

export default LendingService;
