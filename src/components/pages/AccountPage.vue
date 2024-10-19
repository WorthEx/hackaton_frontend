<script setup>
import {markRaw, onMounted, ref} from "vue";
import string_constants from "@/string_constants.js";
import {jwtDecode} from "jwt-decode";
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import {tokenSaved} from "@/utils.js";
import ChangeUserInfoModal from "@/components/modals/ChangeUserInfoModal.vue";
import {useModal} from "@/components/modals/useModal.js";
import {useAuthStore} from "@/stores/store.js";
import {toast} from "vue3-toastify";

const route = useRoute()
const username = ref("")
const firstname = ref("")
const lastname = ref("")
const city = ref("")
const email = ref("")
const showPen = ref(false)


const modal = useModal()
const authStore = useAuthStore()
// const gradientString = easyMeshGradient({
//   easingStops: 2,
//   saturationRange: [.3, .4],
//   seed: 29
// });

const fullNameEl = ref()
const changeUserInfoButton = ref()

onMounted(async () => {
  if (tokenSaved()) {
    try {
      const urlUsername = route.params.userId;
      const jwtUsername = jwtDecode(localStorage.getItem(string_constants.accessToken)).sub;
      if (urlUsername !== jwtUsername) {
        await router.push("/sign-in")
      }
    } catch (_) {
      localStorage.clear()
      await router.push("/sign-in")
    }

    // todo заменить на получение данных по запросу
    const userFromToken = jwtDecode(localStorage.getItem(string_constants.accessToken));
    username.value = userFromToken.sub;
    firstname.value = userFromToken.firstname.charAt(0).toUpperCase() + userFromToken.firstname.slice(1);
    lastname.value = userFromToken.lastname.charAt(0).toUpperCase() + userFromToken.lastname.slice(1);
    email.value = userFromToken.email;
    city.value = userFromToken.city;
    updateLSUserData()

  } else await router.push("/sign-in")
})

const copyUsername = () => {
  navigator.clipboard.writeText(username.value)
  toast.success("Имя пользователя скопировано!")
}

const openChangeUserInfoModal = () => {
  hideFullName()
  modal.component.value = markRaw(ChangeUserInfoModal)
  modal.showModal()
}

const closeChangeUserInfoModal = () => {
  revealFullName()
  modal.hideModal()
  changeUserInfoButton.value.blur()
  console.log("CLOSED")
}

const hideFullName = () => {
  showPen.value = false
  fullNameEl.value.classList.add("md:translate-x-[calc(-100%-100px)]", "translate-x-[calc(-100%-25px)]")
}

const revealFullName = () => {
  fullNameEl.value.classList.remove("md:translate-x-[calc(-100%-100px)]", "translate-x-[calc(-100%-25px)]")
}

const updateDataEvent = (newData) => {
  firstname.value = newData.firstName
  lastname.value = newData.lastName
  city.value = newData.city
  updateLSUserData()
  closeChangeUserInfoModal()
}

// Применять только после назначения реактивных данных
const updateLSUserData = () => {
  localStorage.setItem(string_constants.firstname, firstname.value);
  localStorage.setItem(string_constants.lastname, lastname.value);
  localStorage.setItem(string_constants.city, city.value);
}


</script>

<template>
  <Teleport to="#modal">
    <Transition>
      <component :is="modal.component.value"
                 v-if="modal.show.value"
                 v-bind="modal.component.value === ChangeUserInfoModal ? {firstName: firstname, lastName: lastname, city: city} : null"
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
        <!--        <img alt="bruh" class="size-full object-cover object-center pointer-events-none select-none"-->
        <!--             src="@/assets/images/white_bookshelf.jpg">-->
        <div
            alt="bruh"
            class="size-full object-cover object-center pointer-events-none select-none"
            style="background: radial-gradient(at 15.799955592254433% 46.17403929372007%,
           hsla(328.522539392088, 48.893128219778404%, 55.466977181983104%, 1) 0%,
           hsla(328.522539392088, 48.893128219778404%, 55.466977181983104%, 0) 67.12481330318094%),

           radial-gradient(at 92.65605509280763% 13.902558603347417%,
           hsla(168.1878219686728, 44.61242481349864%, 57.495313488373%, 1) 0%,
           hsla(168.1878219686728, 44.61242481349864%, 57.495313488373%, 0) 50.04071987827925%),

           radial-gradient(at 90.9172008837957% 6.40405942170377%,
           hsla(187.79724255218187, 44.53479642476801%, 42.344758436319566%, 1) 0%,
           hsla(187.79724255218187, 44.53479642476801%, 42.344758436319566%, 0) 67.62584450601499%),

           radial-gradient(at 93.74506167793977% 88.11019413757705%,
           hsla(214.90208602030128, 43.347333345441974%, 52.134046198507235%, 1) 0%,
           hsla(214.90208602030128, 43.347333345441974%, 52.134046198507235%, 0) 50.083782756527896%),

           radial-gradient(at 27.8621976630451% 46.99372162838392%,
           hsla(165.8162570861023, 44.73039738020713%, 42.867525798707746%, 1) 0%,
           hsla(165.8162570861023, 44.73039738020713%, 42.867525798707746%, 0) 57.263580973091855%),

           radial-gradient(at 8.937314840884012% 79.32838524312152%,
           hsla(30, 54%, 63%, 1) 20%,
           hsla(45.532224032253744, 37.98462475240514%, 52.52586567769462%, 0) 65.8621442612026%),

           radial-gradient(at 48.54200664786477% 88.91257835422475%,
           hsla(256.7017793303117, 43.430803036442775%, 42.36808663306118%, 1) 0%,
           hsla(256.7017793303117, 43.430803036442775%, 42.36808663306118%, 0) 53.46429451785816%),

           radial-gradient(at 41.1727095211819% 68.78920332563052%,
           hsla(316.1246778815319, 49.23345502229654%, 47.50752683496578%, 1) 0%,
           hsla(316.1246778815319, 49.23345502229654%, 47.50752683496578%, 0) 55.223733288084745%),
           linear-gradient(hsla(328.522539392088, 48.893128219778404%, 55.466977181983104%, 1),
           hsla(328.522539392088, 48.893128219778404%, 55.466977181983104%, 1))"></div>
        <div
            class="rounded-full absolute md:bottom-[-75px] bottom-[-45px] md:left-[100px] left-[25px] bg-[#d4a26f] md:min-h-[150px] md:min-w-[150px] md:max-h-[150px] md:max-w-[150px]
                    min-h-[90px] min-w-[90px] max-h-[90px] max-w-[90px] overflow-hidden md:ring-[4px] ring-[2px] ring-[#101415] flex justify-center items-center select-none">
            <span class="font-normal text-[#101415] uppercase md:text-[55px] text-[30px]">{{
                firstname[0] + lastname[0]
              }}</span>
        </div>
        <div
            class="absolute sm:bottom-2 bottom-1 sm:right-2 right-1 select-none
            text-[#eeeeee] md:text-[22px] text-[16px] font-light cursor-pointer active:text-black transition-colors w-fit"
            @click="copyUsername()">@{{ username }}
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div
            class="w-full md:mt-[75px] mt-[45px] md:py-4 py-2 md:px-[100px] px-[25px] flex flex-col leading-tight select-none">
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
              class="text-[#9C9C9C] md:text-[20px] text-[16px] cursor-pointer hover:text-[#d4a26f]/80 transition-colors w-fit"
              @click="copyUsername()">@{{ username }}</span>
        </div>
        <div class="flex flex-row md:mt-[75px] mt-[45px] md:pr-8 pr-2 md:py-4 py-2">
          <div ref="changeUserInfoButton"
               class="size-fit md:rounded-xl rounded-md transition-all flex justify-center cursor-pointer
                          bg-transparent ring-[2px] ring-[#d4a26f] text-[#d4a26f]
                          hover:bg-[#d4a26f] hover:ring-transparent hover:text-white
                          active:scale-[98%] md:py-2 py-1  md:px-4 px-2 sm:text-[20px] text-[16px] select-none"
               @click="openChangeUserInfoModal()">Изменить
          </div>
        </div>
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