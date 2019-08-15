import axios from 'axios';
const baseUrl = '/api/user';

const makeNewUser = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { makeNewUser };
