<script setup>
import {ref} from "vue";
import Container from "@/components/Container.vue";
import {logout, toAccountPageLink, tokenSaved} from "@/utils.js";

const sidebarOpened = ref(false)


const switchSidebar = () => {
  sidebarOpened.value = !sidebarOpened.value
  if (sidebarOpened.value) {
    document.documentElement.style.overflow = 'hidden'
  }
}
</script>

<template>
  <div class="relative">
    <div
        class="h-[2em] md:h-[3em] w-full bg-black select-none text-white fixed top-0 z-[999] after:bg-[#d4a26f] after:w-full after:h-[3px] after:absolute">
      <Container>
        <div class="flex justify-between items-center h-full text-[14px] md:text-[16px]">
          <RouterLink class="flex md:gap-2 items-center h-full" to="/">
            <img alt="" class="w-[61.6px] h-[48px] cursor-pointer md:scale-100 scale-[80%]"
                 src="@/assets/images/logo.png">
            <span
                class="font-medium after:block after:h-[1px] hover:after:w-full after:w-0 after:bg-[#d4a26f] after:duration-150 after:transition-all transition-all active:text-[#d4a26f]">Карагандинская ОУНБ</span>
          </RouterLink>
          <nav
              class="text-[12px] md:text-[16px] md:flex gap-4 items-center h-full hidden">
            <RouterLink
                class="after:block after:h-[1px] hover:after:w-full after:w-0 after:bg-[#d4a26f] after:duration-150 after:transition-all transition-all active:text-[#d4a26f]"
                to="/">
              Главная
            </RouterLink>
            <RouterLink
                class="after:block after:h-[1px] hover:after:w-full after:w-0 after:bg-[#d4a26f] after:duration-150 after:transition-all transition-all active:text-[#d4a26f]"
                to="/books">
              Книги
            </RouterLink>
            <RouterLink
                class="after:block after:h-[1px] hover:after:w-full after:w-0 after:bg-[#d4a26f] after:duration-150 after:transition-all transition-all active:text-[#d4a26f]"
                to="/forums">
              Форумы
            </RouterLink>
            <RouterLink
                :to="tokenSaved() ? toAccountPageLink() : '/sign-in'"
                class="hover:text-[#d4a26f] text-white transition-all"><i
                class="bi bi-person-circle"></i></RouterLink>
            <i v-if="tokenSaved()"
               class="bi bi-box-arrow-right text-[14px] md:text-[18px] hover:text-[#d4a26f] cursor-pointer text-white transition-all"
               @click="logout()"></i>
          </nav>
          <i class="bi bi-list text-white md:hidden block text-[20px]" @click="switchSidebar"></i>
        </div>
      </Container>
    </div>
    <div :class="sidebarOpened ? 'flex md:hidden' : 'hidden'"
         class="flex-col fixed z-[1000] h-screen w-full bg-black/50 backdrop-blur-2xl text-white text-[16px]"
         @click="sidebarOpened = false">
      <RouterLink
          class="w-full p-4 active:ml-1 transition-all flex items-center justify-between hover:ml-1 hover:text-[#d4a26f]
          animate-fade-down animate-duration-[300ms] animate-ease-out"
          to="/"
          @click="switchSidebar">
        Главная
        <i class="bi bi-arrow-right-short text-[20px]"></i>
      </RouterLink>
      <RouterLink
          class="w-full p-4 active:ml-1 transition-all flex items-center justify-between hover:ml-1 hover:text-[#d4a26f]
          animate-fade-down animate-duration-[300ms] animate-ease-out animate-delay-100"
          to="/books"
          @click="switchSidebar">
        Книги
        <i class="bi bi-arrow-right-short text-[20px]"></i>
      </RouterLink>
      <RouterLink
          class="w-full p-4 active:ml-1 transition-all flex items-center justify-between hover:ml-1 hover:text-[#d4a26f]
          animate-fade-down animate-duration-[300ms] animate-ease-out animate-delay-200"
          to="/forums"
          @click="switchSidebar">
        Форумы
        <i class="bi bi-arrow-right-short text-[20px]"></i>
      </RouterLink>
      <RouterLink
          :to="tokenSaved() ? toAccountPageLink() : '/sign-in'"
          class="w-full p-4 active:ml-1 transition-all flex items-center justify-between hover:ml-1 hover:text-[#d4a26f]
          animate-fade-down animate-duration-[300ms] animate-ease-out animate-delay-300"
          @click="switchSidebar">
        Аккаунт
        <i class="bi bi-arrow-right-short text-[20px]"></i>
      </RouterLink>
      <div v-if="tokenSaved()" class="w-full p-4 active:ml-1 transition-all flex items-center justify-between hover:ml-1 hover:text-[#d4a26f]
          animate-fade-down animate-duration-[300ms] animate-ease-out animate-delay-[400ms]" @click="logout()">
        Выйти
        <i class="bi bi-arrow-right-short text-[20px]"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "bootstrap-icons/font/bootstrap-icons.css";
</style>