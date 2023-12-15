<template>
  <div class="comment-card">
    <img
      class="comment-card__profile-picture"
      :src="imageUrl"
      alt="profile-picture"
    >
    <div class="comment-card__container">
      <div class="comment-card__container__header">
        <span class="comment-card__container__header__name">{{ name }}</span>
        <span class="comment-card__container__header__date">{{ formatDateTime(date) }}</span>
      </div>
      <MultiStarsRating
        :model-value="notation"
        class="comment-card__stars"
      />
      <p>{{ comment }}</p>
      <RouterLink
        v-if="recipeId"
        class="comment-card__container__recipe"
        :to="{ name: 'recipe', params: { id: recipeId } }"
      >
        → {{ recipe }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { formatDateTime } from '@/utils/dateFormater';
import MultiStarsRating from '@/components/lib/MultiStarsRating.vue';

defineProps({
  notation: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'https://picsum.photos/300/300',
  },
  recipe: {
    type: String,
    default: null,
  },
  recipeId: {
    type: Number,
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.comment-card {
  display: grid;
  grid-template-columns: var(--space-8) 1fr;
  padding: var(--space-4);
  gap: var(--space-4);
  background-color: var(--color-white);
  width: 100%;
  border-radius: var(--space-4);

  &__profile-picture {
    border-radius: var(--space-8);
    width: var(--space-8);
    height: var(--space-8);
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    align-items: flex-start;

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      gap: var(--space-4);

      &__name {
        font-weight: bold;
      }

      &__date {
        font-weight: 200;
        font-size: var(--text-sm);
        color: var(--color-primary-light);
      }
    }

    &__recipe {
      font-weight: bold;
      color: var(--color-primary-light);

      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__container > *:last-child {
    margin-top: auto;
  }
}
</style>
