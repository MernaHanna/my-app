import axios, { AxiosRequestConfig } from "axios";

const fetchWithAuth = async (url: string, options: AxiosRequestConfig = {}) => {
  const token = localStorage.getItem("token");
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:3000/';
  const fullUrl: string = `${baseUrl}${url}`;

  return axios({
    url: fullUrl,
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
};

const fetchWithoutAuth = async (url: string, data: any, options: AxiosRequestConfig = {}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:3000/';
  const fullUrl: string = `${baseUrl}${url}`;

  return axios({
    url: fullUrl,
    data,
    ...options,
    headers: {
      ...options.headers,
    },
  });
};

export { fetchWithoutAuth, fetchWithAuth };
