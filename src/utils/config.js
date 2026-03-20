export const API_BASE_URL = 'https://localhost:44316';

export const ENDPOINTS = {
  auth: {
    login: '/User/login',   
    signup: '/auth/signup',
    verifyOtp: '/auth/verify-otp',
    getUserProfile: '/User/by-email',
  },  
    products: {     
    list: '/products',
    create: '/products',
    }
};