<template>
  <div class="about">
    <Breadcrumb />
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import Breadcrumb from '@/components/lib/Breadcrumb.vue';
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
