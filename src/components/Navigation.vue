<script setup>
import {ref} from "vue";
import Container from "@/components/Container.vue";

const sidebarOpened = ref(false)


const switchSidebar = () => {
  sidebarOpened.value = !sidebarOpened.value
}
</script>

<template>
  <div
      class="h-[2em] md:h-[3em] w-full bg-black select-none text-white fixed top-0 z-[1000] after:bg-[#d4a26f] after:w-full after:h-[3px] after:absolute">
    <Container>
      <div class="flex justify-between items-center h-full px-2 text-[14px] md:text-[16px]">
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
              class="after:block after:h-[1px] hover:after:w-full after:w-0 after:bg-[#d4a26f] after:duration-150 after:transition-all transition-all active:text-[#d4a26f]"
              to="/bookshelfs">
            Книжные полки
          </RouterLink>
          <RouterLink
              class="hover:text-[#d4a26f] text-white transition-all"
              to="/sign-in"><i
              class="bi bi-person-circle"></i></RouterLink>
        </nav>
        <i class="bi bi-list text-white md:hidden block text-[20px]" @click="switchSidebar"></i>
      </div>
    </Container>
  </div>
</template>

<style scoped>
@import "bootstrap-icons/font/bootstrap-icons.css";
</style>