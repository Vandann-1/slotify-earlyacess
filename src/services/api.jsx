import axios from "axios";

const API = axios.create({

  baseURL: "http://127.0.0.1:8000/api",

});

// =========================
// ATTACH TOKEN
// =========================

API.interceptors.request.use(

  (req) => {

    const token =
      localStorage.getItem("access");

    // ADD TOKEN IF EXISTS

    if (token) {

      req.headers.Authorization =
        `Bearer ${token}`;

    }

    return req;

  },

  (error) => {

    return Promise.reject(error);

  }

);

export default API;