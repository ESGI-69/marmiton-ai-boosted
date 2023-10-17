<template>
  <div class="multi-stars-rating">
    <svg
      v-for="number in max"
      :key="number"
      class="multi-stars-rating__star"
      :class="{
        'multi-stars-rating__star--active': number <= modelValue,
        'multi-stars-rating__star--clickable': clickable,
      }"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      @click="clickable ? $emit('update:modelValue', number) : null"
    >
      <path
        d="M7 0.5L9.13954 4.55518L13.6574 5.33688L10.4618 8.62482L11.1145 13.1631L7 11.14L2.8855 13.1631L3.53815 8.62482L0.342604 5.33688L4.86046 4.55518L7 0.5Z"
        fill="#A3A3A3"
      />
    </svg>
    <span
      v-if="modelValue && textVisible"
      class="multi-stars-rating__rating"
    >{{ modelValue }}/{{ max }}</span>
  </div>
</template>

<script setup>
defineEmits([ 'update:modelValue' ]);
defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
  max: {
    type: Number,
    default: 5,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  textVisible: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.multi-stars-rating {
  display: flex;
  align-items: center;
  gap: var(--space-1);

  &__star {
    width: 30px;
    height: 30px;

    &--clickable {
      cursor: pointer;
    }

    &--active > *{
      fill: var(--color-primary);
    }
  }

  &__rating {
    margin-left: var(--space-2);
    font-weight: 600;
    font-size: var(--text-sm);
    color: var(--color-primary);
  }
}
</style>
