import apiClient from '~api/apiClient';

class UserService {
  static async getNearbyUser(phone: string, password: string) {
    const response = await apiClient.post('/auth/login', {
      username: phone,
      password,
    });
    return response.data; // { user, token }
  }
  static async registerAnonUser(phone: string, password: string) {
    const response = await apiClient.post('/auth/login', {
      username: phone,
      password,
    });
    return response.data; // { user, token }
  }
}

export default UserService;
