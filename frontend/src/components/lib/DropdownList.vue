<template>
  <Transition name="dropdown-content">
    <div
      v-if="active"
      class="dropdown__list--active"
    >
      <slot />
    </div>
  </Transition>
</template>

<script setup>
import { inject } from 'vue';
const active = inject('active');
</script>

<style lang="scss" scoped>
.dropdown__list--active {
    transform-origin: top right;
    position: absolute;
    right: 0;
    margin-top: var(--space-1);
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: var(--space-1) 0;
    width: -moz-available;
    width: max-content;
}


.dropdown-content-enter-active,
.dropdown-content-leave-active {
    transition: all 0.2s;
}

.dropdown-content-enter,
.dropdown-content-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>

