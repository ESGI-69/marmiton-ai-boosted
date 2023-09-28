
<template>
  <main class="container">
    <section class="searchbar">
      <SearchBar />
    </section>
    <section class="section">
      <h2 class="section__title">
        Recommendations
      </h2>
    </section>
    <section>
      <h2 class="section__title">
        Recettes de saison 🍁
      </h2>
      <p class="section__description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat cum impedit autem sint quis dolorum,
        repellendus
        veniam possimus repudiandae excepturi deserunt iure obcaecati reprehenderit odit? Veniam doloribus voluptates
        labore
        incidunt.
      </p>
    </section>
  </main>
</template>

<script setup>
import SearchBar from '@/components/RecipesSearchBar.vue';
</script>


<style lang="scss" scoped>
.searchbar {
  margin-bottom: 5rem;
}

.section {
  margin-bottom: 5rem;

  &__title {
    font-size: var(--text-xl);
    margin-bottom: var(--space-4);
    font-weight: 600;
  }

  &__description {
    font-size: var(--text-sm);
    margin-bottom: var(--space-4);
    color: var(--color-text-secondary);
  }
}
</style>
