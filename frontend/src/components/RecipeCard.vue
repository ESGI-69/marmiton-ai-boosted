<template>
  <div
    class="recipe-card"
    :class="{
      'recipe-card--can-generate': canGenerate,
    }"
    @click="handleClick"
  >
    <img
      class="recipe-card__image"
      :src="imageUrl"
    >
    <div class="recipe-card__content">
      <h1 class="recipe-card__content__title">
        {{ title }}
      </h1>
      <p class="recipe-card__content__description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRecipeStore } from '@/stores/recipeStore';
import { useModal } from 'vue-final-modal';
import Modal from '@/components/lib/Modal.vue';
import Login from '@/components/Modals/Login.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const recipieStore = useRecipeStore();

const loginModal = useModal({
  component: Modal,
  attrs: {
    title: 'Welcome back!',
    onClose: () => loginModal.close(),
  },
  slots: {
    default: {
      component: Login,
      attrs: {
        onClose: () => loginModal.close(),
      },
    },
  },
});

const props = defineProps({
  imageUrl: {
    type: String,
    default: 'https://placedog.net/144/144',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  canGenerate: {
    type: Boolean,
    default: false,
  },
});

const handleClick = () => {
  if (props.canGenerate) {
    if (!authStore.isLogged) {
      loginModal.open();
      return;
    }
    recipieStore.generateRecipe(props.title);
    router.push({ name: 'generate-loading' });
  }
};
</script>

<style lang="scss" scoped>
.recipe-card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border-radius: var(--space-2);
  overflow: hidden;
  box-shadow: var(--box-shadown);
  width: 100%;

  &--can-generate {
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 0 1px var(--color-primary);
    }
  }

  &__image {
    width: 100%;
    box-shadow: var(--box-shadown);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-2);

    &__title {
      width: 100%;
      font-size: var(--text-md);
      font-weight: bold;
    }

    &__description {
      color: var(--color-text-secondary);
      font-size: var(--text-sm);
      font-weight: 400;
    }
  }
}
</style>
