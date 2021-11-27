import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/users/';

const register = (username, email, password, passwordConfirm) =>
  axios
    .post(`${API_URL}signup`, {
      name: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    })
    .then((response) => {
      if (response.data.token) {
        // eslint-disable-next-line no-undef
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }

      return response.data;
    });

const login = (username, password) =>
  axios
    .post(`${API_URL}login`, {
      email: username,
      password: password,
    })
    .then((response) => {
      if (response.data.token) {
        // eslint-disable-next-line no-undef
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...response.data.data,
            token: response.data.token,
          })
        );
      }

      return response.data;
    });

const logout = () => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem('user');
};

// eslint-disable-next-line no-undef
const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
