<script setup>
import Footer from './components/Footer.vue'
import Navigation from "@/components/Navigation.vue";

document.title = "Карагандинская ОУНБ им. Н.В. Гоголя"
</script>

<template>
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link crossorigin href="https://fonts.gstatic.com" rel="preconnect">
  <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet">
  <div id="app" class="relative h-full">
    <Navigation/>
    <div
        class="mt-[2em] md:mt-[3em] h-full">
      <RouterView/>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>
</style>
