import axios from 'axios';

const API_URL = 'https://66828f884102471fa4c7621d.mockapi.io';

const getAllTweets = () => {
  return axios.get(`${API_URL}/tweets`);
};

const createTweet = (tweet) => {
  return axios.post(`${API_URL}/tweets`, tweet);
};

const getTweetsByUserId = (userId) => {
  return axios.get(`${API_URL}/tweets`, { params: { author: userId } });
};

const updateTweet = (id, updatedTweet) => {
  return axios.put(`${API_URL}/tweets/${id}`, updatedTweet);
};

const deleteTweet = (id) => {
  return axios.delete(`${API_URL}/tweets/${id}`);
};

const TweetService = {
  getAllTweets,
  createTweet,
  getTweetsByUserId,
  updateTweet,
  deleteTweet
};

export default TweetService;
