<script setup>
</script>

<template>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] bg-[#101415] grid place-items-center place-content-center">
    <div
        class="size-full flex *:animate-fade-up select-none flex-col gap-2 items-center text-center *:animate-duration-[600ms] *:animate-once">
      <span class="text-7xl md:text-9xl font-semibold text-[#d4a26f] animate-delay-[200ms]">404</span>
      <div class="flex flex-col gap-0 text-[20px] md:text-[28px] text-white font-light animate-delay-[800ms]">
        <span>Такой страницы не существует.</span>
        <span>И откуда вы взяли эту ссылку?</span>
      </div>
      <router-link class="w-fit text-[16px] md:text-[24px] animate-delay-[1000ms]" to="/"><span
          class="text-[#d4a26f] transition-all duration-300 ease-out after:mx-auto after:block after:h-[1.5px] after:w-1/2 after:bg-[#d4a26f]
                      after:transition-all after:duration-300 after:ease-out hover:text-[#d4a26f] hover:after:w-full">На главную</span
      ></router-link>
    </div>
  </div>
</template>

<style scoped>

</style>