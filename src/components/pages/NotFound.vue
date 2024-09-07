<script setup>

import Container from "@/components/Container.vue";
</script>

<template>
  <div class=" size-full bg-[#eeeeee]">
    <Container>
      <div class="grid place-items-center md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)]">
        <div
            class="flex animate-fade-up select-none flex-col items-center gap-2 text-center animate-delay-[300ms] animate-duration-[600ms] animate-once">
          <span class="text-7xl md:text-9xl font-semibold text-[#E42C57]">404</span>
          <div class="flex flex-col gap-0 text-sm md:text-xl">
            <span>Страница не найдена!</span>
            <span>И откуда Вы взяли эту ссылку?</span>
          </div>
          <router-link class="w-fit text-sm" to="/"><span
              class="text-[#E42C57] transition-all duration-300 ease-out after:mx-auto after:block after:h-[1.5px] after:w-1/2 after:bg-[#EF533F]
            after:transition-all after:duration-300 after:ease-out hover:text-[#EF533F] hover:after:w-full">На главную</span
          ></router-link>
        </div>
      </div>
    </Container>
  </div>
</template>

<style scoped>

</style>