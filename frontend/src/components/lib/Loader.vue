<template>
  <span
    class="loader"
    :class="{ 'loader--small': size === 'small' }"
  />
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'default',
    validator: (value) => [ 'small', 'default' ].includes(value),
  },
});
</script>

<style lang="scss" scoped>
.loader {
  border: 8px solid var(--color-border); /* Light grey */
  border-top: 8px solid var(--color-primary); /* Blue */
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;

  &--small {
    border: 6px solid var(--color-border); /* Light grey */
    border-top: 6px solid var(--color-primary); /* Blue */
    width: 30px;
    height: 30px;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
