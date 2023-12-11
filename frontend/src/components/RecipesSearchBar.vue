<template>
  <Input
    v-model="inputValue"
    class="searchbar__input"
    placeholder="Rechercher une recette"
    :debounce-delay="500"
    @debounce="handleDebounce"
    @input="isDebouncing = true"
  />
  <div
    v-if="!isLoading && !isDebouncing && inputValue"
    class="searchbar__results"
  >
    <slot name="results" />
  </div>
  <div
    v-else-if="inputValue"
    class="searchbar__loader"
  >
    <Loader />
  </div>
  <Filters class="searchbar__filters" />
</template>

<script setup>
import Input from '@/components/lib/Input.vue';
import { ref } from 'vue';
import Filters from '@/components/Filters.vue';
import Loader from '@/components/lib/Loader.vue';

const { isLoading } = defineProps({
  isLoading: Boolean,
});

const emit = defineEmits([ 'search' ]);

const isDebouncing = ref(false);
const inputValue = ref('');

const handleDebounce = (searchValue) => {
  isDebouncing.value = false;
  if (!searchValue) return;
  emit('search', searchValue);
};
</script>


<style scoped lang="scss">
.searchbar {
  margin-bottom: var(--space-4);
  position: relative;

  &__input {
    height: 50px;
  }

  &__loader, &__results {
    position: relative;
    top: calc(var(--space-2) * -1);
    border: 1px solid var(--color-border);
    border-top: none;
    border-radius: 0 0 var(--space-2) var(--space-2);
    background: var(--color-white);
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__filters {
    padding-top: var(--space-2);
  }
}
</style>
