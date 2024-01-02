<template>
  <div class="tag">
    <span class="tag__text">
      <slot />
    </span>
    <span
      class="tag__close"
      @click="$emit('close')"
    >
      x
    </span>
  </div>
</template>

<script setup>
defineEmits([ 'close' ]);
</script>

<style lang="scss" scoped>
.tag {
  display: inline-flex;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--space-4);
  border: 1px solid var(--color-primary);
  background-color: var(--color-white);
  color: var(--color-primary-dark);

  &__text {
    font-size: var(--text-sm);
    font-weight: bold;
    margin-right: var(--space-2);
  }

  &__close {
    font-size: var(--text-sm);
    cursor: pointer;
  }
}
</style>
