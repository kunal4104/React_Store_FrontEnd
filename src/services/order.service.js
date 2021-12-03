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

const getAllOrders = () => {
  const res = axios
    .get(`${API_URL}`, { headers: authHeader() })
    .then((response) => response);

  return res;
};

const getUserOrders = (id) => {
  const res = axios
    .get(`${API_URL}user/${id}`, { headers: authHeader() })
    .then((response) => response);
  return res;
};

const getSingleOrder = (id) => {
  const res = axios
    .get(`${API_URL}${id}`, { headers: authHeader() })
    .then((response) => response);
  return res;
};

const updateOrderStatus = (status, id) => {
  console.log(status);
  const res = axios
    .patch(`${API_URL}${id}`, { status: status }, { headers: authHeader() })
    .then((response) => response);

  return res;
};

export default {
  createOrder,
  updateOrderStatus,
  getAllOrders,
  getSingleOrder,
  getUserOrders,
};
