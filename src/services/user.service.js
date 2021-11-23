import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/v1/products/';
// 127.0.0.1:8000/api/v1/products/?active=true

const getPublicContent = () => axios.get(`${API_URL}?active=true`);

const getUserBoard = () => axios.get(`${API_URL}`, { headers: authHeader() });

const getAdminBoard = () => axios.get(`${API_URL}`, { headers: authHeader() });

export default {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
};