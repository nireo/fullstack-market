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
    `${baseUrl}/${postId}`,
    newObject,
    getConfig()
  );
  return response.data;
};

const postCommunityReview = async (postId, newObject) => {
  const response = await axios.post(
    `${baseUrl}/${postId}`,
    newObject,
    getConfig()
  );
  return response.data;
};

export default { setToken, postMainReview, postCommunityReview };
