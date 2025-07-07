import apiClient from '~api/apiClient';

class SportSerivce {
    static async getListSport() {
        const response = await apiClient.get('/sports');
        return response.data; // { user, token }
    }
}

export default SportSerivce;
