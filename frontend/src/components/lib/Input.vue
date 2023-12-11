<template>
  <input
    :id="id"
    class="input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
  >
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  debounceDelay: {
    type: Number,
    default: 1000,
  },
});
const emits = defineEmits([
  'update:modelValue',
  'debounce',
  'input',
]);

let timeout;
const debounce = (fn, delay) => {
  clearTimeout(timeout);
  timeout = setTimeout(fn, delay);
};

const handleInput = (e) => {
  // v-model value update
  emits('input', e.target.value);
  emits('update:modelValue', e.target.value);
  // debounce event
  debounce(() => emits('debounce', e.target.value), props.debounceDelay);
};
</script>

<style lang="scss" scoped>
.input {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  outline: none;
  width: 100%;
  padding: var(--space-1) var(--space-4);
  font-size: var(--text-md);
  color: var(--color-text);
  font-family: 'Inter', sans-serif;

  &::placeholder {
    color: #A0A0A0;
    font-size: var(--text-sm);
    font-weight: 300;
  }
}
</style>
