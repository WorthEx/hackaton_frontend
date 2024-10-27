<script setup>
import {ref, watch} from "vue";
import {validateSignUpForm} from "@/components/validation/validate.js";
import accountAPI from "@/apis/AccountAPI.js";
import {toast} from "vue3-toastify";
import router from "@/router/index.js";

const email = ref("")
const emailDirty = ref(false)
const username = ref("")
const usernameDirty = ref(false)
const name = ref("")
const nameDirty = ref(false)
const surname = ref("")
const surnameDirty = ref(false)
const password = ref("")
const passwordDirty = ref(false)
const repeatPassword = ref("")
const repeatPasswordDirty = ref(false)
const fieldErrors = ref({
      email: [],
      username: [],
      name: [],
      surname: [],
      password: [],
      repeatPassword: []
    }
)

const passwordHidden = ref(true)
const repeatPasswordHidden = ref(true)
const loadingState = ref(false)

watch([email, username, name, surname, password, repeatPassword], _ => {
  validateFields()
})

const validateFields = () => {
  let errors = validateSignUpForm(email.value, username.value, name.value, surname.value, password.value, repeatPassword.value)
  fieldErrors.value = errors
  let numberOfErrors = 0
  Object.values(errors).forEach(errorArray => {
    numberOfErrors += errorArray.length
  })
  return numberOfErrors
}

const signUp = async () => {
  emailDirty.value = true
  usernameDirty.value = true
  nameDirty.value = true
  surnameDirty.value = true
  passwordDirty.value = true
  repeatPasswordDirty.value = true
  const numberOfErrors = validateFields()
  if (numberOfErrors === 0) {
    loadingState.value = true
    try {
      const response = await accountAPI.register({
        username: username.value,
        firstName: name.value,
        lastName: surname.value,
        email: email.value,
        password: password.value
      })
      if (response.status === 200) {
        await router.push("/sign-in")
        toast.success("Проверьте электронную почту для подтверждения регистрации.")
      }
    } catch (e) {
      if (e.includes("409")) toast.error("Аккаунт с таким именем пользователя уже существует! Используйте другое.")
      else toast.error("Что-то пошло не так! Повторите попытку позже.")
    } finally {
      loadingState.value = false
    }
  }
}

document.onkeydown = async (e) => {
  if (e.key === 'Enter') await signUp()
}
</script>

<template>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] relative grid place-items-center place-content-center size-full sm:py-6 py-2">
    <img alt=""
         class="absolute z-[-500] inset-0 block object-cover brightness-[70%] xl:object-center object-right size-full select-none blur-sm pointer-events-none"
         src="@/assets/images/bookshelfs_2_comp.jpg">
    <div
        class="bg-black/25 backdrop-blur-lg rounded-2xl ring-white/10 ring-1 overflow-hidden sm:shadow-[0px_0px_50px_15px_rgba(212,162,111,.35)]
        flex flex-row
        2xl:w-[calc(70vw)] sm:w-[calc(65vw)] w-[calc(100vw-1em)]
        lg:max-w-[1100px]">
      <div class="lg:block hidden xl:basis-[50%] basis-0">
        <img alt="" class="object-cover size-full select-none pointer-events-none"
             src="@/assets/images/stairs_comp.jpg">
      </div>
      <div
          class="min-h-full sm:px-6 p-4 xl:basis-[50%] basis-full select-none flex flex-col justify-center gap-6 text-white">
        <span class="w-full block text-center font-medium sm:text-[32px] text-[26px] leading-none">Регистрация</span>
        <form
            autocomplete="off"
            class="flex flex-col gap-3"
            method="post">
          <div
              class="flex flex-col gap-1">
            <label class="sm:text-[18px] text-[14px]" for="email">Электронная почта</label>
            <input
                v-model.trim="email"
                aria-autocomplete="none"
                class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]
border-b-[#C1C1C1] focus:border-b-[#d4a26f] border-b-2 transition-colors"
                name="email"
                placeholder="nate.higgers@weeb.com" type="email"
                @input="emailDirty = true">
            <div v-if="fieldErrors.email.length > 0 && emailDirty"
                 class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <span v-for="error in fieldErrors.email">
                {{ error }}
              </span>
            </div>
          </div>
          <div
              class="flex flex-col gap-1">
            <label class="sm:text-[18px] text-[14px]" for="username">Имя пользователя</label>
            <input
                v-model.trim="username"
                aria-autocomplete="none"
                class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]
border-b-[#C1C1C1] focus:border-b-[#d4a26f] border-b-2 transition-colors"
                name="username"
                placeholder="OmenBestWaifu"
                type="text"
                @input="usernameDirty = true">
            <div v-if="fieldErrors.username.length > 0 && usernameDirty"
                 class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <span v-for="error in fieldErrors.username">
                {{ error }}
              </span>
            </div>
          </div>
          <div
              class="flex flex-col gap-1">
            <label class="sm:text-[18px] text-[14px]" for="firstname">Имя</label>
            <input
                v-model.trim="name"
                aria-autocomplete="none"
                class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]
border-b-[#C1C1C1] focus:border-b-[#d4a26f] border-b-2 transition-colors"
                name="firstname"
                placeholder="Нейт"
                type="text"
                @input="nameDirty = true">
            <div v-if="fieldErrors.name.length > 0 && nameDirty"
                 class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <span v-for="error in fieldErrors.name">
                {{ error }}
              </span>
            </div>
          </div>
          <div
              class="flex flex-col gap-1">
            <label class="sm:text-[18px] text-[14px]" for="lastname">Фамилия</label>
            <input
                v-model.trim="surname"
                aria-autocomplete="none"
                class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]
border-b-[#C1C1C1] focus:border-b-[#d4a26f] border-b-2 transition-colors"
                name="lastname"
                placeholder="Хиггерс"
                type="text"
                @input="surnameDirty = true">
            <div v-if="fieldErrors.surname.length > 0 && surnameDirty"
                 class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <span v-for="error in fieldErrors.surname">
                {{ error }}
              </span>
            </div>
          </div>
          <div
              class="flex flex-col gap-1">
            <label class="sm:text-[18px] text-[14px]" for="password">Пароль</label>
            <div class="flex flex-row">
              <input
                  v-if="passwordHidden"
                  v-model.trim="password"
                  aria-autocomplete="none"
                  autocomplete="false"
                  class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]
border-b-[#C1C1C1] focus:border-b-[#d4a26f] border-b-2 transition-colors"
                  name="password"
                  placeholder="********"
                  type="password"
                  @input="passwordDirty = true">
              <input
                  v-else
                  v-model="password"
                  aria-autocomplete="none"
                  autocomplete="false"
                  class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]
border-b-[#C1C1C1] focus:border-b-[#d4a26f] border-b-2 transition-colors"
                  name="password"
                  placeholder="********"
                  type="text"
                  @input="passwordDirty = true">
              <div class="flex items-center justify-center ps-2 cursor-pointer">
                <i
                    :class="passwordHidden ? 'bi-eye' : 'bi-eye-slash'"
                    class="bi block transition-colors hover:text-[#d4a26f] text-white text-[20px] sm:text-[25px]"
                    @click.prevent="passwordHidden = !passwordHidden"></i>
              </div>
            </div>
            <div v-if="fieldErrors.password.length > 0 && passwordDirty"
                 class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <span v-for="error in fieldErrors.password">
                {{ error }}
              </span>
            </div>
          </div>
          <div
              class="flex flex-col gap-1 ">
            <label class="sm:text-[18px] text-[14px]" for="repeatPassword">Подтверждение пароля</label>
            <div class="flex flex-row">
              <input
                  v-if="repeatPasswordHidden"
                  v-model.trim="repeatPassword"
                  aria-autocomplete="none"
                  autocomplete="false"
                  class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]
border-b-[#C1C1C1] focus:border-b-[#d4a26f] border-b-2 transition-colors"
                  name="repeatPassword"
                  placeholder="********"
                  type="password"
                  @input="repeatPasswordDirty = true">
              <input
                  v-else
                  v-model="repeatPassword"
                  aria-autocomplete="none"
                  autocomplete="false"
                  class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]
border-b-[#C1C1C1] focus:border-b-[#d4a26f] border-b-2 transition-colors"
                  name="repeatPassword"
                  placeholder="********"
                  type="text"
                  @input="repeatPasswordDirty = true">
              <div class="flex items-center justify-center ps-2 cursor-pointer">
                <i
                    :class="repeatPasswordHidden ? 'bi-eye' : 'bi-eye-slash'"
                    class="bi block transition-colors hover:text-[#d4a26f] text-white text-[20px] sm:text-[25px]"
                    @click.prevent="repeatPasswordHidden = !repeatPasswordHidden"></i>
              </div>
            </div>
            <div v-if="fieldErrors.repeatPassword.length > 0 && repeatPasswordDirty"
                 class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <span v-for="error in fieldErrors.repeatPassword">
                {{ error }}
              </span>
            </div>
          </div>
        </form>
        <div class="flex flex-col gap-1">
          <button class="w-full rounded-xl transition-all flex justify-center
                          bg-[#d4a26f] text-white
                          hover:bg-transparent hover:ring-[2px] hover:ring-[#d4a26f] hover:text-[#d4a26f]
                          active:scale-[98%]
                          py-2 sm:text-[20px] text-[16px] self-end" type="submit"
                  @click.prevent.stop="signUp">
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
            <span v-else>Зарегистрироваться</span>
          </button>
          <RouterLink class="mx-auto w-fit" to="/sign-in">
              <span
                  class="sm:text-[18px] text-[14px] font-light hover:underline decoration-[#d4a26f] leading-none">Уже&nbsp;есть&nbsp;аккаунт?&nbsp;Войти.</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>