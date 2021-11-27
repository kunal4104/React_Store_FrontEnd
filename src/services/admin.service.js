import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/v1/products/';

const createProduct = (data) => {
  const res = axios
    .post(`${API_URL}`, data, { headers: authHeader() })
    .then((response) => response);
  return res;
};

const updateProduct = (data, id) => {
  const res = axios
    .patch(`${API_URL}${id}`, data, { headers: authHeader() })
    .then((response) => response);
  return res;
};

const deleteProduct = (id) => {
  axios
    .patch(
      `${API_URL}${id}`,
      {
        active: false,
      },
      { headers: authHeader() }
    )
    .then((response) => response);
};

export default {
  updateProduct,
  deleteProduct,
  createProduct,
};
