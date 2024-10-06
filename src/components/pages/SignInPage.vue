<script setup>
import {onMounted, ref} from "vue";
import accountAPI from "@/apis/AccountAPI.js";
import string_constants from "@/string_constants.js";
import router from "@/router/index.js";
import {jwtDecode} from "jwt-decode";

const loginData = ref(
    {
      username: "",
      password: "",
    }
)
const passwordHidden = ref(true)
const errorOccurred = ref(false)
const loadingState = ref(false)

onMounted(async () => {
  if (
      localStorage.getItem(string_constants.accessToken) != null &&
      localStorage.getItem(string_constants.accessToken) !== "null" &&
      localStorage.getItem(string_constants.accessToken) !== undefined &&
      localStorage.getItem(string_constants.accessToken) !== "undefined" &&
      localStorage.getItem(string_constants.accessToken) !== ""
  ) {
    await router.push(`/user/${localStorage.getItem(string_constants.username)}`);
  }
})

const signIn = async () => {
  if (loginData.value.username && loginData.value.password) {
    loadingState.value = true
    try {
      const response = await accountAPI.login(loginData.value)
      if (response.status === 200) {
        errorOccurred.value = false
        const responseData = jwtDecode(response.data.jwt)
        console.log(responseData)
        localStorage.setItem(string_constants.accessToken, response.data.jwt)
        localStorage.setItem(string_constants.username, responseData.sub)
        localStorage.setItem(string_constants.firstname, responseData.firstname)
        localStorage.setItem(string_constants.lastname, responseData.lastname)
        localStorage.setItem(string_constants.email, responseData.email)
        await router.push(`/user/${loginData.value.username}`)
      }
    } catch (_) {
      errorOccurred.value = true
    } finally {
      loadingState.value = false
      loginData.value.username = ""
      loginData.value.password = ""
    }
  }
}

document.onkeydown = async (e) => {
  if (e.key === 'Enter') await signIn()
}

</script>

<template>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] relative grid place-items-center place-content-center size-full sm:py-6 py-2">
    <img alt=""
         class="absolute z-[-500] inset-0 block object-cover xl:object-center object-right w-full md:h-[calc(100vh-3em)] h-[calc(100vh-2em)] select-none blur-sm pointer-events-none"
         src="@/assets/images/bookshelfs_2_comp.jpg">
    <div
        class="bg-black/25 backdrop-blur-lg rounded-2xl ring-white/10 ring-1 overflow-hidden sm:shadow-[0px_0px_50px_15px_rgba(212,162,111,.35)]
        flex flex-row
        2xl:w-[calc(70vw)] sm:w-[calc(65vw)] w-[calc(100vw-1em)]
        lg:max-w-[1200px] max-h-[850px]">
      <div class="lg:block hidden xl:basis-[50%] basis-0">
        <img alt="" class="object-cover size-full select-none pointer-events-none"
             src="@/assets/images/stairs_comp.jpg">
      </div>
      <div
          class="min-h-full sm:px-6 px-4 py-6 xl:basis-[50%] basis-full select-none flex flex-col justify-center gap-6 text-white">
        <span class="w-full block text-center font-medium sm:text-[32px] text-[26px] leading-tight ">Вход</span>
        <form aria-autocomplete="none" autocomplete="off"
              class="flex flex-col gap-6"
              method="post">
          <div
              class="flex flex-col gap-1 border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
            <label class="sm:text-[18px] text-[14px]" for="username">Имя пользователя</label>
            <input
                v-model="loginData.username"
                class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
              sm:text-[20px] text-[18px]"
                name="username"
                placeholder="OmenBestWaifu"
                type="text">
          </div>
          <div
              class="flex flex-col gap-1 border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
            <label class="sm:text-[18px] text-[14px]" for="password">Пароль</label>
            <div class="flex flex-row ">
              <input
                  v-if="passwordHidden"
                  v-model="loginData.password"
                  class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
              sm:text-[20px] text-[18px]"
                  name="password"
                  placeholder="********"
                  type="password">
              <input
                  v-else
                  v-model="loginData.password"
                  class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
              sm:text-[20px] text-[18px]"
                  name="password"
                  placeholder="********"
                  type="text">
              <div class="flex items-center justify-center ps-2 cursor-pointer">
                <i
                    :class="passwordHidden ? 'bi-eye' : 'bi-eye-slash'"
                    class="bi block transition-colors hover:text-[#d4a26f] text-white text-[20px] sm:text-[25px]"
                    @click.prevent="passwordHidden = !passwordHidden"></i>
              </div>
            </div>
          </div>
          <span
              :class="errorOccurred ? 'block' :'hidden'"
              class="text-[#FF5F5F] sm:text-[18px] text-[14px]">Неверный логин или пароль!
            <a class="underline"
               href="https://www.invitro.ru/library/bolezni/28678/">Амнезия:&nbsp;симптомы&nbsp;и&nbsp;причины.</a></span>
        </form>
        <div class="flex flex-col gap-1">
          <button class="w-full rounded-xl transition-all flex justify-center
                          bg-[#d4a26f] text-white
                          hover:bg-transparent hover:ring-[2px] hover:ring-[#d4a26f] hover:text-[#d4a26f]
                          active:scale-[98%]
                          py-2 sm:text-[20px] text-[16px] self-end" type="submit"
                  @click.prevent.stop="signIn">
            <svg v-if="loadingState" class="size-[40px]" viewBox="0 0 200 200"
                 xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="65" fill="#ffffff" r="15" stroke="#ffffff" stroke-width="2">
                <animate attributeName="cy" begin="-.4" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                         repeatCount="indefinite" values="65;135;65;"></animate>
              </circle>
              <circle cx="100" cy="65" fill="#ffffff" r="15" stroke="#ffffff" stroke-width="2">
                <animate attributeName="cy" begin="-.2" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                         repeatCount="indefinite" values="65;135;65;"></animate>
              </circle>
              <circle cx="160" cy="65" fill="#ffffff" r="15" stroke="#ffffff" stroke-width="2">
                <animate attributeName="cy" begin="0" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                         repeatCount="indefinite" values="65;135;65;"></animate>
              </circle>
            </svg>
            <span v-else>Войти</span>
          </button>
          <RouterLink class="mx-auto w-fit" to="/sign-up">
              <span
                  class="sm:text-[18px] text-[14px] font-light hover:underline decoration-[#d4a26f] leading-none text-center">Нет&nbsp;аккаунта? Пройти&nbsp;регистрацию.</span>
          </RouterLink>
        </div>
        <div class="flex justify-center gap-4">
          <div
              class="rounded-full bg-transparent 2xl:min-h-[70px] 2xl:min-w-[70px] min-h-[50px] min-w-[50px] ring-[#d4a26f] ring-2 relative grid place-items-center place-content-center cursor-pointer
                     text-[#d4a26f] transition-all hover:bg-[#DB4437] hover:ring-transparent hover:text-white active:scale-[96%]">
            <i class="bi bi-google 2xl:text-[24px] text-[20px]"></i>
          </div>
          <div
              class="rounded-full bg-transparent 2xl:min-h-[70px] 2xl:min-w-[70px] min-h-[50px] min-w-[50px] ring-[#d4a26f] ring-2 relative grid place-items-center place-content-center cursor-pointer
                     text-[#d4a26f] transition-all hover:bg-black hover:ring-transparent hover:text-white active:scale-[96%]">
            <i class="bi bi-github 2xl:text-[28px] text-[20px]"></i>
          </div>
          <div
              class="rounded-full bg-transparent 2xl:min-h-[70px] 2xl:min-w-[70px] min-h-[50px] min-w-[50px] ring-[#d4a26f] ring-2 relative grid place-items-center place-content-center cursor-pointer
                     text-[#d4a26f] transition-all hover:bg-[#1877f2] hover:ring-transparent hover:text-white active:scale-[96%]">
            <i class="bi bi-facebook 2xl:text-[28px] text-[20px]"></i>
          </div>
          <div
              class="rounded-full bg-transparent 2xl:min-h-[70px] 2xl:min-w-[70px] min-h-[50px] min-w-[50px] ring-[#d4a26f] ring-2 relative grid place-items-center place-content-center cursor-pointer
                     text-[#d4a26f] transition-all hover:bg-[#1da1f2] hover:ring-transparent hover:text-white active:scale-[96%]">
            <i class="bi bi-twitter 2xl:text-[24px] text-[20px]"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "bootstrap-icons/font/bootstrap-icons.css";
</style>