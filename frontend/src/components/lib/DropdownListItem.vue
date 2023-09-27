<template>
  <div class="dropdown__list__item">
    <slot />
  </div>
</template>

<style>
.dropdown__list__item {
    padding: var(--space-1) var(--space-4);
    font-weight: 500;
    cursor: pointer;
    &:hover {
        background: var(--color-background);
    }
}
</style>
