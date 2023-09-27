<template>
  <div class="filters">
    <FilterPillExpendable
      v-model:selected="filters.caloriesSelected"
      :options="['<300', '<600' , '600+' ]"
    >
      🔥 Calories
    </FilterPillExpendable>
    <FilterPill v-model:active="filters.vege ">
      🥬 Végétarien
    </FilterPill>
    <FilterPill v-model:active="filters.lactose ">
      🥛 Sans Lactose
    </FilterPill>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import FilterPill from '@/components/lib/FilterPill.vue';
import FilterPillExpendable from '@/components/lib/FilterPillExpendable.vue';

const filters = reactive({
  vege: false,
  lactose: false,
  calories: null,
});
</script>


<style scoped lang="scss">
.filters {
    display: flex;
    gap: var(--space-2);
    align-items: center;
}
</style>
