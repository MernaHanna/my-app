import axios, { AxiosRequestConfig } from "axios";

const fetchWithAuth = async (url: string, options: AxiosRequestConfig = {}) => {
  const token = localStorage.getItem("token");

  return axios({
    url,
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
};

export default fetchWithAuth;
