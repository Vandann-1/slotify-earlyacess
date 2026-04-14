import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // No trailing slash here
});

export default API;