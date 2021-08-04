import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: process.env.API_URL || 'http://localhost:3003/api',
});

export default axiosInstance;