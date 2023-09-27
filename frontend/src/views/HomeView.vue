
<template>
  <main>
    <h1>
      Home
    </h1>
    <SearchBar />
    <Filters />
    <div>
      <span>Home > Breadcrumb</span>
      <Dropdown>
        <template #toggler>
          <button>Menu</button>
        </template>
        <DropdownList>
          <DropdownListItem>Test</DropdownListItem>
          <DropdownListItem>Test</DropdownListItem>
          <DropdownListItem>Test</DropdownListItem>
        </DropdownList>
      </Dropdown>
    </div>
  </main>
</template>

<script setup>
import Filters from '@/components/Filters.vue';
import SearchBar from '@/components/lib/SearchBar.vue';
import Dropdown from '@/components/lib/Dropdown.vue';
import DropdownList from '@/components/lib/DropdownList.vue';
import DropdownListItem from '@/components/lib/DropdownListItem.vue';
</script>
