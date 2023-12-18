<template>
  <div class="share-container">
    <Button @click="shareFacebook">
      Share on Facebook
    </Button>
    <Button @click="shareTwitter">
      Share on Twitter
    </Button>
    <Button @click="copyToClipboard">
      Copy to Clipboard
    </Button>
    <Button @click="downloadFile">
      Download File
    </Button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Button from './lib/Button.vue';


const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
  },
});

const formatShoppingList = () => props.ingredients.map(i => `- ${i.name}: ${i.quantity}`).join('\n');

const shareFacebook = () => {
  const shoppingList = formatShoppingList();
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://marmiton.bliblablou.day/')}&quote=${encodeURIComponent(`Checkout my shopping list : ${shoppingList} ! From :`)}`;
  window.open(url, '_blank');
};

const shareTwitter = () => {
  const shoppingList = formatShoppingList();
  const url = `https://twitter.com/share?url=${encodeURIComponent(document.location.href)}&text=${encodeURIComponent(`Checkout my shopping list : ${shoppingList} ! From :`)}`;
  window.open(url, '_blank');
};

const copyToClipboard = () => {
  const text = props.ingredients.map(i => `- [ ] ${i.name}: ${i.quantity}`).join('\n');
  navigator.clipboard.writeText(text);
};

const downloadFile = () => {
  const text = props.ingredients.map(i => `- [ ] ${i.name}: ${i.quantity}`).join('\n');
  const blob = new Blob([ text ], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'shopping-list.md';
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
}
</style>
