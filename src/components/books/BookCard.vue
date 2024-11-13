<script setup>
import StarRating from 'vue-star-rating'
import router from "@/router/index.js";
import {inject} from "vue";

const props = defineProps({
  book: Object,
  isFavorite: Boolean
})

const {addTofav, delFromFav} = inject('favoriteList')

const openGoogleBooksPage = async () => {
  (props.book.saleInfo.saleability === 'FOR_SALE' &&
      props.book.saleInfo.buyLink) &&
  window.open(props.book.saleInfo.buyLink, '_blank').focus()
}

const toBookPage = async () => {
  await router.push(`/book/${props.book.id}`)
}

const triggerAnimation = (element) => {
  element.classList.toggle('animate-rotate-y')
  element.classList.toggle('animate-ease-out')
  element.classList.toggle('animate-duration-[1400ms]')
}
</script>

<template>
  <div class="bg-[#101415]
  ring-1 ring-[#d4a26f]/20 hover:ring-[#d4a26f] rounded-xl
  flex flex-col relative overflow-hidden *:w-full
  text-white select-none
  animate-fade-up animate-ease-out hover:shadow-[0px_0px_30px_0px_rgba(212,162,111,1)] transition-all duration-[250ms] ease-out cursor-pointer"
       @click="toBookPage">
    <div v-if="props.book.volumeInfo.imageLinks && props.book.volumeInfo.imageLinks.thumbnail"
         class="relative overflow-hidden">
      <img :src="props.book.volumeInfo.imageLinks.thumbnail"
           alt="" class="w-full sm:h-[15rem] h-[10rem] object-cover object-center brightness-[70%] blur-[8px]">
      <img :src="props.book.volumeInfo.imageLinks.thumbnail"
           alt=""
           class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 object-cover sm:h-[80%] h-full rounded-lg">
      <i :class="isFavorite ? 'bi-heart-fill' : 'bi-heart'"
         class="bi absolute top-[20px] right-[20px] leading-none text-red-500 cursor-pointer transition-all"
         @click.stop.prevent="e => isFavorite ? (async _ => {
           await delFromFav(props.book.id)
           triggerAnimation(e.target)
         })() : (async _ => {
           await addTofav(props.book.id)
           triggerAnimation(e.target)
         })()"/>
    </div>
    <div v-else
         class="bg-neutral-700 animate-pulse animate-duration-[8s] relative h-[15rem] overflow-hidden
             grid place-content-center place-items-center">
      <i class="bi bi-ban leading-none color-white/50 text-[80px]"></i>
    </div>
    <div class="p-2 leading-none flex flex-col gap-4 relative">
      <div class="flex flex-col gap-[.25rem] min-h-fit md:h-[5em] h-[3em]">
        <StarRating
            :rating="book.volumeInfo && book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 0"
            :read-only="true"
            :rounded-corners="true"
            :show-rating="false" :star-size="15"/>
        <span class="md:text-[20px] text-[16px] font-medium leading-none text-white line-clamp-2">
        {{ book.volumeInfo.title }}
        </span>
        <span v-if="book.volumeInfo.authors"
              class="md:text-[18px] text-[14px] font-light leading-tight text-white/50 line-clamp-2">
        {{
            book.volumeInfo.authors.length > 2 ? book.volumeInfo.authors.slice(0, 2).join(", ") : book.volumeInfo.authors.join(", ")
          }}<span v-if="book.volumeInfo.authors.length > 2">...</span>
        </span>
        <span v-else class="md:text-[18px] text-[14px] font-light leading-tight text-white/50">
          - Авторы не указаны -
        </span>
      </div>
      <div class="md:text-[18px] text-[14px] font-normal leading-none text-white
                    bg-[#d4a26f] text-center md:py-3 py-2 rounded-lg cursor-pointer hover:bg-[#d4a26f]/80 transition-all"
           @click.prevent.stop="props.book.saleInfo.saleability === 'FOR_SALE' && props.book.saleInfo.listPrice.amount ?
                                openGoogleBooksPage() : toBookPage()">
        {{
          props.book.saleInfo.saleability === 'FOR_SALE' && props.book.saleInfo.listPrice.amount ?
              `${props.book.saleInfo.listPrice.amount} тг` : 'Подробнее'
        }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>