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
}

export default UserService;
