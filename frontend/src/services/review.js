import axios from 'axios';
const baseUrl = '/api/review';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

const postMainReview = async (postId, newObject) => {
  const response = await axios.post(
    `${baseUrl}/main/${postId}`,
    newObject,
    getConfig()
  );
  return response.data;
};

const postCommunityReview = async (postId, newObject) => {
  const response = await axios.post(
    `${baseUrl}/post/${postId}`,
    newObject,
    getConfig()
  );
  return response.data;
};

const removeReview = async reviewId => {
  const response = await axios.delete(`${baseUrl}/${reviewId}`, getConfig());
  return response.data;
};

const editReview = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, object, getConfig());
  return response.data;
};

export default {
  editReview,
  setToken,
  postMainReview,
  postCommunityReview,
  removeReview
};
