import axios from 'axios';
const baseUrl = '/api/post';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

export default { setToken };
