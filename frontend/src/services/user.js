import axios from 'axios';
const baseUrl = '/api/user';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

const initUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

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

const buyCommunityItems = async object => {
  const response = await axios.post(
    `${baseUrl}/buy/community`,
    object,
    getConfig()
  );
  return response.data;
};

const buyOfficialItems = async object => {
  const response = await axios.post(`${baseUrl}/buy/main`, object, getConfig());
  return response.data;
};

const updateBio = async object => {
  const response = await axios.post(`${baseUrl}/bio`, object, getConfig());
  return response.data;
};

export default {
  makeNewUser,
  setToken,
  removeUser,
  updateUser,
  initUsers,
  buyCommunityItems,
  buyOfficialItems,
  updateBio
};
