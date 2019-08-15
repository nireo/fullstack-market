import axios from 'axios';
const baseUrl = '/api/review';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

export default { setToken };
