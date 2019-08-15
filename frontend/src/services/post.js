import axios from 'axios';
const baseUrl = '/api/post';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

const getAllPosts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { setToken, getAllPosts };
