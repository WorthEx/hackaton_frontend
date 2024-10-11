<script setup>
import {onMounted, ref} from "vue";
import string_constants from "@/string_constants.js";
import {jwtDecode} from "jwt-decode";
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import Container from "@/components/Container.vue";
import axios from "axios";
import {tokenSaved} from "@/utils.js";

const route = useRoute()
const username = ref("")
const firstname = ref("")
const lastname = ref("")
const email = ref("")
const pfp = ref("");
const showPen = ref(false)

onMounted(async () => {
  if (tokenSaved()) {
    try {
      const urlUsername = route.params.userId;
      const jwtUsername = jwtDecode(localStorage.getItem(string_constants.accessToken)).sub;
      if (urlUsername !== jwtUsername) {
        await router.push("/sign-in")
      }
    } catch (_) {
      await router.push("/sign-in")
    }

    const userFromToken = jwtDecode(localStorage.getItem(string_constants.accessToken));
    username.value = userFromToken.sub;
    firstname.value = userFromToken.firstname.charAt(0).toUpperCase() + userFromToken.firstname.slice(1);
    lastname.value = userFromToken.lastname.charAt(0).toUpperCase() + userFromToken.lastname.slice(1);
    email.value = userFromToken.email;

  } else await router.push("/sign-in")

  await loadPFP()
})

const loadPFP = async () => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  try {
    let response = await axios.get(
        `https://ui-avatars.com/api/?
    size=512&
    background=d4a26f&
    rounded=true&
    color=101415&
    name=${firstname.value + "+" + lastname.value}&
    bold=true`,
        {
          responseType: "blob",
        },
    );
    pfp.value = URL.createObjectURL(response.data);

  } catch (_) {
  }
}

const copyUsername = () => {
  navigator.clipboard.writeText(username.value)
}
</script>

<template>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] relative size-full">
    <img alt=""
         class="absolute z-[-500] inset-0 block object-cover xl:object-center object-right w-full brightness-[70%] md:h-[calc(100vh-3em)] h-[calc(100vh-2em)] select-none pointer-events-none"
         src="@/assets/images/bookshelfs_2_comp.jpg">
    <Container>
      <div
          class="bg-black/45 backdrop-blur-lg w-full md:h-[calc(100vh-3em)] h-[calc(100vh-2em)]
                 flex flex-col">
        <div class="w-full md:h-[30%] h-[20%] relative">
          <img alt="bruh" class="size-full object-cover object-center pointer-events-none select-none"
               src="@/assets/images/white_bookshelf.jpg">
          <div
              class="rounded-full absolute md:bottom-[-75px] bottom-[-45px] md:left-[100px] left-[25px] bg-[#d4a26f] md:min-h-[150px] md:min-w-[150px] md:max-h-[150px] md:max-w-[150px]
                    min-h-[90px] min-w-[90px] max-h-[90px] max-w-[90px] overflow-hidden md:ring-[4px] ring-[2px] ring-[#101415] flex justify-center items-center select-none">
            <span class="font-normal text-[#101415] uppercase md:text-[55px] text-[30px]">{{
                firstname[0] + lastname[0]
              }}</span>
            <!--            <img v-if="pfp !== ''" :src="pfp" alt=""-->
            <!--                 class="size-full object-cover object-center pointer-events-none select-none">-->
            <!--            <div v-else-->
            <!--                 class="md:min-h-[150px] md:min-w-[150px] md:max-h-[150px] md:max-w-[150px] min-h-[90px] min-w-[90px] max-h-[90px] max-w-[90px] bg-[#584837] animate-pulse"></div>-->
          </div>
        </div>
        <div
            class="w-full md:mt-[75px] mt-[45px] md:py-4 py-2 md:px-[100px] px-[25px] flex flex-col leading-tight select-none">
          <!-- todo назначить изменение данных -->
          <div class="flex flex-row items-center gap-2">
            <span class="text-[#eeeeee] font-bold md:text-[35px] text-[20px] cursor-pointer"
                  @mouseenter="() => {showPen = true}"
                  @mouseleave="() => {showPen = false}">{{
                firstname[0] + firstname.slice(1) + " " + lastname[0] + lastname.slice(1)
              }}</span>
            <i v-if="showPen" class="bi bi-pencil-fill text-[#d4a26f] md:text-[20px] text-[16px]"></i>
          </div>
          <span
              class="text-[#9C9C9C] md:text-[24px] text-[16px] cursor-pointer hover:text-[#d4a26f]/80 transition-colors w-fit"
              @click="copyUsername()">@{{ username }}</span>
          <!--          <div class="flex flex-row items-center gap-2 text-white mt-1">-->
          <!--            <i class="bi bi-envelope-fill text-[#d4a26f] md:text-[20px] text-[16px]"></i>-->
          <!--            <span class="block md:text-[20px] text-[14px]">{{ email }}</span>-->
          <!--          </div>-->
        </div>
      </div>
    </Container>
  </div>
</template>
bruhf
<style scoped>
@import "bootstrap-icons/font/bootstrap-icons.css";
</style>