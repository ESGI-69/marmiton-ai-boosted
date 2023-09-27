<template>
  <button
    class="filter-pill"
    :class="{ 'filter-pill--active': $props.active }"
    @click="() => onClick()"
  >
    <slot />
  </button>
</template>


<script setup>
const props = defineProps({
  active: Boolean,
});

const emits = defineEmits([ 'update:active' ]);

const onClick = () => {
  emits('update:active', !props.active);
};
</script>

<style lang="scss" scoped>
.filter-pill {
    background: var(--color-background-soft);
    color: var(--color-text);
    font-size: var(--text-sm);
    padding: var(--space-1) var(--space-3);
    border-radius: 999px;
    &--active {
        background: var(--color-primary);
        color: var(--color-white);
    }
}
</style>
