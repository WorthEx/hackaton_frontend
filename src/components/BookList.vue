<script setup>

const props = defineProps({
  bookList: {
    type: Array,
  }
})

</script>

<template>
  <div
      class="grid grid-cols-3 gap-4">
    <div v-for="book in props.bookList"
         :key="book.id"
         class="h-48 p-4 ring-2 ring-[#d4a26f] rounded-lg grid place-content-center place-items-center text-white text-center select-none">
      {{ book.volumeInfo.title }}
    </div>
  </div>
</template>

<style scoped>

</style>