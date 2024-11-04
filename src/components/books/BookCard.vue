<script setup>
const props = defineProps({
  book: Object
})
</script>

<template>
  <div class="h-48 p-4 ring-2 ring-[#d4a26f] rounded-lg grid place-content-center place-items-center
         text-white text-center select-none w-full animate-fade-up animate-ease-out">
    {{ book.volumeInfo.title }}
  </div>
</template>

<style scoped>

</style>