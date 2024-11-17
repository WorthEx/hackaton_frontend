<script setup>
import {inject, onMounted, ref} from "vue";
import Container from "@/components/Container.vue";
import BookList from "@/components/books/BookList.vue";
import FavoritesAPI from "@/apis/FavoritesAPI.js";
import {toast} from "vue3-toastify";
import BooksAPI from "@/apis/BooksAPI.js";

const {loggedIn} = inject('loggedIn')

const {favoriteList} = inject('favoriteList')

const favoriteBookList = ref([])
const loading = ref(false)

const fetchFavoritesIds = async () => {
  try {
    const response = await FavoritesAPI.getFavorites()
    if (response.status === 200) {
      favoriteList.value = response.data;
      return favoriteList.value
    }
  } catch (_) {
    toast.error("Не удалось получить список избранного")
  }
}

const fetchFavoriteBooks = async () => {
  loading.value = true
  const favoriteIdObjects = await fetchFavoritesIds();
  let favoriteIds = favoriteIdObjects.map(bookObject => bookObject.bookId)
  if(favoriteIds.length < 1){
    loading.value = false
    return
  }
  let books = []
  for (const id of favoriteIds) {
    const response = await BooksAPI.getBookById(id)
    if (response.status === 200) {
      books.push(response.data)
    }
  }
  favoriteBookList.value = books;
  loading.value = false
}

onMounted(async _ => {
  if (loggedIn.value) {
    await fetchFavoriteBooks()
  }
})
</script>

<template>
  <div
      :class="!loggedIn && 'grid place-content-center place-items-center px-8'"
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] pb-4 md:pb-10">
    <div v-if="!loggedIn" class="text-white text-center select-none font-light
    md:text-[22px] text-[14px]">
      Войдите в аккаунт, чтобы просмотреть список избранного.
    </div>
    <div v-else class="flex flex-col">
      <div
          class="size-full bg-[#101415] md:gap-10 pt-2 md:pt-4 2xl:pt-10 select-none">
        <Container>
          <div class="text-white font-bold md:text-[32px] text-[22px] mt-2">Избранное</div>
          <div class="md:h-4 h-2"></div>
          <div v-if="loading"
               class="size-full flex flex-col gap-2 items-center justify-center">
            <svg class="size-[40px] md:size-[60px]" viewBox="0 0 200 200"
                 xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="65" fill="#ffffff" r="10" stroke="#ffffff" stroke-width="2">
                <animate attributeName="cy" begin="-.4" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                         repeatCount="indefinite" values="65;135;65;"></animate>
              </circle>
              <circle cx="100" cy="65" fill="#ffffff" r="10" stroke="#ffffff" stroke-width="2">
                <animate attributeName="cy" begin="-.2" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                         repeatCount="indefinite" values="65;135;65;"></animate>
              </circle>
              <circle cx="160" cy="65" fill="#ffffff" r="10" stroke="#ffffff" stroke-width="2">
                <animate attributeName="cy" begin="0" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                         repeatCount="indefinite" values="65;135;65;"></animate>
              </circle>
            </svg>
            <span class="text-white font-light md:text-[24px] text-[16px]">Загрузка</span>
          </div>
          <div class="size-full flex flex-col gap-2 items-center justify-center text-white text-center select-none font-light
    md:text-[22px] text-[14px]"
          v-else-if="!loading && favoriteList.length === 0">
          <span>Ваш список избранного пуст</span>
          </div>
          <BookList v-else :bookList="favoriteBookList" :favoriteList="favoriteList"/>
        </Container>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>