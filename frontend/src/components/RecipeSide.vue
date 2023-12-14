<template>
  <div class="sides">
    <div class="sides__buttons">
      <Button
        type="light"
        :active="activeButton === 'wine'"
        :disabled="isSuggestionsAreLoading"
        @click="changeTab('wine')"
      >
        🍷 Vin
      </Button>
      <Button
        type="light"
        :active="activeButton === 'dessert'"
        :disabled="isSuggestionsAreLoading"
        @click="changeTab('dessert')"
      >
        🍰 Dessert
      </Button>
      <Button
        type="light"
        :active="activeButton === 'cheese'"
        :disabled="isSuggestionsAreLoading"
        @click="changeTab('cheese')"
      >
        🧀 Fromage
      </Button>
    </div>
    <div class="sides__tabs">
      <div
        v-if="activeButton === 'wine'"
        class="sides__tabs__wine"
      >
        <LoadingCircle v-if="isWineSuggestionsLoading" />
        <div class="sides__tabs__container">
          <RecipeCard
            v-for="wine in wineSuggestions.sides"
            :key="wine"
            :title="wine"
          />
        </div>
      </div>
      <div
        v-else-if="activeButton === 'dessert'"
        class="sides__tabs__dessert"
      >
        <LoadingCircle v-if="isDessertSuggestionsLoading" />
        <div class="sides__tabs__container">
          <RecipeCard
            v-for="dessert in dessertSuggestions.sides"
            :key="dessert"
            :title="dessert"
          />
        </div>
      </div>
      <div
        v-else-if="activeButton === 'cheese'"
        class="sides__tabs__cheese"
      >
        <LoadingCircle v-if="isCheeseSuggestionsLoading" />
        <div class="sides__tabs__container">
          <RecipeCard
            v-for="cheese in cheeseSuggestions.sides"
            :key="cheese"
            :title="cheese"
          />
        </div>
      </div>
      <p v-else>
        Sélectionnez un accompagnement à génerer
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
import { useRecipeStore } from '@/stores/recipeStore';
import Button from './lib/Button.vue';
import LoadingCircle from '@/components/LoadingCircle.vue';
import RecipeCard from '@/components/RecipeCard.vue';

const recipeStore = useRecipeStore();

const isWineSuggestionsLoading = computed(() => recipeStore.isWineSuggestionsLoading);
const isDessertSuggestionsLoading = computed(() => recipeStore.isDessertSuggestionsLoading);
const isCheeseSuggestionsLoading = computed(() => recipeStore.isCheeseSuggestionsLoading);

const wineSuggestions = computed(() => recipeStore.wineSuggestions);
const dessertSuggestions = computed(() => recipeStore.dessertSuggestions);
const cheeseSuggestions = computed(() => recipeStore.cheeseSuggestions);

const activeButton = ref(null);
const wines = ref(null);
const desserts = ref(null);
const cheeses = ref(null);

const changeTab = async (tab) => {
  activeButton.value = tab;
  if (tab === 'wine' && wines.value === null) {
    await recipeStore.getWineSuggestions(props.recipe);
    wines.value = recipeStore.wineSuggestions;
  }
  if (tab === 'dessert' && desserts.value === null) {
    await recipeStore.getDessertSuggestions(props.recipe);
    desserts.value = recipeStore.dessertSuggestions;
  }
  if (tab === 'cheese' && cheeses.value === null) {
    await recipeStore.getCheeseSuggestions(props.recipe);
    cheeses.value = recipeStore.cheeseSuggestions;
  }
};

const isSuggestionsAreLoading = computed(() => {
  if (isWineSuggestionsLoading.value
    || isDessertSuggestionsLoading.value
    || isCheeseSuggestionsLoading.value) {
    return true;
  }
  return false;
});

const props = defineProps({
  recipe: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.sides {
  &__buttons {
    display: flex;
    flex-direction: row;
    gap: var(--space-4);

    .active {
      background-color: var(--color-border);
    }
  }

  &__tabs {
    margin-top: var(--space-4);
    &__container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
      gap: var(--space-4);
    }
  }
}
</style>
