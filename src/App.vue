<script setup>
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import {onBeforeMount, provide, ref} from "vue";
import string_constants from "@/string_constants.js";

document.title = "Карагандинская ОУНБ им. Н.В. Гоголя"
const loggedIn = ref(false);

const onLogout = () => loggedIn.value = false;
const onLogin = () => loggedIn.value = true;

provide('loggedIn', {
  loggedIn,
  onLogin,
  onLogout
})

onBeforeMount(_ => {
  loggedIn.value = sessionStorage.getItem(string_constants.loggedIn) === "true";
})
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
        class="mt-[2em] md:mt-[3em] size-full">
      <RouterView @login="onLogin"/>
    </div>
    <Footer/>
  </div>
</template>

<style>
@import "bootstrap-icons/font/bootstrap-icons.css";
</style>
