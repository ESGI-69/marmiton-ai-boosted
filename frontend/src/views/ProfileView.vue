<template>
  <div class="profile">
    <h1 class="profile__title">
      Mon profil
    </h1>
    <div class="profile__section">
      <h2 class="profile__section__title">
        Informations personnelles
      </h2>
      <div class="profile__section__subtitle">
        Des informations vous concernant.
      </div>
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
      <div class="profile__section__subtitle">
        Les recettes que vous avez aimé.
      </div>
      <div class="profile__section__container recipes">
        <RecipeCard
          v-for="{ recipe } in authStore.profile.favoriteRecipes"
          :id="recipe.id"
          :key="recipe.title"
          can-view
          :title="recipe.title"
          :description="recipe.description"
        />
      </div>
    </div>
    <div class="profile__section">
      <h2 class="profile__section__title">
        Mes commentaires récents
      </h2>
      <div class="profile__section__subtitle">
        Les commentaires que vous avez posté sur les recettes.
      </div>
      <div class="profile__section__container comments">
        <CommentCard
          v-for="comment in authStore.profile.ratings"
          :key="comment.id"
          :comment="comment.comment"
          :notation="comment.notation"
          :name="comment.author.username"
          :recipe="comment.recipe.title"
          :recipe-id="comment.recipe.id"
          :date="new Date(comment.createdAt)"
        />
      </div>
    </div>
    <div class="profile__section">
      <h2 class="profile__section__title">
        Mes allergies
      </h2>
      <div class="profile__section__subtitle">
        Ici vous pouvez gérer vos allergies.
      </div>
      <div class="profile__section__container">
        <Allergies :allergies="authStore.profile.allergies" />
      </div>
    </div>
    <div class="profile__section">
      <h2 class="profile__section__title">
        Mes ingredients que je n'aime pas
      </h2>
      <div class="profile__section__subtitle">
        Ici vous pouvez renseigner les ingredients que vous ne souhaitez pas consommer.
      </div>
      <div class="profile__section__container">
        <NonLikedIngredients :non-liked-ingredients="authStore.profile.nonLikedIngredients" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { formatDateTime } from '@/utils/dateFormater';

import Allergies from '@/components/Allergies.vue';
import RecipeCard from '@/components/RecipeCard.vue';
import CommentCard from '@/components/CommentCard.vue';
import NonLikedIngredients from '@/components/NonLikedIngredients.vue';

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
    margin-top: var(--space-8);

    &__title {
      font-weight: bold;
      font-size: var(--text-2xl);
    }

    &__subtitle {
      font-size: var(--text-md);
      color: var(--color-primary-light);
    }

    &__container {
      margin-top: var(--space-2);
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

    .comments {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
      gap: var(--space-4);
    }

    .allergies {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);

      &__tags {
        display: flex;
        flex-direction: row;
        gap: var(--space-2);
      }

      &__add {
        background: red;
        display: flex;
        flex-direction: row;
        gap: var(--space-2);
      }
    }
  }
}
</style>
