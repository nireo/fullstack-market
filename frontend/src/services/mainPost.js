import axios from "axios";
const baseUrl = "/api/main";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

const getMainPosts = async page => {
  const response = await axios.get(`${baseUrl}/${page}`);
  return response.data;
};

const getMainPostWithId = async id => {
  const response = await axios.get(`${baseUrl}/id/${id}`);
  return response.data;
};

const createMainPost = async postObject => {
  const response = await axios.post(baseUrl, postObject, getConfig());
  return response.data;
};

const deleteMainPost = async postId => {
  const response = await axios.delete(`${baseUrl}/${postId}`, getConfig());
  return response.data;
};

const updateMainPost = async (postId, newObject) => {
  const response = await axios.put(
    `${baseUrl}/${postId}`,
    newObject,
    getConfig()
  );
  return response.data;
};

export default {
  getMainPosts,
  createMainPost,
  setToken,
  deleteMainPost,
  updateMainPost,
  getMainPostWithId
};
