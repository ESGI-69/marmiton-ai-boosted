
<template>
  <div class="non-liked-ingredient">
    <div class="non-liked-ingredient__tags">
      <Tag
        v-for="nonLikedIngredient in nonLikedIngredients"
        :key="nonLikedIngredient"
        :is-active="true"
        @close="authStore.removeNonLikedIngredient(nonLikedIngredient)"
      >
        {{ nonLikedIngredient }}
      </Tag>
    </div>
    <div class="non-liked-ingredient__add">
      <Input
        v-model="newNonLikedIngredient"
        placeholder="Ajouter un alliment que vous n'aimez pas"
        :is-loading="authStore.isRemoveNonLikedIngredientsLoading"
      />
      <Button
        :is-loading="authStore.isAddNonLikedIngredientsLoading"
        @click="authStore.addNonLikedIngredient(newNonLikedIngredient)"
      >
        +
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/lib/Button.vue';
import Input from '@/components/lib/Input.vue';
import Tag from '@/components/lib/Tag.vue';

const authStore = useAuthStore();
const newNonLikedIngredient = ref('');

defineProps({
  nonLikedIngredients: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.non-liked-ingredient {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2)
  }

  &__add {
    display: flex;
    gap: 1rem;

    input {
      width: 300px;
    }
  }
}
</style>
