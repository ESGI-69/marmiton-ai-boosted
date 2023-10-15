import { defineStore } from 'pinia';

import api from '@/plugins/axios';

export const useRecipeStore = defineStore('recipeStore', {
  state: () => ({
    recipe: {},
    isRecipeLoading: false,

    searchResults: [],
    isSearchRecipeLoading: false,
  }),

  actions: {
    async getRecipe(id) {
      this.isRecipeLoading = true;
      try {
        const { data } = await api.get(`recipes/${id}`);
        this.recipe = data;
        return;
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isRecipeLoading = false;
      }
    },

    async searchRecipes(query) {
      this.isSearchRecipeLoading = true;
      try {
        const { data } = await api.get(`recipes/search?title=${query}`);
        this.searchResults = data;
        return;
      } catch (error) {

      } finally {
        this.isSearchRecipeLoading = false;
      }
    },
  },
});
