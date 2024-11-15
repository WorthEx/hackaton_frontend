<script setup>
import {useRoute} from "vue-router";
import {inject, onBeforeMount, ref} from "vue";
import StarRating from 'vue-star-rating'
import BooksAPI from "@/apis/BooksAPI.js";
import {toast} from "vue3-toastify";
import {useLoading} from "@/components/loading/useLoading.js";
import Container from "@/components/Container.vue";
import ReviewsAPI from "@/apis/ReviewsAPI.js";
import Review from "@/components/Review.vue";

const {loggedIn} = inject("loggedIn")

const route = useRoute()
const loading = useLoading()
const bookId = route.params.id;
const descriptionExpanded = ref(false);
const reviewRating = ref(5)
const reviewText = ref("")

const book = ref()
const reviews = ref([])

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

const sendReview = async () => {
  if (reviewText.value === "") return
  if (!book.value) {
    toast.warn("Не удалось отправить отзыв для этой книги. Повторите попытку позже")
    return
  }

  const shouldIncreaseProgress = reviewText.value.split(" ").length > 40

  try {
    const response = await ReviewsAPI.sendReview({
      bookId: book.value.id,
      rating: reviewRating.value,
      reviewText: reviewText.value,
      increaseProgress: shouldIncreaseProgress
    })

    if (response.status === 200) {
      await fetchReviews()
      toast.success("Отзыв успешно отправлен!")
      reviewText.value = "";
      reviewRating.value = 5;
    } else if (response.status === 401 || response.status === 403) toast.warn("Войдите в аккаунт, чтобы писать отзывы")
  } catch (_) {
    toast.error("Не удалось отправить отзыв")
  }
}

const fetchReviews = async () => {
  try {
    const response = await ReviewsAPI.getReviewsByBook(bookId)

    if (response.status === 200) {
      reviews.value = response.data
      console.log(response.data)
    } else toast.error("Не удалось загрузить отзывы.")
  } catch (_) {
    toast.error("Не удалось загрузить отзывы.")
  }
}

onBeforeMount(async _ => {
  await fetchBookData()
  if (book.value) await fetchReviews()
})
</script>

<template>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] bg-[#101415]">
    <Container>
      <div v-if="book" class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] py-4 md:py-8
                  flex flex-col md:gap-4 gap-2 text-white leading-none">
        <div class="flex md:gap-4 gap-2 w-full md:h-[15rem]">
          <div
              class="overflow-x-hidden flex flex-col justify-between w-full gap-4 md:p-4 p-2 md:rounded-xl rounded-md bg-black/60">
            <div class="flex flex-col md:gap-6 gap-4">
              <div class="flex gap-2">
                <img v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail"
                     :src="book.volumeInfo.imageLinks.thumbnail"
                     alt=""
                     class="xl:hidden md:h-[5rem] h-[3.5rem] object-cover object-center rounded-md">
                <div v-else
                     class="xl:hidden md:h-[5rem] h-[3.5rem] md:min-w-[4rem] min-w-[2.5rem] bg-neutral-700 grid place-content-center place-items-center rounded-md">
                  <i class="bi bi-ban text-neutral-300 md:text-[1.5rem] text-[1rem]"></i>
                </div>
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
              class="select-none pointer-events-none overflow-hidden hidden md:block relative xl:basis-1/3 md:max-xl:hidden md:rounded-xl rounded-md bg-neutral-700">
            <img v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail"
                 :src="book.volumeInfo.imageLinks.thumbnail"
                 alt="Thumbnail"
                 class="size-full object-cover object-center brightness-[70%] blur-[8px]">
            <img v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail"
                 :src="book.volumeInfo.imageLinks.thumbnail"
                 alt=""
                 class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 object-cover xl:h-[85%] rounded-lg">
            <div v-if="!book.volumeInfo.imageLinks || !book.volumeInfo.imageLinks.thumbnail"
                 class="size-full grid place-content-center place-items-center">
              <i class="bi bi-ban text-neutral-300 text-[3rem]"></i>
            </div>
          </div>
        </div>
        <div
            class="flex flex-col gap-2 md:p-4 p-2 min-h-fit w-full md:rounded-xl rounded-md bg-black/60">
          <span class="md:text-[22px] text-[16px] font-medium select-none">Описание</span>
          <p :class="!descriptionExpanded && 'line-clamp-4'"
             class="md:text-[18px] text-[14px] leading-[1.4] text-justify break-words">
            {{ book.volumeInfo.description ? book.volumeInfo.description : 'Описание не предоставлено.' }}</p>
          <div v-if="book.volumeInfo.description" class="flex w-full justify-end">
            <span
                class="md:text-[18px] text-[14px] w-fit font-medium text-neutral-400 cursor-pointer select-none"
                @click="descriptionExpanded = !descriptionExpanded">{{
                descriptionExpanded ? 'Свернуть' : 'Развернуть'
              }}</span>
          </div>
        </div>
        <div
            class="flex flex-col md:gap-6 gap-3 md:p-4 p-2 min-h-fit w-full md:rounded-xl rounded-md bg-black/60 select-none">
          <div class="flex flex-col gap-2">
            <span class="md:text-[22px] text-[16px] font-medium select-none">Рейтинг пользователей по данным Google&nbsp;Books</span>
            <span class="md:text-[3rem] text-[2rem] font-semibold text-[#d4a26f]">{{
                book.volumeInfo.averageRating ? book.volumeInfo.averageRating : '-'
              }}/5
            </span>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex sm:flex-row flex-col gap-2 sm:items-center">
              <span class="md:text-[22px] text-[16px]">Ваша оценка:</span>
              <StarRating v-model:rating="reviewRating" :star-size="27"
                          active-color="#d4a26f"/>
            </div>
            <textarea id=""
                      v-model.trim="reviewText"
                      class="bg-white/5 leading-tight ring-1 ring-[#d4a26f] ring-opacity-30 focus:ring-opacity-80 transition-all rounded-md resize-none md:p-3 p-2 md:text-[20px] text-[16px] placeholder-[#9ca3af]"
                      name="reviewText"
                      placeholder="Расскажите что-нибудь интересное об этом шедевре..."
                      rows="8"/>
            <div class="flex w-full justify-end">
              <button :disabled="!loggedIn"
                      class="md:text-[20px] text-[18px] bg-[#d4a26f] px-4 py-2 rounded-md sm:w-fit w-full
                             disabled:bg-[#d4a26f]/60 disabled:text-white/70 hover:enabled:opacity-60 active:enabled:scale-[98%] transition-all"
                      @click.stop.prevent="sendReview">
                Отправить
              </button>
            </div>
          </div>
          <div v-if="reviews.length > 0" class="flex flex-col gap-2">
            <span class="md:text-[22px] text-[16px]">Отзывы платформы:</span>
            <div class="flex flex-col gap-2">
              <Review v-for="review in reviews"
                      :bookId="review.bookId"
                      :name="review.reviewerName"
                      :rating="review.rating"
                      :text="review.reviewText"/>
            </div>
          </div>
          <div v-else class="md:text-[22px] text-[16px] text-center pb-4">Отзывов нет. Вы можете оставить первый.</div>
        </div>
      </div>
    </Container>
  </div>
</template>

<style scoped>
</style>