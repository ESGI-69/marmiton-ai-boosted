<template>
  <div class="profile">
    <h1 class="profile__title">
      Mon profile
    </h1>
    <div class="profile__section">
      <h2 class="profile__section__title">
        Informations personnelles
      </h2>
      <div class="profile__section__container fields">
        <div class="fields__field">
          <span class="fields__field__title">Nom d'utilisateur</span>
          <span class="fields__field__value">{{ authStore.profile.username }}</span>
        </div>
        <div class="fields__field">
          <span class="fields__field__title">Nom complet</span>
          <span class="fields__field__value">{{ authStore.profile.name }}</span>
        </div>
        <div class="fields__field">
          <span class="fields__field__title">Date d'inscription</span>
          <span class="fields__field__value">{{ formatDateTime(authStore.profile.createdAt) }}</span>
        </div>
      </div>
    </div>
    <div class="profile__section">
      <h2 class="profile__section__title">
        Mes recettes préférées
      </h2>
      <div class="profile__section__container recipes">
        <RecipeCard
          v-for="{ recipe} in authStore.profile.favoriteRecipes"
          :id="recipe.id"
          :key="recipe.title"
          can-view
          :title="recipe.title"
          :description="recipe.description"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { formatDateTime } from '@/utils/dateFormater';

import RecipeCard from '@/components/RecipeCard.vue';

const authStore = useAuthStore();
const router = useRouter();

if (!authStore.isLogged) {
  router.push({ name: '/' });
} else {
  authStore.getProfile();
}
</script>

<style lang="scss" scoped>
.profile {
  &__title {
    font-size: var(--text-4xl);
    font-weight: bold;
  }

  &__section {
    margin-top: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-8);

    &__title {
      font-weight: bold;
      font-size: var(--text-2xl);
    }

    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .fields {
      flex-direction: row;
      gap: var(--space-8);

      &__field {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);

        &__title {
          font-weight: bold;
        }
      }
    }

    .recipes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
      gap: var(--space-4);
    }

  }
}
</style>
