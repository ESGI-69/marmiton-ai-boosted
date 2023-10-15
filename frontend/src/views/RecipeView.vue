<template>
  <p v-if="isRecipeLoading">
    Loading...
  </p>
  <main
    v-else
    class="recipe"
  >
    <section>
      <Recipe
        :title="recipe.title"
        :steps="recipe.steps"
        :description="recipe.description"
        :ingredients="recipe.ingredientsWithQuantity.map(ingredient => ({ name: ingredient.ingredient.name, quantity: ingredient.quantity }))"
      />
    </section>
    <section>
      <h2 class="recipe__subtitle">
        Notez la recette
      </h2>
    </section>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useRecipeStore } from '@/stores/recipeStore';
import Recipe from '@/components/Recipe.vue';

const route = useRoute();
const recipeStore = useRecipeStore();

const isRecipeLoading = computed(() => recipeStore.isRecipeLoading);
const recipe = computed(() => recipeStore.recipe);

recipeStore.getRecipe(route.params.id);
</script>

<style lang="scss" scoped>
.recipe {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  &__subtitle {
    margin-bottom: var(--space-4);
    font-size: var(--text-xl);
    font-weight: 600;
  }
}
</style>
