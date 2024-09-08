<script setup>
</script>

<template>
  <!--    <div class="bg-[#eeeeee] bg-opacity-[10%] backdrop-blur-xl md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)]">-->
  <div>
    <section
        class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] w-full bg-cover xl:bg-center bg-right bg-no-repeat relative"
        style="background-image: url('/src/assets/images/bookshelfs_2.jpg')">
      <div
          class="2xl:w-[60%] w-full 2xl:backdrop-blur-lg backdrop-blur-md border-r-[1px] border-r-white border-opacity-30 md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)]
grid place-content-center px-8 select-none">
        <span class="2xl:text-[60px] md:text-[45px] text-[30px] font-bold text-white leading-tight">
          Карагандинская областная<br>универсальная научная библиотека</span>
        <span class="2xl:text-[45px] md:text-[30px] text-[20px] font-thin text-white">
          Читайте всё, что угодно.</span>
        <RouterLink
            class="mt-4 *:text-white font-medium bg-[#d4a26f] overflow-hidden rounded-full md:px-4 px-3 py-2 flex gap-1 items-center
            2xl:h-[2.5em] md:h-[2.7em] h-[3.2em] w-fit hover:bg-[#B58A60] hover:ml-1 transition-all
            2xl:text-[25px] md:text-[20px] text-[15px]"
            to="/books">
          <p>Найти</p>
          <div class="words *:block overflow-hidden self-start max-h-[1.5em]">
            <span>книги</span>
            <span>статьи</span>
            <span>учебники</span>
            <span>документы</span>
            <span>книги</span>
          </div>
          <i class="bi bi-arrow-right-short text-[40px]"></i>
        </RouterLink>
      </div>
      <i class="bi bi-chevron-compact-down absolute bottom-2 left-1/2 -translate-x-1/2
      text-white md:text-5xl text-3xl animate-pulse animate-infinite animate-duration-[2000ms] animate-ease-in"></i>
    </section>
    <section class="min-h-screen w-full">

    </section>
  </div>
</template>

<style scoped>
@import "bootstrap-icons/font/bootstrap-icons.css";

.words span {
  animation: spin_words 8s infinite;
}

@keyframes spin_words {
  25% {
    transform: translateY(-100%);
  }

  50% {
    transform: translateY(-200%);
  }

  75% {
    transform: translateY(-300%);
  }

  100% {
    transform: translateY(-400%);
  }
}
</style>