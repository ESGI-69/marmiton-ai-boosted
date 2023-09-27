<template>
  <main>
    <h1>
      Home
    </h1>
    <FilterPill
      v-model:active="active"
    >
      🥬 Végétarien
    </FilterPill>
  </main>
</template>

<script setup>
import FilterPill from '@/components/lib/FilterPill.vue';
import { ref } from 'vue';

const active = ref(false);
</script>
