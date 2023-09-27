/**
 * Intercept all requests and add the Authorization header if the user is logged in
 * @param axios { import('axios').AxiosInstance } Axios instance
 * @param router { import('vue-router').Router } Vue router instance
 */
export default (axios, router) => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        router.push({ name: 'login' });
      }
      return Promise.reject(error);
    },
  );
};
