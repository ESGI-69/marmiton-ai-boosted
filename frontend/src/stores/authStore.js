import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

import api from '@/plugins/axios';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isLoginLoading: false,
    isRegisterLoading: false,

    isProfileLoading: false,
    profile: {},
  }),

  getters: {
    isLogged: (state) => state.profile.id !== undefined,
  },

  actions: {
    async login({ username, password }) {
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
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.isLoginLoading = false;
      }
    },

    async register({ username, name, password }) {
      this.isRegisterLoading = true;
      try {
        await api.post('users/', {
          username,
          name,
          password,
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.isRegisterLoading = false;
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
      window.location = '/';
    },
  },
});
