<template>
  <div class="chatbot">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="chatbot__window"
      >
        <div
          ref="chatContainer"
          class="chatbot__window__chat"
        >
          <div class="chatbot__window__chat__bubble_ia">
            Je suis un chatbot cuisinier, comment puis-je vous aider ?
          </div>
          <div class="chatbot__window__chat__bubble_user">
            Je suis un chatbot cuisinier, comment puis-je vous aiddsqdsqer ?
          </div>
          <div class="chatbot__window__chat__bubble_user">
            Je suis un chatbot cuisinier, comment puis-je vous aiddsqdsqer ?
          </div>
          <div class="chatbot__window__chat__bubble_user">
            Je suis un chatbot cuisinier, comment puis-je vous aiddsqdsqer ?
          </div>
          <div class="chatbot__window__chat__bubble_user">
            Je suis un chatbot cuisinier, comment puis-je vous aiddsqdsqer ?
          </div>
          <div class="chatbot__window__chat__bubble_user">
            Je suis un chatbot cuisinier, comment puis-je vous aiddsqdsqer ?
          </div>
        </div>
        <div class="chatbot__window__chat__input">
          <textarea
            class="chatbot__window__chat__input__textarea"
            placeholder="Votre message"
          />
          <Button>Envoyer</Button>
        </div>
      </div>
    </Transition>

    <button
      class="chatbot__button"
      :class="{ 'chatbot__button--open': isOpen }"
      @click="toggleChatbot"
    >
      <IconOpenai
        class="chatbot__button__openai"
        :class="{ 'chatbot__button__openai--invisible': isOpen }"
      />
      <IconCloseCross
        class="chatbot__button__close"
        :class="{ 'chatbot__button__close--invisible': !isOpen }"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, onUpdated } from 'vue';
import IconOpenai from './icons/IconOpenai.vue';
import IconCloseCross from './icons/IconCloseCross.vue';
import Button from './lib/Button.vue';

const isOpen = ref(false);
const chatContainer = ref(null);

function toggleChatbot() {
  isOpen.value = !isOpen.value;
}

onUpdated(() => {
  if (isOpen.value && chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
});
</script>

<style scoped lang="scss">
.chatbot {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 1rem;
  z-index: 1;

  &__button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: var(--color-primary-light);
    }

    &--visible:hover {
      background-color: red;
    }

    &__openai,
    &__close {
      color: var(--color-white);
      backface-visibility: hidden;
      transition: transform 0.6s;
      &--invisible {
        transform: rotateY(180deg);
        display: none;
      }
    }
  }

  &__window {
    width: 300px;
    height: 400px;
    position: absolute;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background-color: var(--color-white);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: auto;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &__chat {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      gap: 1rem;
        &__input {
        display: flex;
        flex-direction: row;
      }
    }
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .3s ease;
  }
}
</style>
