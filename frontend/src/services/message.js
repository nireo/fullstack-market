import axios from 'axios';
const baseUrl = '/api/messages';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

const getUserMessages = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const removeMessage = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export default {
  removeMessage,
  getUserMessages,
  setToken
};
