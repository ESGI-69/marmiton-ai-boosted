<template>
  <div class="container">
    <AppHeader />
  </div>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
</script>
