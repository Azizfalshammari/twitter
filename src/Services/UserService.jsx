import axios from "axios";

const API_URL = "https://66828f884102471fa4c7621d.mockapi.io/users";

const getAllUsers = () => {
  return axios.get(API_URL);
};

const getCurrentUser = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return Promise.reject("No user ID found in local storage");
  }
  return axios.get(`${API_URL}/${userId}`);
};

const getUserById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createUser = (user) => {
  return axios.post(API_URL, user);
};
const loginUser = async (credentials, password) => {
  try {
    const allUsers = await getAllUsers();

    for (const user of allUsers.data) {
      if (user.handler === credentials.credential) {
        if (user.password === credentials.password) {
          return { success: true, user };
        } else {
          return { success: false, message: "Incorrect password" };
        }
      }
    }

    return { success: false, message: "User not found" };
  } catch (error) {
    console.error("Error logging in user:", error);
    return { success: false, message: "An error occurred during login" };
  }
};

const UserService = {
  getAllUsers,
  getCurrentUser,
  getUserById,
  createUser,
  loginUser,
};

export default UserService;
