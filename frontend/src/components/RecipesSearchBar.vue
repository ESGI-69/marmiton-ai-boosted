<template>
  <Input
    v-model="inputValue"
    class="searchbar__input"
    placeholder="Rechercher une recette"
    :debounce-delay="500"
    @debounce="handleDebounce"
  />
  <div class="searchbar__results">
    <slot name="results" />
  </div>
  <Filters />
</template>

<script setup>
import Input from '@/components/lib/Input.vue';
import { ref } from 'vue';
import Filters from '@/components/Filters.vue';

const inputValue = ref('');
//const handleDebounce = (value) => {
// do something with the value
//};
</script>


<style scoped lang="scss">
.searchbar__input {
  height: 50px;
  margin-bottom: var(--space-4);
}
</style>
