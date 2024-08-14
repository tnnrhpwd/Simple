// services/AuthService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://mern-plan-web-service.onrender.com/api/data/'; // sends base http request here

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}login`, {
        email,
        password,
      });

      if (response.data && response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('userToken');
  },

  isLoggedIn: async () => {
    const token = await AsyncStorage.getItem('userToken');
    return token !== null;
  },
};

export default AuthService;
