<script setup>
import {markRaw, onMounted, ref} from "vue";
import string_constants from "@/string_constants.js";
import {jwtDecode} from "jwt-decode";
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import {tokenSaved} from "@/utils.js";
import ChangeUserInfoModal from "@/components/modals/ChangeUserInfoModal.vue";
import {useModal} from "@/components/modals/useModal.js";

const route = useRoute()
const username = ref("")
const firstname = ref("")
const lastname = ref("")
const city = ref("")
const email = ref("")
const showPen = ref(false)
const modal = useModal()

const fullNameEl = ref()

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
})

const copyUsername = () => {
  navigator.clipboard.writeText(username.value)
}

const openChangeUserInfoModal = () => {
  hideFullName()
  modal.component.value = markRaw(ChangeUserInfoModal)
  modal.showModal()
}

const closeChangeUserInfoModal = () => {
  revealFullName()
  modal.hideModal()
}

const hideFullName = () => {
  showPen.value = false
  fullNameEl.value.classList.add("md:translate-x-[calc(-100%-100px)]", "translate-x-[calc(-100%-25px)]")
}

const revealFullName = () => {
  fullNameEl.value.classList.remove("md:translate-x-[calc(-100%-100px)]", "translate-x-[calc(-100%-25px)]")
}

const updateDataEvent = (newData) => {
  console.log(newData)
  firstname.value = newData.firstname
  lastname.value = newData.lastname
  city.value = newData.city
  closeChangeUserInfoModal()
}


</script>

<template>
  <Teleport to="#modal">
    <Transition>
      <component :is="modal.component.value"
                 v-if="modal.show.value"
                 v-bind="modal.component.value === ChangeUserInfoModal ? {firstname: firstname, lastname: lastname, city: city} : null"
                 @closeModal="closeChangeUserInfoModal"
                 @updateDataEvent="(newData) => updateDataEvent(newData)"/>
    </Transition>
  </Teleport>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] relative size-full">

    <img alt=""
         class="absolute z-[-500] inset-0 block object-cover xl:object-center object-right w-full brightness-[70%] md:h-[calc(100vh-3em)] h-[calc(100vh-2em)] select-none pointer-events-none"
         src="@/assets/images/bookshelfs_2_comp.jpg">

    <div
        class="bg-black/45 backdrop-blur-lg md:h-[calc(100vh-3em)] h-[calc(100vh-2em)] overflow-hidden
                 flex flex-col mx-auto w-full max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl">
      <div class="w-full md:h-[30%] h-[20%] relative">
        <img alt="bruh" class="size-full object-cover object-center pointer-events-none select-none"
             src="@/assets/images/white_bookshelf.jpg">
        <div
            class="rounded-full absolute md:bottom-[-75px] bottom-[-45px] md:left-[100px] left-[25px] bg-[#d4a26f] md:min-h-[150px] md:min-w-[150px] md:max-h-[150px] md:max-w-[150px]
                    min-h-[90px] min-w-[90px] max-h-[90px] max-w-[90px] overflow-hidden md:ring-[4px] ring-[2px] ring-[#101415] flex justify-center items-center select-none">
            <span class="font-normal text-[#101415] uppercase md:text-[55px] text-[30px]">{{
                firstname[0] + lastname[0]
              }}</span>
        </div>
      </div>
      <div
          class="w-full md:mt-[75px] mt-[45px] md:py-4 py-2 md:px-[100px] px-[25px] flex flex-col leading-tight select-none">
        <!-- todo назначить изменение данных -->
        <div class="flex flex-row items-center gap-2">
            <span ref="fullNameEl"
                  class="text-[#eeeeee] font-bold md:text-[35px] text-[20px] cursor-pointer transition-all"
                  @click="openChangeUserInfoModal()"
                  @mouseenter="() => {showPen = true}"
                  @mouseleave="() => {showPen = false}">{{
                firstname + " " + lastname
              }}</span>
          <i v-if="showPen" class="bi bi-pencil-fill text-[#d4a26f] md:text-[20px] text-[16px]"></i>
        </div>
        <span
            class="text-[#9C9C9C] md:text-[24px] text-[16px] cursor-pointer hover:text-[#d4a26f]/80 transition-colors w-fit"
            @click="copyUsername()">@{{ username }}</span>
        <!--        <div class="flex flex-row items-center gap-2 text-white mt-1">-->
        <!--          <i class="bi bi-envelope-fill text-[#d4a26f] md:text-[20px] text-[16px]"></i>-->
        <!--          <span class="block md:text-[20px] text-[14px]">{{ email }}</span>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity .2s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>