import axios from 'axios';

const API_URL = 'https://66828f884102471fa4c7621d.mockapi.io/users';

const getAllUsers = () => {
  return axios.get(API_URL);
};

const getCurrentUser = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return Promise.reject('No user ID found in local storage');
  }
  return axios.get(`${API_URL}/${userId}`);
};

const getUserById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createUser = (user) => {
  return axios.post(API_URL, user);
};

const UserService = {
  getAllUsers,
  getCurrentUser,
  getUserById,
  createUser,
};

export default UserService;
