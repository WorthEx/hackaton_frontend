<script setup>
import {onBeforeMount, ref} from "vue";
import BooksAPI from "@/apis/BooksAPI.js";
import StarRating from 'vue-star-rating'

const props = defineProps({
  name: String,
  bookId: String,
  text: String,
  rating: Number,
  requireBookName: {
    type: Boolean,
    default: false
  },
})

const bookName = ref("")

onBeforeMount(async _ => {
  if (props.requireBookName) {
    try {
      const response = await BooksAPI.getBookById(props.bookId);
      if (response.status === 200) {
        bookName.value = response.data.volumeInfo.title
      }
    } catch (error) {
      console.log(error)
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-2 bg-white/5 ring-1 ring-[#d4a26f] ring-opacity-30 rounded-md md:p-3 p-2 pt-2
  md:text-[20px] text-[16px] overflow-hidden">
    <StarRating :rating="props.rating" :read-only="true" :show-rating="false" active-color="#d4a26f" star-size="18"/>
    <span class="text-white ">@{{ props.name }}</span>
    <p class="text-white/70 font-light">{{ props.text }}</p>
    <span v-if="bookName !== ''" class="text-white/20 italic line-clamp-3">({{
        bookName
      }})</span>
  </div>
</template>

<style scoped>

</style>