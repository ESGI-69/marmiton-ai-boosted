<template>
  <div class="loader-wrapper">
    <span class="loader">{{ randomSentence.replaceAll('\"', '') }}</span>
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue';
import { useRecipeStore } from '@/stores/recipeStore';
import { useRouter } from 'vue-router';

const recipeStore = useRecipeStore();
const router = useRouter();

watchEffect(() => {
  if (recipeStore.isGenerateRecipeLoading === false && recipeStore.recipe.id) {
    router.push({ name: 'recipe', params: { id: recipeStore.recipe.id } });
  }
});

const sentenses = [
  '"Remuez-vous les méninges pendant que nous remuons les casseroles : la recette parfaite est en cours de gestation !"',
  '"Attendez-vous à un délicieux dénouement: l\'IA mijote quelque chose de très appétissant !"',
  '"Nos algorithmes culinaires sont en ébullition, mais rassurez-vous, pas de débordement à signaler (pour l\'instant)."',
  '"Pendant que l\'IA chauffe, profitez-en pour préparer mentalement vos papilles à une explosion de saveurs !"',
  '"Cuisson en cours : l\'IA fait fondre les frontières entre la gourmandise et l\'excès. Préparez-vous à une expérience culinaire où l\'unique limite est votre appétit (et peut-être la taille de votre assiette) !"',
];

const randomSentence = computed(() => sentenses[Math.floor(Math.random() * sentenses.length)]);
</script>

<style lang="scss" scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 5rem;
}
.loader {
  text-align: center;
  font-size: 2.5rem;
  display: inline-block;
  line-height: 3rem;
  font-weight: bold;
  color: var(--color-primary);
  letter-spacing: 2px;
  position: relative;
  box-sizing: border-box;

  &::after {
    content: v-bind(randomSentence);
    position: absolute;
    left: 0;
    top: 0;
    color: var(--color-border);
    text-shadow: 0 0 2px var(--color-primary), 0 0 1px var(--color-primary), 0 0 1px var(--color-primary);
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    animation: animloader 30s linear forwards;
  }
}

@keyframes animloader {
  0% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
}
</style>
