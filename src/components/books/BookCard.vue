<script setup>
const props = defineProps({
  book: Object
})
</script>

<template>
  <div class="bg-[#101415]
  ring-1 ring-[#d4a26f]/20 hover:ring-[#d4a26f] rounded-lg
  flex flex-col relative overflow-hidden *:w-full
  text-white select-none
  animate-fade-up animate-ease-out hover:shadow-[0px_0px_30px_0px_rgba(212,162,111,1)] transition-all duration-[250ms] ease-out">
    <div v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail"
         class="relative h-[60%] overflow-hidden">
      <img :src="book.volumeInfo.imageLinks.thumbnail"
           alt="" class="w-full sm:h-[20rem] h-[10rem] object-cover object-center brightness-[70%] blur-[8px]">
      <img :src="book.volumeInfo.imageLinks.thumbnail"
           alt="" class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 object-cover sm:h-[80%] h-full">
    </div>
    <div v-else=""
         class="bg-neutral-700 animate-pulse animate-duration-[8s] relative h-[60%] overflow-hidden
         grid place-content-center place-items-center">
      <i class="bi bi-ban leading-none color-white/50 text-[80px]"></i>
    </div>
    <div class="h-[40%] p-2 leading-none">
      <span class="md:text-[20px] text-[16px] text-white/80">
        {{ book.volumeInfo.title }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>