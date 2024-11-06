<script setup>

import BookCard from "@/components/books/BookCard.vue";

const props = defineProps({
  bookList: Array,
})

</script>

<template>
  <div
      :style="{gridAutoRows: '1fr'}"
      class="grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 2xl:gap-4 gap-2 w-full">
    <BookCard v-for="(book, index) in props.bookList"
              :key="book.id"
              :book="book"
              :style="{animationDelay: `${index % 16 * 100}ms`}">
    </BookCard>
  </div>
</template>

<style scoped>

</style>