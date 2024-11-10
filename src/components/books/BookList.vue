<script setup>
import BookCard from "@/components/books/BookCard.vue";

const props = defineProps({
  bookList: Array,
  favoriteList: Array,
})

const calculateFavorite = (bookId) => {
  return props.favoriteList.some(favRecord => favRecord.bookId === bookId || favRecord.id === bookId)
}

</script>

<template>
  <div
      
      class="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:gap-4 gap-2 w-full">
    <BookCard v-for="(book, index) in props.bookList"
              :key="book.id"
              :book="book"
              :isFavorite="calculateFavorite(book.id)"
              :style="{animationDelay: `${index % 16 * 100}ms`}">
    </BookCard>
  </div>
</template>

<style scoped>

</style>