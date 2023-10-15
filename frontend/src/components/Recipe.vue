<template>
  <div class="recipe">
    <div class="recipe__header">
      <StarRating
        class="recipe__header__notation"
        :rating="notation"
      />
      <div class="recipe__header__fav">
        coeur
      </div>
    </div>
    <div class="recipe__info">
      <h1 class="recipe__info__title">
        {{ title }}
      </h1>
      <p class="recipe__info__description">
        {{ description }}
      </p>
      <img
        class="recipe__info__image"
        :src="imageUrl"
      >
    </div>
    <div class="recipe__ingredients">
      <h2>
        Ingredients
      </h2>
      <table>
        <tbody>
          <tr
            v-for="ingredient in ingredients"
            :key="ingredient"
            class="recipe__ingredients__ingredient"
          >
            <td class="recipe__ingredients__ingredient__quantity">
              {{ ingredient.quantity }}
            </td>
            <td class="recipe__ingredients__ingredient__name">
              {{ ingredient.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="recipe__steps">
      <h2>
        Steps
      </h2>
      <ol>
        <li
          v-for="step in steps"
          :key="step"
          class="recipe__steps__step"
        >
          {{ step }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import StarRating from './lib/StarRating.vue';

defineProps({
  imageUrl: {
    type: String,
    default: 'http://placekitten.com/300/300',
  },
  notation: {
    type: Number,
    default: 4.2,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  steps: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.recipe {
  color: var(--color-text);
  padding: var(--space-8);
  border-radius: var(--space-1);
  background-color: var(--color-white);
  box-shadow: var(--box-shadown);

  display: flex;
  flex-direction: column;
  gap: var(--space-8);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__info {
    display: grid;
    grid-template-areas: "title image" "description image";
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    gap: var(--space-4);

    &__title {
      grid-area: title;
      width: 100%;
      font-size: var(--text-4xl);
      font-weight: bold;
    }

    &__description {
      grid-area: description;
      color: var(--color-text-secondary);
      font-size: var(--text-md);
    }

    &__image {
      grid-area: image;
      width: 10rem;
      border-radius: var(--space-2);
      box-shadow: var(--box-shadown);
    }
  }

  &__ingredients, &__steps {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);

    h2 {
      all: unset;
      font-size: var(--text-xl);
      font-weight: 600;
    }

    &__ingredient, &__step {
      font-size: var(--text-md);
    }

    &__ingredient {
      &__quantity {
        font-weight: 500;
      }
      &__name:first-letter {
        text-transform: uppercase;
      }
    }
  }

  &__steps {

    &__step {
      margin-bottom: var(--space-2);
    }

    ol {
      padding-left: var(--space-8);
      list-style: decimal;

      li::marker {
        font-weight: 500;
      }
    }
  }
}
</style>
