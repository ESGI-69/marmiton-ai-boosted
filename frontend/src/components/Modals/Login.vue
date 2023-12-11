<template>
  <div class="login-modal">
    <form
      class="login-modal__form"
      @submit.prevent="login"
    >
      <label for="username">Username</label>
      <Input
        id="username"
        v-model="username"
        type="username"
      />
      <label for="password">Password</label>
      <Input
        id="password"
        v-model="password"
        type="password"
      />
      <Button
        :is-loading="authStore.isLoginLoading"
        type="submit"
      >
        Login
      </Button>
    </form>
    <div
      class="login-modal__register-hint"
    >
      You don't have an acount ?
    </div>
    <Button
      type="light"
    >
      Register
    </Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

import Input from '@/components/lib/Input.vue';
import Button from '@/components/lib/Button.vue';

const emit = defineEmits([ 'close' ]);

const authStore = useAuthStore();

const username = ref('');
const password = ref('');

const login = async () => {
  if (authStore.isLoginLoading) return;
  await authStore.login({ username: username.value, password: password.value });
  emit('close', false);
};
</script>

<style lang="scss" scoped>
.login-modal {
  display: flex;
  flex-direction: column;
  width: 250px;

  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: var(--space-4) 0;

    label {
      font-size: var(--text-sm);
      font-weight: 600;
    }

    input {
      margin-top: var(--space-1);
      margin-bottom: var(--space-4);
    }
  }

  &__register-hint {
    text-align: center;
    font-size: var(--text-sm);
    margin-bottom: var(--space-4);
  }
}
</style>
