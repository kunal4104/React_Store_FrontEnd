import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/v1/products/';
// 127.0.0.1:8000/api/v1/products/?active=true

const getPublicContent = (page, filter) => {
  let filterStr = '';
  if (filter && filter !== 'All') {
    filterStr = `&category=${filter}`;
  }
  return axios.get(`${API_URL}?active=true&page=${page || 1}${filterStr}`);
};

const getProduct = (id) => axios.get(`${API_URL}${id}`);

const getUserBoard = () => axios.get(`${API_URL}`, { headers: authHeader() });

const getAdminBoard = () => axios.get(`${API_URL}`, { headers: authHeader() });

export default {
  getPublicContent,
  getUserBoard,
  getProduct,
  getAdminBoard,
};
