import { defineStore } from 'pinia';

import api from '@/plugins/axios';

export const useRecipeStore = defineStore('recipeStore', {
  getters: {
    ratings: (state) => state.recipe.ratings.map((rating) => ({
      notation: rating.notation,
      author: rating.author.name,
      comment: rating.comment,
      createdAt: rating.createdAt,
    })),
  },

  state: () => ({
    recipe: {},
    isRecipeLoading: false,

    searchResults: [],
    isSearchRecipeLoading: false,

    isReviewRecipeLoading: false,
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
        throw error.response.data;
      } finally {
        this.isSearchRecipeLoading = false;
      }
    },

    async reviewRecipe(id, { notation, comment }) {
      this.isReviewRecipeLoading = true;
      try {
        const { data } = await api.post(`recipes/${id}/ratings`, { notation, comment });
        this.recipe.ratings.push(data);
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isReviewRecipeLoading = false;
      }
    },

    async favoriteRecipe(id) {
      try {
        await api.post(`recipes/${id}/favorite`);
      } catch (error) {
        throw error.response.data;
      }
    },
  },
});
