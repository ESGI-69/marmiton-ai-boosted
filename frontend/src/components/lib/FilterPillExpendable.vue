<template>
  <div
    class="filter-pill-expendable"
    :class="{ 'filter-pill-expendable--active': active }"
  >
    <button
      class="filter-pill-expendable__button"
      @click="() => onClick()"
    >
      <slot />
    </button>
    <div
      v-if="active"
      class="filter-pill-expendable__options"
    >
      <button
        v-for="option, index in options"
        :key="index"
        class="filter-pill-expendable__options__option"
        :class="{ 'filter-pill-expendable__options__option--active': option === selected }"
        @click="() => onSelection(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
  selected: {
    type: String,
    default: null,
  },
});
const emits = defineEmits([ 'update:active', 'update:selected' ]);

const active = ref(false);

const onClick = () => {
  // Closing the pill
  if (active.value) {
    emits('update:selected', null);
  }
  // Opening the pill
  if (!active.value) {
    emits('update:selected', props.options[0]);
  }
  active.value = !active.value;

};

const onSelection = (option) => {
  emits('update:selected', option);
};
</script>

<style lang="scss" scoped>
.filter-pill-expendable {
  $ref: &;
  display: flex;
  align-items: center;
  background: var(--color-white);
  border-radius: 999px;

  &--active {
    outline: 1px solid var(--color-border);
    outline-offset: -1px;

    #{$ref} {
      &__button {
        background: var(--color-primary);
        color: var(--color-white);
      }

      &__options {
        display: flex;
      }
    }
  }

  &__button {
    background: var(--color-background-soft);
    color: var(--color-text);
    font-size: var(--text-sm);
    padding: var(--space-1) var(--space-3);
    border-radius: 999px;
    font-weight: 500;
  }

  &__options {
    display: none;
    align-items: center;
    gap: var(--space-1);
    padding: 0 var(--space-2);

    &__option {
      font-size: var(--text-xs);
      font-weight: 500;
      padding: var(--space-1) var(--space-2);
      border-radius: 999px;

      &--active {
        background: var(--color-primary);
        color: var(--color-white);
      }
    }
  }
}
</style>
