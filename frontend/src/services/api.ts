import { getCookieClient } from '@/lib/cookieClient';
import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3333"
})

api.interceptors.request.use((config) => {
    const token = getCookieClient();
  
    console.log(token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
    }
  
    return config;

});