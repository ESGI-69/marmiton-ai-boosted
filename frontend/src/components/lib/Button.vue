<template>
  <button
    class="button"
    :class="{
      'button--light': type === 'light',
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.button {
  background: var(--color-primary);
  color: var(--color-white);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: var(--space-1) var(--space-4);
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: var(--color-text);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &--light {
    background: var(--color-white);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    &:hover {
      background: var(--color-border);
    }
  }
}
</style>
