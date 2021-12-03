import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/v1/orders/';
// 127.0.0.1:8000/api/v1/orders/

const createOrder = (data) => {
  const res = axios
    .post(`${API_URL}`, data, { headers: authHeader() })
    .then((response) => response);

  return res;
};

const getAllOrders = () => {};

const getUserOrders = (id) => {
  console.log(id);
  const res = axios
    .get(`${API_URL}/user/${id}`, { headers: authHeader() })
    .then((response) => response);
  return res;
};

export default {
  createOrder,
  getAllOrders,
  getUserOrders,
};
