<script setup>
import Container from "@/components/Container.vue";
</script>

<template>
  <!--    <div class="bg-[#eeeeee] bg-opacity-[10%] backdrop-blur-xl md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)]">-->
  <div>
    <section
        class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] w-full relative">
      <!--        style="background-image: url('/src/assets/images/bookshelfs_2.jpg')">-->
      <img alt=""
           class="absolute z-[-1000] inset-0 block object-cover xl:object-center object-right w-full md:h-[calc(100vh-3em)] h-[calc(100vh-2em)] select-none"
           src="@/assets/images/bookshelfs_2.jpg">
      <div
          class="2xl:w-[60%] w-full 2xl:backdrop-blur-lg backdrop-blur-md border-r-[1px] border-r-white border-opacity-30 md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)]
grid place-content-center px-8 select-none">
        <span class="2xl:text-[60px] md:text-[45px] text-[30px] font-bold text-white leading-tight">
          Карагандинская областная<br>универсальная научная библиотека</span>
        <span class="2xl:text-[45px] md:text-[30px] text-[20px] font-thin text-white">
          Читайте всё, что угодно.</span>
        <RouterLink
            class="mt-8 *:text-white font-medium bg-[#d4a26f] overflow-hidden rounded-full md:px-4 px-3 py-2 flex gap-1 items-center
            2xl:h-[2.5em] md:h-[2.7em] h-[3.2em] w-fit hover:bg-[#B58A60] transition-all
            2xl:text-[25px] md:text-[20px] text-[15px] active:scale-[97%]"
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
    <section class="size-full relative bg-[#151515] md:py-24 py-10">
      <Container>
        <div class="flex xl:flex-row xl:gap-0 md:gap-6 gap-2 flex-col size-full">
          <div class="flex flex-col md:gap-6 gap-2 text-white basis-1/2 md:pr-6 xl:order-1 order-2">
            <span
                class="font-bold md:text-[40px] text-[32px] before:opacity-0 hover:before:opacity-100 before:transition-all before:content-['#'] before:text-[#d4a26f] before:block before:absolute before:left-[-.2em]">О библиотеке</span>
            <article class="font-light md:text-[20px] text-[14px] text-justify w-full">Lorem ipsum dolor sit amet,
              consectetur
              adipisicing
              elit. Alias
              aliquid animi
              aperiam architecto,
              aut est eum fugit magni minima molestiae officia perferendis praesentium quod repellat rerum sequi vitae
              voluptatem voluptates? <br><br>Adipisci at dignissimos dolore earum eveniet facilis harum impedit
              necessitatibus
              nemo nostrum odio, perferendis quo reiciendis sunt veniam? Aperiam dicta ea illum, nulla placeat saepe
              voluptas? Accusantium dignissimos ducimus error facilis hic inventore obcaecati placeat! Doloremque ipsum
              magni molestiae perferendis possimus quia saepe totam veniam voluptatum.<br><br>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium amet aspernatur aut
              consequatur debitis delectus dignissimos, distinctio dolores eos et exercitationem harum hic id illum
              ipsam ipsum iusto magnam mollitia nam nesciunt nisi nobis placeat praesentium, quas quasi quod rem saepe
              sequi, suscipit ullam unde vero vitae! Labore, minus.
            </article>
          </div>
          <div class="basis-1/2 xl:order-2 order-1">
            <img alt="" class=" rounded-lg select-none pointer-events-none h-full object-cover object-center"
                 src="@/assets/images/library_photo_1.jpg"/>
          </div>
        </div>
        <div class="flex md:flex-row flex-col md:gap-0 gap-10 size-full md:mt-24 mt-10 justify-between select-none">
          <div class="basis-1/3 grid place-content-center place-items-center h-fit">
            <div class="flex flex-col leading-tight *:leading-tight w-fit">
              <span class="md:text-[60px] text-[50px] text-white font-bold">100k+</span>
              <span class="text-[#d4a26f] text-[20px] md:text-[24px]">Книг и статей</span>
            </div>
          </div>
          <div class="basis-1/3 grid place-content-center place-items-center h-fit">
            <div class="flex flex-col leading-tight *:leading-tight w-fit">
              <span class="md:text-[60px] text-[50px] text-white font-bold">250+</span>
              <span class="text-[#d4a26f] text-[20px] md:text-[24px]">Жанров</span>
            </div>
          </div>
          <div class="basis-1/3 grid place-content-center place-items-center h-fit">
            <div class="flex flex-col leading-tight *:leading-tight w-fit">
              <span class="md:text-[60px] text-[50px] text-white font-bold">50k+</span>
              <span class="text-[#d4a26f] text-[20px] md:text-[24px]">Клиентов</span>
            </div>
          </div>
        </div>
      </Container>
    </section>

  </div>
</template>

<style scoped>
@import "bootstrap-icons/font/bootstrap-icons.css";

.words span {
  animation: spin_words 10s infinite;
}

@keyframes spin_words {
  10% {
    transform: translateY(-102%);
  }
  25% {
    transform: translateY(-100%);
  }
  35% {
    transform: translateY(-202%);
  }
  50% {
    transform: translateY(-200%);
  }
  60% {
    transform: translateY(-302%);
  }
  75% {
    transform: translateY(-300%);
  }
  85% {
    transform: translateY(-402%);
  }
  100% {
    transform: translateY(-400%);
  }
}
</style>