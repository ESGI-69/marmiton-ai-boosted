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
          <Chatbubble
            side="left"
            text="Bonjour, je suis un chatbot cuisinier comment puis-je vous aider ?"
            sender="Philippe Etchebot"
          />
          <Chatbubble
            v-for="prompt in prompts"
            :key="prompt.id"
            :side="prompt.role === 'user' ? 'right' : 'left'"
            :text="prompt.content"
            :sender="prompt.role === 'user' ? 'Vous' : 'Philippe Etchebot'"
          />
          <Chatbubble
            v-if="isChatbotLoading"
            side="left"
            text=" "
            sender="Philippe Etchebot"
            :is-loading="isChatbotLoading"
          />
        </div>
        <div class="chatbot__window__chat__input">
          <textarea
            v-model="userPrompt"
            class="chatbot__window__chat__input__textarea"
            :placeholder="isChatbotLoading ? 'Envoi en cours...' : 'Votre message...'"
            :disabled="isChatbotLoading"
            @keydown.enter.prevent="sendPrompt"
          />
          <Button
            :disabled="isChatbotLoading"
            @click="sendPrompt"
          >
            <IconSend class="chatbot__window__chat__input__send" />
          </Button>
        </div>
        <p
          v-if="isError"
          class="chatbot__error"
        >
          {{ errorMsg }}
        </p>
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
import { ref, onUpdated, nextTick, computed } from 'vue';
import IconOpenai from './icons/IconOpenai.vue';
import IconCloseCross from './icons/IconCloseCross.vue';
import IconSend from './icons/IconSend.vue';
import Button from './lib/Button.vue';
import Chatbubble from './lib/Chatbubble.vue';
import { useChatbotStore } from '@/stores/chatbotStore';

const chatbotStore = useChatbotStore();

const isOpen = ref(false);
const chatContainer = ref(null);
const prompts = ref([]);
const userPrompt = ref(null);
const isError = ref(false);
const errorMsg = ref('');

const isChatbotLoading = computed(() => chatbotStore.isChatbotLoading);
const lastChatbotResponse = computed(() => chatbotStore.chatbotResponse);

const scroolChatToBottom = () => {
  if (isOpen.value && chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const toggleChatbot = () => {
  isOpen.value = !isOpen.value;
};

onUpdated(() => {
  scroolChatToBottom();
});

const sendPrompt = async () => {
  if (!userPrompt.value) {
    isError.value = true;
    errorMsg.value = 'Veuillez saisir un message';
    return;
  }

  isError.value = false;
  prompts.value.push({ role: 'user', content: userPrompt.value });
  userPrompt.value = null;
  nextTick(() => {
    scroolChatToBottom();
  });

  await chatbotStore.postChatbotMessage(prompts.value);

  prompts.value.push(lastChatbotResponse.value);
  nextTick(() => {
    scroolChatToBottom();
  });

};
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
      background-color: var(--color-text);
    }

    &__openai,
    &__close {
      color: var(--color-white);
      backface-visibility: hidden;
      transition: transform 0.6s;

      &--invisible {
        display: none;
      }
    }
  }

  &__window {
    width: 400px;
    height: 550px;
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

      &__input {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        margin-bottom: 0.5rem;

        &__textarea {
          resize: none;
          width: 100%;
          padding: 0.25rem;
        }

        &__send {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }

  &__error {
    color: var(--color-error);
    font-size: 0.8rem;
    margin-top: 0.5rem;
    position: absolute;
    bottom: 0;
    bottom: 0.25rem;
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
