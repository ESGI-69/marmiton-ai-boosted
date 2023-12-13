
<template>
  <main class="container">
    <section class="searchbar">
      <SearchBar
        v-model="searchValue"
        :is-loading="isSearchRecipeLoading"
        @search="(value) => recipeStore.searchRecipes(value)"
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
import { useModal } from 'vue-final-modal';
import Modal from '@/components/lib/Modal.vue';
import Login from '@/components/Modals/Login.vue';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const recipeStore = useRecipeStore();
const authStore = useAuthStore();
const searchValue = ref('');

const handleRecipeClick = (id) => {
  router.push({ name: 'recipe', params: { id } });
};

const loginModal = useModal({
  component: Modal,
  attrs: {
    title: 'Welcome back!',
    onClose: () => loginModal.close(),
  },
  slots: {
    default: {
      component: Login,
      attrs: {
        onClose: () => loginModal.close(),
      },
    },
  },
});

const handleRecipeGenerationClick = async () => {
  if (!authStore.isLogged) {
    loginModal.open();
    return;
  }
  recipeStore.generateRecipe(searchValue.value);
  router.push({ name: 'generate-loading' });
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
