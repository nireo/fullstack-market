import axios from 'axios';
const baseUrl = '/api/main';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

const getMainPosts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createMainPost = async postObject => {
  const response = await axios.post(baseUrl, postObject, getConfig());
  return response.data;
};

export default { getMainPosts, createMainPost, setToken };
