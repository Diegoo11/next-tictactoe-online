import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_REST_URL,
});
export default instance;
