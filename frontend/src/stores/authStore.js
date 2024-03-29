import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

import api from '@/plugins/axios';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isLoginLoading: false,
    isRegisterLoading: false,

    isProfileLoading: false,
    profile: {},

    filters: {},

    isRemoveAllergyLoading: false,
    isAddAllergyLoading: false,

    isAddNonLikedIngredientsLoading: false,
    isRemoveNonLikedIngredientsLoading: false,
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

    async addAllergy(name) {
      this.isAddAllergyLoading = true;
      try {
        await api.post('users/me/allergies/', { name });
        this.profile.allergies.push(name);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.isAddAllergyLoading = false;
      }
    },

    async removeAllergy(name) {
      this.isRemoveAllergyLoading = true;
      try {
        await api.delete(`users/me/allergies/${name}`);
        this.profile.allergies = this.profile.allergies.filter((allergy) => allergy !== name);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.isRemoveAllergyLoading = false;
      }
    },

    async addNonLikedIngredient(name) {
      this.isAddNonLikedIngredientsLoading = true;
      try {
        await api.post('users/me/non-liked-ingredients', { name });
        this.profile.nonLikedIngredients.push(name);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.isAddNonLikedIngredientsLoading = false;
      }
    },

    async removeNonLikedIngredient(name) {
      this.isRemoveNonLikedIngredientsLoading = true;
      try {
        await api.delete(`users/me/non-liked-ingredients/${name}`);
        this.profile.nonLikedIngredients = this.profile.nonLikedIngredients.filter(
          (ingredient) => ingredient !== name,
        );
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.isRemoveNonLikedIngredientsLoading = false;
      }
    },

    setFilters(filters) {
      localStorage.setItem('filters', JSON.stringify(filters));
      this.filters = filters;
    },

    getFilters() {
      const filters = localStorage.getItem('filters');
      if (filters) {
        this.filters = JSON.parse(filters);
      }
      return this.filters;
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
