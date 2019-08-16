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

const removeUser = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

const updateUser = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, getConfig());
  return response.data;
};

export default { makeNewUser, setToken, removeUser, updateUser };
