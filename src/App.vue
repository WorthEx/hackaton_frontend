<script setup>
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import Loading from "@/components/loading/Loading.vue";
import {onBeforeMount, provide, ref} from "vue";
import string_constants from "@/string_constants.js";
import {useLoading} from "@/components/loading/useLoading.js";
import FavoritesAPI from "@/apis/FavoritesAPI.js";
import {toast} from "vue3-toastify";

document.title = "Карагандинская ОУНБ им. Н.В. Гоголя"
const loggedIn = ref(false);
const favoriteList = ref([])
const loading = useLoading()

const onLogout = () => loggedIn.value = false;
const onLogin = () => loggedIn.value = true;

const loadFavs = async () => {
  if (loggedIn.value) {
    try {
      const response = await FavoritesAPI.getFavorites()
      if (response.status === 200) {
        favoriteList.value = response.data
      }
    } catch (_) {
      toast.error("Не удалось получить список избранного")
    }
  }
}

const addTofav = async (bookId) => {
  if (loggedIn.value) {
    try {
      const response = await FavoritesAPI.addFavorite(bookId)
      if (response.status === 200) {
        await loadFavs()
      }
    } catch (_) {
      toast.error("Не удалось обновить список избранного")
    }
  } else toast.warn("Войдите в аккаунт, чтобы добавлять избранное.")
}

const delFromFav = async (bookId) => {
  if (loggedIn.value) {
    try {
      const response = await FavoritesAPI.deleteFavorite(bookId)
      if (response.status === 200) {
        await loadFavs()
      }
    } catch (_) {
      toast.error("Не удалось обновить список избранного")
    }
  }
}

provide('loggedIn', {
  loggedIn,
  onLogin,
  onLogout,
})

provide('favoriteList', {
  favoriteList,
  addTofav,
  delFromFav,
  loadFavs
})

onBeforeMount(_ => {
  loggedIn.value = sessionStorage.getItem(string_constants.loggedIn) === "true";
})
</script>

<template>
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link crossorigin href="https://fonts.gstatic.com" rel="preconnect">
  <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet">
  <div id="app" class="relative h-full">
    <Navigation/>
    <Transition>
      <Loading v-if="loading.show.value">
        Загрузка
      </Loading>
    </Transition>
    <div class="mt-[2em] md:mt-[3em] size-full">
      <RouterView/>
    </div>
    <Footer/>
  </div>
</template>

<style>
@import "bootstrap-icons/font/bootstrap-icons.css";

.v-enter-active,
.v-leave-active {
  transition: opacity .2s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
