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
        :id="recipe.id"
        :title="recipe.title"
        :steps="recipe.steps"
        :description="recipe.description"
        :ingredients="recipe.ingredientsWithQuantity.map(ingredient => ({ name: ingredient.ingredient.name, quantity: ingredient.quantity }))"
      />
    </section>
    <section class="recipe__comment">
      <h2 class="subtitle">
        Notez la recette
      </h2>
      <Textarea
        v-model="review.comment"
        class="recipe__comment__textarea"
        placeholder="Commentez à propos de cette recette..."
      />
      <MultiStarsRating
        v-model="review.notation"
        class="recipe__comment__stars"
        clickable
      />
      <Loader
        v-if="recipeStore.isReviewRecipeLoading"
        size="small"
        class="recipe__comment__loader"
      />
      <Button
        class="recipe__comment__button"
        :disabled="!review.notation || !review.comment"
        @click="postComment"
      >
        Commenter
      </Button>
    </section>
    <section class="recipe__comments">
      <h2 class="subtitle">
        Avis
      </h2>
      <div
        class="recipe__comments-container"
      >
        <CommentCard
          v-for="rating in recipe.ratings"
          :key="rating.id"
          :notation="rating.notation"
          :name="rating.author.name"
          :comment="rating.comment"
        />
      </div>
      <p
        v-if="recipe.ratings.length === 0"
        class="recipe__no-comment"
      >
        Aucun avis pour cette recette
      </p>
    </section>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, reactive } from 'vue';
import { useRecipeStore } from '@/stores/recipeStore';
import Button from '@/components/lib/Button.vue';
import Loader from '@/components/lib/Loader.vue';
import MultiStarsRating from '@/components/lib/MultiStarsRating.vue';
import Recipe from '@/components/Recipe.vue';
import Textarea from '@/components/lib/Textarea.vue';
import CommentCard from '@/components/CommentCard.vue';

const route = useRoute();
const recipeStore = useRecipeStore();

const review = reactive({
  notation: null,
  comment: '',
});

const isRecipeLoading = computed(() => recipeStore.isRecipeLoading);
const recipe = computed(() => recipeStore.recipe);

recipeStore.getRecipe(route.params.id);

const postComment = async () => {
  await recipeStore.reviewRecipe(route.params.id, review);
  review.notation = null;
  review.comment = '';
};
</script>

<style lang="scss" scoped>
.subtitle {
  margin-bottom: var(--space-1);
  font-size: var(--text-xl);
  font-weight: 600;
}
.recipe {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);

  &__comment {
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--space-3);
    grid-template-areas: "subtitle subtitle subtitle" "textarea textarea textarea" "stars loader button";

    .subtitle {
      grid-area: subtitle;
    }
    &__textarea {
      grid-area: textarea;
    }
    &__stars {
      grid-area: stars;
    }
    &__loader {
      grid-area: loader;
    }
    &__button {
      grid-area: button;
      justify-self: right;
    }
  }

  &__comments-container {
    display: flex;
    flex-direction: row;
    gap: var(--space-4);
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  &__no-comment {
    color: var(--color-text-secondary);
  }
}
</style>
