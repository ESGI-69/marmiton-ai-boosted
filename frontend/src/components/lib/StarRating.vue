<template>
  <div class="rating">
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0.5L9.13954 4.55518L13.6574 5.33688L10.4618 8.62482L11.1145 13.1631L7 11.14L2.8855 13.1631L3.53815 8.62482L0.342604 5.33688L4.86046 4.55518L7 0.5Z"
        fill="#A3A3A3"
      />
    </svg>
    <span class="rating__rating">{{ rating }}/{{ maxRating }}</span>
  </div>
</template>

<script setup>
defineProps({
  rating: {
    type: Number,
    required: true,
  },
  maxRating: {
    type: Number,
    default: 5,
  },
});
</script>

<style lang="scss" scoped>
.rating {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  &__rating {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
  }
}
</style>
