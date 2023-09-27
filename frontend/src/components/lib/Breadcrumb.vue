<template>
  <nav class="breadcrumb">
    <ol class="breadcrumb__list">
      <li class="breadcrumb__list__item">
        <RouterLink to="/">
          Home
        </RouterLink>
      </li>
      <li
        v-for="crumb in crumbs"
        :key="crumb.name"
        class="breadcrumb__list__item"
      >
        <RouterLink :to="crumb.to">
          {{ crumb.name }}
        </RouterLink>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const crumbs = computed(() => {
  const paths = route.path.split('/').filter((path) => path);
  return paths.map((path, index) => ({
    name: path.charAt(0).toUpperCase() + path.slice(1),
    to: `/${paths.slice(0, index + 1).join('/')}`,
  }));
});
</script>

<style lang="scss" scoped>
.breadcrumb {
  &__list {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    &__item {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      &:before {
        content: '-';
        margin-right: var(--space-2);
      }
      &:first-child {
        &::before {
          content: '';
          margin-right: 0;
        }
      }
    }
  }
}
.router-link-active {
  color: var(--color-text);
}
</style>
