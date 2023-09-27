import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

import api from '@/plugins/axios';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isLogged: false,
  }),

  actions: {
    async login({ username, password }) {
      this.ephemeralToken = '';
      this.isLoginLoading = true;
      try {
        const { data: { token } } = await api.post('auth/login/', { username, password });
        this.isLogged = true;
        Cookies.set(
          import.meta.env.VITE_COOKIE_TOKEN_NAME,
          token,
          {
            expires: 365,
            secure: true,
          },
        );
        this.isLoginLoading = false;
        return;
      } catch (error) {
        this.isLogged = false;
        this.isLoginLoading = false;
        throw error;
      }
    },

    init() {
      const token = Cookies.get(import.meta.env.VITE_COOKIE_TOKEN_NAME);
      if (token) {
        this.isLogged = true;
      }
    },
  },
});
