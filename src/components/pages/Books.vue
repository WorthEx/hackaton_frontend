<script setup>
import Container from "@/components/Container.vue";
import {computed, inject, onMounted, ref, watch} from "vue";
import BooksAPI from "@/apis/BooksAPI.js";
import BookList from "@/components/books/BookList.vue";
import {toast} from "vue3-toastify";
import string_constants from "@/string_constants.js";

const {loggedIn} = inject('loggedIn')

const queryText = ref("")
const persistentQuery = ref("")
const bookList = ref([])
const loading = ref(false)
const orderIndex = ref(1)

const {favoriteList, loadFavs} = inject('favoriteList')

const order = computed(
    _ => string_constants.order[
        Object.keys(string_constants.order)[orderIndex.value % Object.entries(string_constants.order).length]
        ]
)

const queryInput = ref()

const findBooks = async (query, startIndex) => {
  queryInput.value.blur()
  loading.value = true
  if (queryText.value === "" && persistentQuery.value === "") {
    loading.value = false
    return
  } else if (queryText.value === "" && persistentQuery.value !== "") {
    persistentQuery.value = ""
    bookList.value = []
    await findFictionBooks(0)
    loading.value = false
    return;
  }
  if (startIndex === 0) {
    persistentQuery.value = queryText.value
    bookList.value = []
  }
  try {
    const response = await BooksAPI.search({
      query: query,
      startIndex: startIndex,
      order: order.value,
    });
    if (response.status === 200) {
      startIndex === 0 ?
          bookList.value = response.data.items :
          bookList.value.push(...response.data.items)
      console.log(bookList.value)
    }
  } catch (e) {
    toast.error('Ошибка загрузки')
    console.log(e)
  } finally {
    loading.value = false
  }
}

const findFictionBooks = async (startIndex) => {
  loading.value = true
  if (startIndex === 0) bookList.value = []
  try {
    const response = await BooksAPI.getFiction({
      startIndex: startIndex,
      order: order.value,
    });
    if (response.status === 200) {
      startIndex === 0 ?
          bookList.value = response.data.items :
          bookList.value.push(...response.data.items)
      console.log(bookList.value)
    }
  } catch (_) {
    toast.error('Ошибка загрузки')
  } finally {
    loading.value = false;
  }
}

const fetchMore = async () => {
  if (bookList.value.length < 1) return;
  if (persistentQuery.value === "") await findFictionBooks(bookList.value.length);
  else await findBooks(persistentQuery.value, bookList.value.length)
}

onMounted(async _ => {
  await findFictionBooks(0)
  await loadFavs()
})

watch(order, _ => {
  if (persistentQuery.value === "") findFictionBooks(0)
  else findBooks(queryText.value, 0)
})

document.onkeydown = async (e) => {
  if (e.key === 'Enter' && queryInput.value === document.activeElement) await findBooks(queryText.value, 0)
  else if (e.key === 'Escape' && queryInput.value === document.activeElement) queryInput.value.blur()
  else if (e.key === '/') {
    e.preventDefault()
    queryInput.value.focus()
  }
}

</script>

<template>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] pb-4 md:pb-10">
    <div class="flex flex-col">
      <div class="basis-[35%] relative size-full grid place-items-center place-content-center py-10 md:py-20">
        <img alt=""
             class="absolute z-[-500] inset-0 block object-cover size-full brightness-[70%] xl:object-center object-right select-none blur-sm pointer-events-none"
             src="@/assets/images/bookshelfs_2_comp.jpg">
        <Container>
          <div class="flex flex-col md:gap-4 gap-2 items-center ">
            <span
                class="block leading-none *:leading-none text-white text-center font-bold md:text-[36px] text-[22px] pointer-events-none select-none
                       animate-fade-up animate-duration-[1500ms] animate-ease-out animate-delay-0">
              Найдите SFW материалы по ключевым словам:<br/>
              <span class="md:text-[20px] text-[14px] font-light">(Каталог предоставлен Google Books)</span>
            </span>
            <div
                class="flex w-full transition-all animate-fade-up animate-duration-[1500ms] animate-ease-out animate-delay-[200ms]">
              <input id="query" ref="queryInput" v-model.trim="queryText"
                     class="duration-300 ease-out text-white font-light bg-black/20 rounded-l-md w-full backdrop-blur-xl md:text-[20px] text-[16px] ps-2 py-0.5
              focus:ring-[#d4a26f] ring-[#d4a26f]/50 focus:ring-2 ring-1 peer transition-all"
                     name="query"
                     type="text">
              <div
                  class="duration-300 ease-out peer-focus:ring-[#d4a26f] ring-[#d4a26f]/50 peer-focus:ring-2 ring-1 transition-all
                  bg-[#d4a26f] grid place-items-center place-content-center rounded-r-md md:p-2 p-1.5 cursor-pointer hover:bg-[#d4a26f] *:hover:text-white"
                  @click="findBooks(queryText, 0)">
                <i class="bi bi-search text-white leading-none md:text-[20px] text-[14px]"/>
              </div>
            </div>
            <div
                class="duration-300 flex flex-col select-none cursor-pointer bg-black/50 backdrop-blur-xl rounded-md
                text-white md:text-[20px] text-[16px] font-light leading-none transition-all ring-[#d4a26f]/50 hover:ring-[#d4a26f] hover:ring-2 ring-1
                animate-fade-up animate-duration-[1500ms] animate-ease-out animate-delay-[400ms]">
              <div class="px-2 py-1.5"
                   @click="_ => {
                     orderIndex += 1
                   }">
                Сортировка по {{
                  order === string_constants.order.relevance ?
                      'релевантности' : order === string_constants.order.newest && 'новизне'
                }}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div
          class="basis-[65%] size-full bg-[#101415] flex flex-col items-center gap-4 md:gap-10 pt-2 md:pt-4 2xl:pt-10">
        <Container>
          <div v-if="loading && bookList.length === 0"
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
          <BookList v-else :bookList="bookList" :favoriteList="favoriteList"/>
        </Container>
        <div v-if="bookList && bookList.length && bookList.length !== 0"
             :class="!loading && 'ring-2'"
             class="text-white/50 transition-all w-fit hover:text-white md:text-[20px] text-[16px] font-normal
             md:px-4 px-3 py-2 rounded-md ring-white/50 hover:ring-white select-none cursor-pointer active:scale-[98.5%]"
             @click="fetchMore">
          <svg v-if="loading" class="size-[40px] md:size-[60px]" viewBox="0 0 200 200"
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
          <span v-else>Загрузить ещё</span>
        </div>
        <div v-else-if="persistentQuery !== '' && queryText === ''"
             class="text-white md:text-[20px] text-[16px] font-normal flex flex-col items-center justify-center gap-2">
          <span>Ничего не найдено.</span>
          <i class="bi bi-emoji-frown md:text-[3rem] text-[1.5rem]"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>