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
        type="text"
        autocomplete="username"
      />
      <label for="password">Password</label>
      <Input
        id="password"
        v-model="password"
        type="password"
        autocomplete="current-password"
      />
      <span
        v-if="error"
        class="login-modal__form__error"
      >
        Wrong credentials
      </span>
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
      @click="switchToRegister"
    >
      Register
    </Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useModal } from 'vue-final-modal';

import Button from '@/components/lib/Button.vue';
import Input from '@/components/lib/Input.vue';
import Modal from '@/components/lib/Modal.vue';
import Register from '@/components/Modals/Register.vue';

const emit = defineEmits([ 'close' ]);

const authStore = useAuthStore();

const error = ref(false);

const username = ref('');
const password = ref('');

const login = async () => {
  if (authStore.isLoginLoading) return;
  error.value = false;
  try {
    await authStore.login({ username: username.value, password: password.value });
    emit('close');
  } catch (e) {
    error.value = true;
  }
};

const switchToRegister = () => {
  registerModal.open();
};

const registerModal = useModal({
  component: Modal,
  attrs: {
    title: 'Happy to see you here!',
    onClose: () => registerModal.close(),
  },
  slots: {
    default: {
      component: Register,
      attrs: {
        onClose: () => registerModal.close(),
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.login-modal {
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
    &__error {
      text-align: center;
      color: var(--color-danger);
      font-size: var(--text-sm);
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
