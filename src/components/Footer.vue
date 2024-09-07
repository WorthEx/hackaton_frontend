<script setup>

import Container from "@/components/Container.vue";
</script>

<template>
  <div class="select-none bg-black py-6">
    <Container class="flex h-full flex-col items-center justify-between gap-4">
      <div
          class="grid w-full grid-cols-1 justify-items-center gap-x-4 gap-y-12 py-5 text-[0.6rem] text-white sm:grid-cols-2 xl:grid-cols-4">
        <section class="flex h-full w-full flex-col items-center">
          <div class="flex flex-col gap-1 text-gray-400 items-center sm:items-start">
            <span class="font-medium uppercase tracking-wider text-white pb-1.5">Навигация</span>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Главная
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/sign-in">Вход
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/sign-up">Регистрация
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/books">Книги
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/forums">Форумы
            </RouterLink>
          </div>
        </section>
        <section class="flex h-full w-full flex-col items-center">
          <div class="flex flex-col gap-1 text-gray-400 items-center sm:items-start">
            <span class="font-medium uppercase tracking-wider text-white pb-1.5">Услуги</span>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Онлайн-продление
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Виртуальная справка
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Приёмная
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Эл. доставка документов
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Центр "Парасат жолы"
            </RouterLink>
          </div>
        </section>
        <section class="flex h-full w-full flex-col items-center">
          <div class="flex flex-col gap-1 text-gray-400 items-center sm:items-start">
            <span class="font-medium uppercase tracking-wider text-white pb-1.5">Контакты</span>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Чёто вставим
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Чёто вставим
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Чёто вставим
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Чёто вставим
            </RouterLink>
            <RouterLink
                class="w-fit cursor-pointer transition-colors duration-200 after:mx-auto after:block after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-200 after:ease-out hover:text-white hover:after:w-full"
                to="/">Чёто вставим
            </RouterLink>
          </div>
        </section>
        <section class="h-full w-full">
          <div
              class="text-normal flex h-full w-full flex-col items-center justify-center gap-1">
            <div
                class="flex cursor-pointer flex-row items-center gap-1.5 transition-all duration-100 ease-in-out hover:gap-2.5 sm:flex-col"
                @click="$router.push('/')">
              <img
                  alt="Logo image"
                  class="w-[77px] h-[60px]"
                  src="@/assets/images/logo.png"/>
              <span
                  class="text-[0.55rem] text-white"
              >Карагандинская ОУНБ</span
              >
            </div>
          </div>
        </section>
      </div>
      <span class="text-[.6rem] text-white">Copyright © 1999–2024, Қарағанды ОӘҒК</span>
    </Container>
  </div>
</template>

<style scoped>

</style>