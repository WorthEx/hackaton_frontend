<script setup>
import {ref} from "vue";
import Container from "@/components/Container.vue";


const menuOpened = ref(false)
</script>

<template>
  <div class="h-[2em] md:h-[3em] w-full bg-black select-none text-white">
    <Container>
      <div class="flex justify-between items-center h-full px-2">
        <RouterLink class="flex md:gap-2 items-center h-full" to="/">
          <img alt="" class="w-[61.6px] h-[48px] cursor-pointer md:scale-100 scale-[80%]"
               src="@/assets/images/logo.png">
          <span class="font-medium text-[14px] md:text-[20px]">Карагандинская ОУНБ</span>
        </RouterLink>
        <nav
            class="md:flex gap-4 items-center h-full text-[20px] hidden *:animate-fade-left *:animate-once *:animate-ease-out">
          <RouterLink
              class="after:block after:h-[1px] hover:after:w-full after:w-0 after:bg-[#E42C57] after:duration-150 after:transition-all "
              to="/">
            Главная
          </RouterLink>
          <RouterLink
              class="after:block after:h-[1px] hover:after:w-full after:w-0 after:bg-[#E42C57] after:duration-150 after:transition-all "
              to="/books">
            Книги
          </RouterLink>
          <RouterLink
              class="after:block after:h-[1px] hover:after:w-full after:w-0 after:bg-[#E42C57] after:duration-150 after:transition-all "
              to="/forums">
            Форумы
          </RouterLink>
          <RouterLink
              class="hover:text-[#E42C57] text-white transition-all"
              to="/sign-in"><i
              class="bi bi-person-circle"></i></RouterLink>
        </nav>
        <i class="bi bi-list text-white md:hidden block"></i>
      </div>
    </Container>
  </div>
</template>

<style scoped>
@import "bootstrap-icons/font/bootstrap-icons.css";
</style>