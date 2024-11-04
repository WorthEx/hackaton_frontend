<script setup>

import BookCard from "@/components/books/BookCard.vue";

const props = defineProps({
  bookList: Array,
})

</script>

<template>
  <div
      class="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full">
    <BookCard v-for="(book, index) in props.bookList"
              :key="book.id"
              :book="book"
              :style="{animationDelay: `${index % 15 * 100}ms`}">
    </BookCard>
  </div>
</template>

<style scoped>

</style>