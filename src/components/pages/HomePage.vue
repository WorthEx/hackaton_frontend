<script setup>
import Container from "@/components/Container.vue";
</script>

<template>
  <div>
    <section
        class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] w-full relative">
      <img alt=""
           class="absolute z-[-1000] inset-0 block object-cover xl:object-center object-right w-full md:h-[calc(100vh-3em)] h-[calc(100vh-2em)] select-none"
           src="@/assets/images/bookshelfs_2.jpg">
      <div
          class="2xl:w-[60%] w-full 2xl:backdrop-blur-lg backdrop-blur-md border-r-[1px] border-r-white border-opacity-30 md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)]
grid place-content-center px-8 select-none">
        <span class="2xl:text-[60px] md:text-[45px] text-[30px] font-bold text-white leading-tight
      animate-fade-up animate-duration-[1500ms] animate-ease-out animate-delay-0">
          Карагандинская областная<br>универсальная научная библиотека</span>
        <span class="2xl:text-[45px] md:text-[30px] text-[20px] font-thin text-white
animate-fade-up animate-duration-[1500ms] animate-ease-out animate-delay-100">
          Читайте всё, что угодно.</span>
        <RouterLink
            class="mt-8 *:text-white font-medium bg-[#d4a26f] overflow-hidden rounded-full md:px-4 px-3 py-2 flex gap-1 items-center
            2xl:h-[2.5em] md:h-[2.7em] h-[3.2em] w-fit hover:bg-[#B58A60] transition-all
            2xl:text-[25px] md:text-[20px] text-[15px] active:scale-[97%]
            animate-fade-up animate-duration-[1500ms] animate-ease-out animate-delay-200"
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
    <section class="size-full relative bg-[#101415] md:pt-24 pt-10 md:pb-12 pb-4">
      <Container>
        <div class="flex xl:flex-row xl:gap-0 md:gap-6 gap-2 flex-col size-full">
          <div class="flex flex-col md:gap-6 gap-2 text-white basis-1/2 md:pr-6 xl:order-1 order-2 select-none">
            <span
                class="font-bold md:text-[40px] text-[32px] before:opacity-0 hover:before:opacity-100 before:transition-all before:content-['#']
                before:text-[#d4a26f] before:block before:absolute md:before:left-[-.2em] w-fit before:left-[10rem]">О библиотеке</span>
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
          <div
              class="basis-1/3 grid place-content-center md:place-content-start 2xl:place-content-center place-items-center h-fit">
            <div class="flex flex-col leading-tight *:leading-tight w-fit">
              <span class="md:text-[60px] text-[50px] text-white font-bold">100k+</span>
              <span class="ml-[.3em] text-[#d4a26f] text-[20px] md:text-[24px]">Книг и статей</span>
            </div>
          </div>
          <div class="basis-1/3 grid place-content-center place-items-center h-fit">
            <div class="flex flex-col leading-tight *:leading-tight w-fit">
              <span class="md:text-[60px] text-[50px] text-white font-bold">250+</span>
              <span class="text-[#d4a26f] text-[20px] md:text-[24px]">Жанров</span>
            </div>
          </div>
          <div
              class="basis-1/3 grid place-content-center md:place-content-end 2xl:place-content-center place-items-center h-fit">
            <div class="flex flex-col leading-tight *:leading-tight w-fit">
              <span class="md:text-[60px] text-[50px] text-white font-bold">50k+</span>
              <span class="ml-[.3em] text-[#d4a26f] text-[20px] md:text-[24px]">Клиентов</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
    <section class="size-full relative bg-[#101415] md:pb-24 pb-10 md:pt-12 pt-4">
      <Container>
        <div class="flex xl:flex-row md:gap-6 gap-2 flex-col size-full select-none">
          <div class="xl:basis-[55%] xl:order-1 order-2">
            <iframe
                allowfullscreen=""
                class="rounded-lg size-full md:min-h-[600px] min-h-[300px]" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1530.9614269789993!2d73.0905193709089!3d49.80938046053592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42434720b4f75d1d%3A0x7da71fed79692ddb!2z0KPQvdC40LLQtdGA0YHQsNC70YzQvdCw0Y8g0L3QsNGD0YfQvdCw0Y8g0LHQuNCx0LvQuNC-0YLQtdC60LA!5e0!3m2!1sru!2skz!4v1725794411543!5m2!1sru!2skz"></iframe>
          </div>
          <div
              class="relative flex flex-col min-h-full md:gap-6 gap-2 text-white select-none xl:basis-[45%] order-1 xl:order-2">
            <span
                class="font-bold md:text-[40px] text-[32px] ">Как нас найти?</span>
            <div class="font-light md:text-[20px] text-[14px] text-justify w-full">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur delectus deserunt dolores eos est
              expedita labore laudantium minima odit quae quasi, qui reprehenderit soluta suscipit.
            </div>
            <div class="flex flex-col gap-3 absolute bottom-0">
              <div class="flex gap-3 items-center">
                <i class="bi bi-geo-alt-fill text-[#d4a26f] text-[20px]"></i>
                <span class="md:text-[20px] text-[14px] font-light select-text">Караганда, Улица Ерубаева, 44</span>
              </div>
              <div class="flex gap-3 items-center">
                <i class="bi bi-p-circle-fill text-[#d4a26f] text-[20px]"></i>
                <span class="md:text-[20px] text-[14px] font-light select-text">2 парковки рядом</span>
              </div>
              <div class="flex gap-3 items-center">
                <i class="bi bi-globe-americas text-[#d4a26f] text-[20px]"></i>
                <span class="md:text-[20px] text-[14px] font-light select-text">www.karlib.kz</span>
              </div>
              <div class="flex gap-3 items-start">
                <i class="bi bi-telephone-fill text-[#d4a26f] text-[20px]"></i>
                <div class="flex flex-col">
                  <span class="md:text-[20px] text-[14px] font-light select-text">7 (7212) 56-76-55</span>
                  <span class="md:text-[20px] text-[14px] font-light select-text">7 (7212) 56-74-64</span>
                </div>
              </div>
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
  animation-delay: 2s;
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