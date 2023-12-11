<template>
  <VueFinalModal
    class="modal"
    @update:model-value="(value) => $emit('update:modelValue', value)"
  >
    <h1 class="modal__title">
      {{ props.title }}
    </h1>
    <span
      class="modal__close"
      @click="$emit('update:modelValue', false)"
    />
    <slot />
  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';

defineEmits([ 'update:modelValue' ]);

const props = defineProps({
  title: {
    type: String,
    default: 'ModalTitle',
  },
});
</script>

<style lang="scss">
.modal {
  &__title {
    font-size: var(--text-2xl);
    font-weight: 600;
    margin-bottom: var(--space-4);
    padding-right: var(--space-6);
  }

  &__close {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    font-weight: 600;
    cursor: pointer;
    width: 1.2rem;
    height: 1.2rem;

    &::before, &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.2rem;
      height: 2px;
      background-color: var(--color-text);
      transition: transform 0.2s ease-in-out;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:hover {
      background-color: var(--color-border);

      &::before {
        transform: translate(-50%, -50%) rotate(-45deg);
      }

      &::after {
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }
}
</style>
