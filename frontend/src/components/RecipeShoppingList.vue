<template>
  <div class="share-container">
    <Button @click="shareFacebook">
      Facebook
    </Button>
    <Button @click="shareTwitter">
      Twitter
    </Button>
    <Button @click="copyToClipboard">
      Copie dans le press-papier
    </Button>
    <Button @click="downloadFile">
      Télécharge le fichier
    </Button>
  </div>
  <span
    v-if="isCopied"
    class="copy-notification"
  >
    Copié !
  </span>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import Button from './lib/Button.vue';

const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
  },
});

const isCopied = ref(false);

const formatShoppingList = () => props.ingredients.map(i => `- ${i.name}: ${i.quantity}`).join('\n');
const formatShoppingListCheckBox = () => props.ingredients.map(i => `- [ ] ${i.name}: ${i.quantity}`).join('\n');

const shareFacebook = () => {
  const shoppingList = formatShoppingList();
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(document.location.href)}&quote=${encodeURIComponent(`Checkout my shopping list : ${shoppingList} ! From :`)}`;
  shareThirdParty(url);
};

const shareTwitter = () => {
  const shoppingList = formatShoppingList();
  const url = `https://twitter.com/share?url=${encodeURIComponent(document.location.href)}&text=${encodeURIComponent(`Checkout my shopping list : ${shoppingList} ! From :`)}`;
  shareThirdParty(url);
};

const shareThirdParty = (url) => {
  window.open(url, '_blank');
};

const copyToClipboard = () => {
  const text = formatShoppingListCheckBox();
  navigator.clipboard.writeText(text);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 4000);
};

const downloadFile = () => {
  const text = formatShoppingListCheckBox();
  const blob = new Blob([ text ], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'shopping-list.txt';
  link.click();
  URL.revokeObjectURL(url);
};
</script>

<style lang="scss" scoped>
.share-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--space-4);
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}
</style>
