<script setup>
import Container from "@/components/Container.vue";
import {onMounted, ref} from "vue";
import BooksAPI from "@/apis/BooksAPI.js";
import BookList from "@/components/BookList.vue";

const queryText = ref("")
const persistentQuery = ref("")
const bookList = ref([])

const queryInput = ref()

const findBooks = async (query, startIndex) => {
  queryInput.value.blur()
  if (queryText.value === "") return;
  if (startIndex === 0) persistentQuery.value = queryText.value

  const response = await BooksAPI.search({
    query: query,
    startIndex: startIndex
  });
  if (response.status === 200) {
    startIndex === 0 ?
        bookList.value = response.data.items :
        bookList.value.push(...response.data.items)
    console.log(bookList.value)
  }
}

const findFictionBooks = async (startIndex) => {
  const response = await BooksAPI.getFiction({
    startIndex: startIndex
  });
  if (response.status === 200) {
    bookList.value.push(...response.data.items)
    console.log(bookList.value)
  }
}

const fetchMore = async () => {
  if (bookList.value.length < 1) return;
  if (persistentQuery.value === "") await findFictionBooks(bookList.value.length + 1);
  else await findBooks(persistentQuery.value, bookList.value.length + 1)
}

onMounted(async _ => {
  await findFictionBooks(0)
})

document.onkeydown = async (e) => {
  if (e.key === 'Enter' && queryInput.value === document.activeElement) await findBooks(queryText.value, 0)
  else if (e.key === 'Escape' && queryInput.value === document.activeElement) queryInput.value.blur()
}

</script>

<template>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] pb-10">
    <div class="flex flex-col">
      <div class="basis-[35%] relative size-full grid place-items-center place-content-center py-10 md:py-20">
        <img alt=""
             class="absolute z-[-500] inset-0 block object-cover size-full brightness-[70%] xl:object-center object-right select-none blur-sm pointer-events-none"
             src="@/assets/images/bookshelfs_2_comp.jpg">
        <Container>
          <div class="flex flex-col md:gap-4 gap-2 items-center ">
            <span
                class="block leading-none *:leading-none text-white text-center font-bold md:text-[36px] text-[22px] pointer-events-none select-none">
              Найдите SFW материалы по ключевым словам:<br/>
              <span class="md:text-[20px] text-[14px] font-light">(Каталог предоставлен Google Books)</span>
            </span>
            <div
                class="flex w-full transition-all">
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
          </div>
        </Container>
      </div>
      <div class="basis-[65%] size-full bg-[#101415] pt-10 flex flex-col items-center gap-10">
        <Container>
          <BookList :bookList="bookList"/>
        </Container>
        <div class="text-white/80 font-normal px-4 py-2 rounded-md ring-white/80 ring-2 select-none cursor-pointer
                    active:scale-[98.5%] transition-all" @click="fetchMore">
          Загрузить ещё
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>