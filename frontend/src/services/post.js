import axios from 'axios';
const baseUrl = '/api/post';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

const getAllPosts = async page => {
  const response = await axios.get(`${baseUrl}/${page}`);
  return response.data;
};

const getPostById = async id => {
  const response = await axios.get(`${baseUrl}/id/${id}`);
  return response.data;
};

const createNewPost = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const deletePost = async postId => {
  const response = await axios.delete(`${baseUrl}/${postId}`, getConfig());
  return response.data;
};

const updatePost = async (postId, newObject) => {
  const response = await axios.put(
    `${baseUrl}/${postId}`,
    newObject,
    getConfig()
  );
  return response.data;
};

const getItemLengths = async () => {
  const response = await axios.get(`${baseUrl}/items`);
  return response.data;
};

const searchPosts = async search => {
  // this could be integrated into the normal query, but
  // it's more convenient this way
  const response = await axios.get(`${baseUrl}/?search=${search}`);
  return response.data;
};

export default {
  setToken,
  getAllPosts,
  createNewPost,
  deletePost,
  updatePost,
  getPostById,
  getItemLengths,
  searchPosts
};
