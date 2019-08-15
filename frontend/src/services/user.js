import axios from 'axios';
const baseUrl = '/api/user';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

const makeNewUser = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { makeNewUser, setToken };
