<script setup>
import {useRoute} from "vue-router";
import {onBeforeMount, ref} from "vue";
import BooksAPI from "@/apis/BooksAPI.js";
import {toast} from "vue3-toastify";
import {useLoading} from "@/components/loading/useLoading.js";
import Container from "@/components/Container.vue";

const route = useRoute()
const loading = useLoading()
const bookId = route.params.id;

const book = ref()

const fetchBookData = async () => {
  loading.showLoading()
  try {
    const response = await BooksAPI.getBookById(bookId)
    if (response.status === 200) {
      book.value = response.data
      console.log(book.value)
    }
  } catch (_) {
    toast.error("Не удалось получить данные о книге")
  } finally {
    loading.hideLoading()
  }
}

const openGoogleBooksPage = () => {
  (book.value.saleInfo.saleability === 'FOR_SALE' &&
      book.value.saleInfo.buyLink) &&
  window.open(book.value.saleInfo.buyLink, '_blank').focus()
}

const openPreviewPage = () => {
  (book.value.accessInfo &&
      book.value.accessInfo.webReaderLink) &&
  window.open(book.value.accessInfo.webReaderLink, '_blank').focus()
}

onBeforeMount(async _ => {
  await fetchBookData()
})

</script>

<template>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] bg-[#101415]">
    <Container>
      <div v-if="book" class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] py-4 md:py-8
                  flex flex-col md:gap-4 gap-2 text-white leading-none">
        <div class="flex md:gap-4 gap-2 w-full md:h-[15rem] h-fit">
          <div
              class="overflow-x-hidden flex flex-col justify-between gap-4 md:p-4 p-2 basis-full md:rounded-xl rounded-md bg-black/60">
            <div class="flex flex-col md:gap-6 gap-4">
              <div class="flex gap-2">
                <img v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail"
                     :src="book.volumeInfo.imageLinks.thumbnail"
                     alt=""
                     class="md:hidden h-[5rem] object-cover object-center">
                <div class="flex flex-col md:gap-2.5 gap-1.5">
                  <span v-if="book" class="font-medium md:text-[38px] text-[24px]">{{ book.volumeInfo.title }}</span>
                  <span v-if="book" class="md:text-[22px] text-[16px] text-[#d4a26f]">{{
                      book.volumeInfo.authors.join(', ')
                    }}</span>
                  <span v-if="book" class="md:text-[16px] text-[14px] text-neutral-400">
                {{ book.volumeInfo.publishedDate }} ·
              {{ book.volumeInfo.publisher }}</span>
                </div>
              </div>
              <div
                  class="flex gap-4 md:text-[16px] text-[14px] overflow-x-auto no-scrollbar overflow-y-hidden text-center">
                <div class="flex flex-col gap-1 items-center">
                  <div class="flex gap-1">
                    {{ book.volumeInfo.averageRating ? book.volumeInfo.averageRating : '0' }}
                    <i class="bi bi-star-fill"></i>
                  </div>
                  <span>на&nbsp;Google&nbsp;Books</span>
                </div>
                <div class="w-px h-full bg-neutral-500"/>
                <div class="flex flex-col gap-1 items-center">
                  <span>{{ book.volumeInfo.pageCount }}</span>
                  <span>страниц</span>
                </div>
                <div v-if="book.volumeInfo.maturityRating" class="w-px h-full bg-neutral-500"/>
                <div v-if="book.volumeInfo.maturityRating" class="flex flex-col gap-1 items-center">
                  <i :class="book.volumeInfo.maturityRating === 'NOT_MATURE' ?
                'bi-explicit' : 'bi-explicit-fill'" class="bi"></i>
                  <span>{{
                      book.volumeInfo.maturityRating === 'NOT_MATURE' ?
                          'Безопасный контент' : 'С&nbsp;ограничениями'
                    }}</span>
                </div>
                <div v-if="book.saleInfo.saleability" class="w-px h-full bg-neutral-500"/>
                <div v-if="book.saleInfo.saleability" class="flex flex-col gap-1 items-center">
                  <i class="bi bi-globe"></i>
                  <div>{{
                      book.saleInfo.saleability === 'FOR_SALE' ?
                          'Доступно к приобретению' : 'Недоступно в вашей стране'
                    }}
                  </div>
                </div>
                <div v-if="book.saleInfo.isEbook && book.saleInfo.isEbook === true" class="w-px h-full bg-neutral-500"/>
                <div v-if="book.saleInfo.isEbook && book.saleInfo.isEbook === true"
                     class="flex flex-col gap-1 items-center">
                  <i class="bi bi-journal-bookmark-fill"></i>
                  <span>Электронная книга</span>
                </div>
              </div>
            </div>
            <div
                class="flex md:flex-row flex-col gap-2 p-[1px] *:h-full *:md:w-fit *:w-full overflow-x-auto no-scrollbar overflow-y-visible">
              <button :disabled="book.saleInfo.saleability !== 'FOR_SALE'"
                      class="text-white select-none hover:enabled:bg-opacity-50 hover:enabled:text-opacity-70
                      active:enabled:scale-[95%] cursor-pointer transition-all ease-out px-3 py-2
                      text-[16px] rounded-md
                      bg-[#d4a26f] disabled:bg-[#d4a26f]/50 disabled:cursor-not-allowed"
                      @click.prevent.stop="openGoogleBooksPage">
                {{
                  book.saleInfo.saleability === 'FOR_SALE' ?
                      `Купить&nbsp;за ${book.saleInfo.listPrice.amount}₸` :
                      'Недоступно к приобретению'
                }}
              </button>
              <button v-if="book.accessInfo && book.accessInfo.webReaderLink"
                      class="select-none
                      active:scale-[95%] cursor-pointer transition-all ease-out px-3 py-2
                      text-[16px] rounded-md
                      bg-transparent hover:bg-[#d4a26f]/20 text-[#d4a26f] ring-neutral-600 ring-1"
                      @click.prevent.stop="openPreviewPage">
                Предпросмотр
              </button>
            </div>
          </div>
          <div
              class="select-none pointer-events-none overflow-hidden hidden md:block relative basis-1/3 md:rounded-xl rounded-md bg-black/60">
            <img v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail"
                 :src="book.volumeInfo.imageLinks.thumbnail"
                 alt="Thumbnail"
                 class="size-full object-cover object-center brightness-[70%] blur-[8px]">
            <img :src="book.volumeInfo.imageLinks.thumbnail"
                 alt=""
                 class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 object-cover h-[80%]">
          </div>
        </div>
        <div
            class="flex items-center justify-center text-[20px] py-2 md:gap-4 gap-2 min-h-fit w-full md:rounded-xl rounded-md bg-black/60">
          -&nbsp;&nbsp;Описание&nbsp;&nbsp;-
        </div>
        <div
            class="flex items-center justify-center text-[20px] py-2 md:gap-4 gap-2 min-h-fit w-full md:rounded-xl rounded-md bg-black/60">
          -&nbsp;&nbsp;Отзывы&nbsp;&nbsp;-
        </div>
      </div>
    </Container>
  </div>
</template>

<style scoped>

</style>