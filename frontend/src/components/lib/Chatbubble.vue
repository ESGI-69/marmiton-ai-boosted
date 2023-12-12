<template>
  <div
    class="chat-bubble"
    :class="side"
  >
    <div class="chat-bubble__bubble">
      <div
        v-if="isLoading"
        class="lds-ring"
      >
        <div />
        <div />
        <div />
        <div />
      </div>
      {{ text }}
    </div>
    <span class="chat-bubble__sender">{{ sender }}</span>
  </div>
</template>

<script setup>
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

.lds-ring {
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  border: 4px solid var(--color-text);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--color-text) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
