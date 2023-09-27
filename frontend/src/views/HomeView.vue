
<template>
  <main>
    <SearchBar />
    <Filters />
    <div>
      <Breadcrumb />
      <Dropdown>
        <template #toggler>
          <Button type="light">
            Dropdown
          </Button>
        </template>
        <DropdownList>
          <DropdownListItem>Test</DropdownListItem>
          <DropdownListItem>Test</DropdownListItem>
          <DropdownListItem>Test</DropdownListItem>
        </DropdownList>
      </Dropdown>
      <StarRating :rating="3" />
    </div>
  </main>
</template>

<script setup>
import Filters from '@/components/Filters.vue';
import SearchBar from '@/components/lib/SearchBar.vue';
import Dropdown from '@/components/lib/Dropdown.vue';
import DropdownList from '@/components/lib/DropdownList.vue';
import DropdownListItem from '@/components/lib/DropdownListItem.vue';
import Button from '@/components/lib/Button.vue';
import Breadcrumb from '@/components/lib/Breadcrumb.vue';
import StarRating from '@/components/lib/StarRating.vue';
</script>
