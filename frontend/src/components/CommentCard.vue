<template>
  <div class="comment-card">
    <img
      class="comment-card__profile-picture"
      :src="imageUrl"
      alt="profile-picture"
    >
    <div class="comment-card__container">
      <p>{{ name }}</p>
      <p>{{ comment }}</p>
      <MultiStarsRating
        :model-value="notation"
        :text-visible="false"
        class="comment-card__stars"
      />
    </div>
  </div>
</template>

<script setup>
import MultiStarsRating from '@/components/lib/MultiStarsRating.vue';

const { notation, name, comment } = defineProps({
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
});
</script>

<style lang="scss" scoped>
.comment-card {
  display: flex;
  flex-direction: row;
  padding: var(--space-4);
  gap: var(--space-4);
  background-color: var(--color-white);
  width: 263px;
  border-radius: var(--space-4);
  flex-grow: 1;

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
  }
  &__container > *:last-child {
    margin-top: auto;
  }
}
</style>
