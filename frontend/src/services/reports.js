import axios from "axios";
const baseUrl = "/api/report";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

const getReports = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const createReport = async (id, report) => {
  const response = await axios.post(`${baseUrl}/${id}`, report, getConfig());
  return response.data;
};

const deleteReport = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export default {
  setToken,
  getReports,
  createReport,
  deleteReport
};
