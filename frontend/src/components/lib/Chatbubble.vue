<template>
  <div
    class="chat-bubble"
    :class="side"
  >
    <div class="chat-bubble__bubble">
      <LoadingCircle v-if="isLoading" />
      {{ text }}
    </div>
    <span class="chat-bubble__sender">{{ sender }}</span>
  </div>
</template>

<script setup>
import LoadingCircle from '../LoadingCircle.vue';

defineProps({
  text: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    default: 'left',
  },
  sender: {
    type: String,
    default: 'Unknown',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.chat-bubble {
  display: flex;
  flex-direction: column;
  max-width: 90%;

  &__bubble {
    position: relative;
    padding: 10px 20px;
    border-radius: 20px;
    color: var(--color-text);
    background-color: var(--color-background-soft);
    word-break: break-word;
  }

  &__sender {
    font-size: 0.8rem;
    color: var(--color-text-soft);
    margin-bottom: 0.5rem;
  }
}

.left.chat-bubble {
  align-self: flex-start;
  align-items: flex-start;

  .chat-bubble__bubble {
    border-bottom-left-radius: 0;
  }

  .chat-bubble__sender {
    text-align: left;

  }
}

.right.chat-bubble {
  align-self: flex-end;
  align-items: flex-end;

  .chat-bubble__bubble {
    color: var(--color-white);
    background-color: var(--color-primary);
    border-bottom-right-radius: 0;
  }

  .chat-bubble__sender {
    text-align: right;

  }
}
</style>
