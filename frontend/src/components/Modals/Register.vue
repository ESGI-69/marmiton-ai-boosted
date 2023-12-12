<template>
  <div class="register-modal">
    <form
      class="register-modal__form"
      @submit.prevent="register"
    >
      <label for="username">Username</label>
      <Input
        id="username"
        v-model="username"
        type="username"
      />
      <label for="name">Name</label>
      <Input
        id="name"
        v-model="name"
        type="name"
      />
      <label for="password">Password</label>
      <Input
        id="password"
        v-model="password"
        type="password"
      />
      <Button
        :is-loading="authStore.isRegisterLoading"
        type="submit"
      >
        Register
      </Button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

import Input from '@/components/lib/Input.vue';
import Button from '@/components/lib/Button.vue';

const emit = defineEmits([ 'close', 'open-login' ]);

const authStore = useAuthStore();

const username = ref('');
const name = ref('');
const password = ref('');

const register = async () => {
  if (authStore.isRegisterLoading) return;
  await authStore.register({ username: username.value, name: name.value, password: password.value });
  emit('close');
};
</script>

<style lang="scss" scoped>
.register-modal {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__form {
    display: flex;
    flex-direction: column;
    width: 250px;
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
}
</style>
