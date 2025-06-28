import apiClient from '~api/apiClient';

class AuthService {
  static async login(phone: string, password: string) {
    const response = await apiClient.post('/auth/login', {
      username: phone,
      password,
    });
    return response.data; // { user, token }
  }
  static async refreshTokenApi(refreshToken: string) {
    const response = await apiClient.post('/auth/refresh', {
      refreshToken,
    });
    return response.data; // { user, token }
  }
  static async getUser(token: string) {
    const response = await apiClient.get('/auth/', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  }
  static async register(name: string, email: string, password: string) {
    const response = await apiClient.post('/register', {
      fullname: name,
      phone_number: email,
      password,
    });
    return response; // could be { userId } or similar
  }

  static async createOtp(userId: string) {
    const response = await apiClient.post('/create-otp', {userId});
    return response.data; // { success: true }
  }

  static async verifyOtp(code: string, userId: string) {
    const response = await apiClient.post('/verify-otp', {code, userId});
    return response.data; // { user, token }
  }

  static async forgotPassword(email: string) {
    const response = await apiClient.post('/forgot-password', {email});
    return response.data;
  }
}

export default AuthService;
