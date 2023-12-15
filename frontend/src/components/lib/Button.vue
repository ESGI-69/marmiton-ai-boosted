<template>
  <button
    class="button"
    :class="{
      'button--light': type === 'light',
      'button--loading': isLoading,
      'button--active': active,
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
  isLoading: {
    type: Boolean,
    default: false,
  },
  active: {
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
    background: var(--color-primary-light);
  }

  &--light.button--active {
    background-color: var(--color-border);
  }

  &--light {
    background: var(--color-white);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    &:hover {
      background: var(--color-border);
    }

    &:disabled {
      background: var(--color-primary-lighter);
    }
  }

  &--loading {
    position: relative;
    opacity: 0.8;
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      top: 10%;
      right: 1rem;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 100%;
      border: 2px solid var(--color-white);
      border-top-color: transparent;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
