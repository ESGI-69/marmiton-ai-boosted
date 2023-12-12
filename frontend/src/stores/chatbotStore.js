import { defineStore } from 'pinia';

import api from '@/plugins/axios';

export const useChatbotStore = defineStore('chatbotStore', {
  state: () => ({
    chatbotResponse: {},
    isChatbotLoading: false,
  }),

  actions: {
    async postChatbotMessage(prompts) {
      this.isChatbotLoading = true;
      try {
        const { data } = await api.post('/chatbot', { prompts });
        this.chatbotResponse = data;
        return;
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isChatbotLoading = false;
      }
    },
  },
});
