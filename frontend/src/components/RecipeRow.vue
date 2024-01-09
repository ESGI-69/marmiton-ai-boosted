<template>
  <div
    class="recipe-row"
    @click="$emit('click')"
  >
    <img
      class="recipe-row__image"
      :src="imageUrl"
      :alt="`${title} image`"
    >
    <span class="recipe-row__title">
      {{ title }}
    </span>
    <StarRating
      class="recipe-row__rating"
      :rating="rating"
    />
  </div>
</template>

<script setup>
import StarRating from './lib/StarRating.vue';

defineEmits([ 'click' ]);

const { imageUrl, title, rating } = defineProps({
  imageUrl: {
    type: String,
    default: 'https://picsum.photos/300/300',
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.2,
  },
});
</script>

<style lang="scss" scoped>
.recipe-row {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  padding: var(--space-4);
  gap: var(--space-4);
  align-items: center;
  border-radius: var(--space-2);

  &:hover {
    background-color: var(--color-background);
    cursor: pointer;

    .recipe-row__title {
      text-decoration: underline;
    }
  }

  &__image {
    border-radius: var(--space-2);
    width: 60px;
    height: 60px;
    object-fit: cover;
  }

  &__title {
    font-weight: 600;
    font-size: var(--text-xl);
  }
}
</style>
