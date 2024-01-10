<template>
  <div class="filters">
    <FilterPillExpendable
      v-model:selected="filters.calories"
      :options="['<300', '300-600' , '600+' ]"
    >
      🔥 Calories
    </FilterPillExpendable>
    <FilterPill v-model:active="filters.vegan">
      🥬 Végétarien
    </FilterPill>
    <FilterPill v-model:active="filters.lactose ">
      🥛 Sans Lactose
    </FilterPill>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue';
import FilterPill from '@/components/lib/FilterPill.vue';
import FilterPillExpendable from '@/components/lib/FilterPillExpendable.vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const storedFilters = authStore.getFilters();

const filters = reactive({
  vegan: storedFilters.vegan,
  lactose: storedFilters.lactoseFree,
  calories: storedFilters.calories,
});

watchEffect(() => {
  authStore.setFilters({
    vegan: filters.vegan,
    lactoseFree: filters.lactose,
    calories: filters.calories,
  });
});
</script>

<style scoped lang="scss">
.filters {
    display: flex;
    gap: var(--space-2);
    align-items: center;
}
</style>
