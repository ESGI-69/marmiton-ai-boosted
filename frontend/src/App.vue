<template>
  <div class="container">
    <AppHeader />
    <RouterView />
    <ModalsContainer />
    <Chatbot />
  </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal';
import { RouterView } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import Chatbot from './components/Chatbot.vue';
</script>
