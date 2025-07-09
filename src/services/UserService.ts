import apiClient from '~api/apiClient';

class UserService {
    static async registerAnonUser(
        name: string,
        latitude: number,
        longitude: number,
        main_sport_id: string,
    ) {
        const response = await apiClient.post('/users/anonymous', {
            name: name,
            latitude: latitude,
            longitude: longitude,
            main_sport_id: main_sport_id,
        });
        return response.data;
    }

    /**
     * Call when app starts or resumes to mark the user as active
     */
    static async ping() {
        const response = await apiClient.post('/users/ping');
        return response.data;
    }
}

export default UserService;
