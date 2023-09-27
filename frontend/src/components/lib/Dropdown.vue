<template>
  <div
    class="dropdown"
    @click="toggle"
  >
    <slot name="toggler">
      <button>Toggle</button>
    </slot>
    <slot />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
const active = ref(false);
const toggle = () => {
  active.value = !active.value;
};
provide('active', active);
</script>

<style>
.dropdown {
    position: relative;
    display: inline;
}
</style>

