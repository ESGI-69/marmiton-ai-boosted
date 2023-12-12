<template>
  <div
    class="heart"
    :class="{
      'heart--active': isActive,
    }"
  />
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.heart {
  width: 0.6rem;
  height: 0.6rem;
  background-color: #A3A3A3;
  rotate: 45deg;
  position: relative;
  transition-property: transform, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  cursor: pointer;

  &::before, &::after {
    transition: background-color 0.2s ease-in-out;
    content: '';
    position: absolute;
    width: 0.6rem;
    aspect-ratio: 1;
    width: 100%;
    background-color: #A3A3A3;
    translate: -50% 0;
    border-radius: 50px;
  }

  &::after {
    translate: 0 -50% ;
  }

  &:hover {
    transform: scale(1.2);
  }

  &--active {
    background-color: var(--color-danger);
    &::before, &::after {
      background-color: var(--color-danger);
    }
  }
}
</style>
