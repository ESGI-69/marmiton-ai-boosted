import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

import api from '@/plugins/axios';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isLoginLoading: false,

    isProfileLoading: false,
    profile: {},
  }),

  getters: {
    isLogged: (state) => state.profile.id !== undefined,
  },

  actions: {
    async login({ username, password }) {
      this.ephemeralToken = '';
      this.isLoginLoading = true;
      try {
        const { data: { token } } = await api.post('auth/login/', { username, password });
        Cookies.set(
          import.meta.env.VITE_COOKIE_TOKEN_NAME,
          token,
          {
            expires: 365,
            secure: true,
          },
        );
        await this.getProfile();
        this.isLoginLoading = false;
        return;
      } catch (error) {
        this.isLoginLoading = false;
        throw error;
      }
    },

    async getProfile() {
      try {
        this.isProfileLoading = true;
        const { data } = await api.get('users/me');
        this.profile = data;
      } catch (error) {
        this.profile = {};
      } finally {
        this.isProfileLoading = false;
      }
    },

    init() {
      const token = Cookies.get(import.meta.env.VITE_COOKIE_TOKEN_NAME);
      if (token) {
        this.getProfile();
      }
    },

    logout() {
      Cookies.remove(import.meta.env.VITE_COOKIE_TOKEN_NAME);
      this.profile = {};
    },
  },
});
