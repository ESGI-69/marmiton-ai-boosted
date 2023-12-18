
<template>
  <div class="allergies">
    <div class="allergies__tags">
      <Tag
        v-for="allergy in allergies"
        :key="allergy"
        :is-active="true"
        @close="authStore.removeAllergy(allergy)"
      >
        {{ allergy }}
      </Tag>
    </div>
    <div class="allergies__add">
      <Input
        v-model="newAllergy"
        placeholder="Ajouter une alergie"
        :is-loading="authStore.isRemoveAllergyLoading"
      />
      <Button
        :is-loading="authStore.isAddAllergyLoading"
        @click="authStore.addAllergy(newAllergy)"
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
const newAllergy = ref('');

defineProps({
  allergies: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.allergies {
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
