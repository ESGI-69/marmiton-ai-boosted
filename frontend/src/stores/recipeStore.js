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
    isGenerateRecipeLoading: false,
    isRecipeLoading: false,

    isSuggestRecipeLoading: false,
    suggestedRecipies: [],

    searchResults: [],
    isSearchRecipeLoading: false,

    isReviewRecipeLoading: false,

    wineSuggestions: [],
    dessertSuggestions: [],
    cheeseSuggestions: [],

    isWineSuggestionsLoading: false,
    isDessertSuggestionsLoading: false,
    isCheeseSuggestionsLoading: false,
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

    async generateRecipe(prompt) {
      this.isGenerateRecipeLoading = true;
      try {
        const { data } = await api.post('recipes/generate', { prompt });
        this.recipe = data;
        return;
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isGenerateRecipeLoading = false;
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
        this.recipe.isFavorite = true;
        this.recipe.favoriteCount += 1;
      } catch (error) {
        throw error.response.data;
      }
    },

    async unfavoriteRecipe(id) {
      try {
        await api.post(`recipes/${id}/unfavorite`);
        this.recipe.isFavorite = false;
        this.recipe.favoriteCount -= 1;
      } catch (error) {
        throw error.response.data;
      }
    },

    async getRecipeSuggestions(id) {
      this.isSuggestRecipeLoading = true;
      try {
        const { data } = await api.get(`recipes/${id}/suggest/recipies`);
        this.suggestedRecipies = data;
        return data;
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isSuggestRecipeLoading = false;
      }
    },

    async getWineSuggestions(id) {
      this.isWineSuggestionsLoading = true;
      try {
        const { data } = await api.get(`recipes/${id}/suggest/wine`);
        this.wineSuggestions = data;
        return;
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isWineSuggestionsLoading = false;
      }
    },

    async getDessertSuggestions(id) {
      this.isDessertSuggestionsLoading = true;
      try {
        const { data } = await api.get(`recipes/${id}/suggest/dessert`);
        this.dessertSuggestions = data;
        return;
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isDessertSuggestionsLoading = false;
      }
    },

    async getCheeseSuggestions(id) {
      this.isCheeseSuggestionsLoading = true;
      try {
        const { data } = await api.get(`recipes/${id}/suggest/cheese`);
        this.cheeseSuggestions = data;
        return;
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isCheeseSuggestionsLoading = false;
      }
    },
  },
});
