<template>
  <span class="loader" />
</template>

<style scoped>
.loader {
  border: 8px solid var(--color-border); /* Light grey */
  border-top: 8px solid var(--color-primary); /* Blue */
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
