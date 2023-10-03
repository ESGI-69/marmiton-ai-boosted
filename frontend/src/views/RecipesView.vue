<template>
  <main class="container">
    <h1>Recipes</h1>
    <p v-if="isRecipesLoading">
      Loading...
    </p>
    {{ recipe }}
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useRecipeStore } from '@/stores/recipeStore';

const recipeStore = useRecipeStore();

const isRecipesLoading = computed(() => recipeStore.isRecipeLoading);
const recipe = computed(() => recipeStore.recipe);

recipeStore.getRecipe(1);
</script>

<style lang="scss" scoped>
</style>
