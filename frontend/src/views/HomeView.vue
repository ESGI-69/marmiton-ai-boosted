
<template>
  <main class="container">
    <section class="searchbar">
      <SearchBar
        :is-loading="isSearchRecipeLoading"
        @search="handleSearch"
      >
        <template #results>
          <div class="results">
            <div
              v-for="{ id, title } in searchResults"
              :key="id"
              class="results__general"
            >
              <RecipeRow
                :title="title"
                :to="{ name: 'recipe', params: { id }}"
                @click="handleRecipeClick(id)"
              />
            </div>
            <div
              class="results__generate"
              @click="handleRecipeGenerationClick"
            >
              <span class="results__generate__text">
                Vous ne trouvez pas la recette qu'il vous faut ? Générer la !
              </span>
              <div class="results__generate__icon">
                +
              </div>
            </div>
          </div>
        </template>
      </SearchBar>
    </section>
    <section class="section">
      <h2 class="section__title">
        Recommendations
      </h2>
    </section>
    <section>
      <h2 class="section__title">
        Recettes de saison 🍁
      </h2>
      <p class="section__description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat cum impedit autem sint quis dolorum,
        repellendus
        veniam possimus repudiandae excepturi deserunt iure obcaecati reprehenderit odit? Veniam doloribus voluptates
        labore
        incidunt.
      </p>
    </section>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import RecipeRow from '@/components/RecipeRow.vue';
import SearchBar from '@/components/RecipesSearchBar.vue';
import { useRecipeStore } from '@/stores/recipeStore';
import { computed, ref } from 'vue';

const router = useRouter();
const recipeStore = useRecipeStore();
const searchValue = ref('');

const handleSearch = (value) => {
  searchValue.value = value;
  recipeStore.searchRecipes(value);
};

const handleRecipeClick = (id) => {
  router.push({ name: 'recipe', params: { id } });
};

const handleRecipeGenerationClick = () => {
  console.log(searchValue.value);
};

const searchResults = computed(() => recipeStore.searchResults);
const isSearchRecipeLoading = computed(() => recipeStore.isSearchRecipeLoading);
</script>


<style lang="scss" scoped>
.searchbar {
  margin-bottom: 5rem;
}

.results__generate {
  padding: var(--space-4);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  &:hover {
    background-color: var(--color-background);
    cursor: pointer;
    border-radius: var(--space-2);

    .results__generate__text {
      text-decoration: underline;
    }
  }

  &__icon {
    background-color: var(--color-background-soft);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-xl);
    border-radius: 50%;
  }
}

.section {
  margin-bottom: 5rem;

  &__title {
    font-size: var(--text-xl);
    margin-bottom: var(--space-4);
    font-weight: 600;
  }

  &__description {
    font-size: var(--text-sm);
    margin-bottom: var(--space-4);
    color: var(--color-text-secondary);
  }
}
</style>
