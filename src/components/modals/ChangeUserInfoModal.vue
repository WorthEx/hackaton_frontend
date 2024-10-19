<script setup>
import Modal from "@/components/modals/Modal.vue";
import {onMounted, ref, watch} from "vue";
import {toast} from "vue3-toastify";
import accountAPI from "@/apis/AccountAPI.js";

const props = defineProps({
  firstName: String,
  lastName: String,
  city: String
})
const emit = defineEmits(['updateDataEvent'])

const newUserInfo = ref({
  firstName: "",
  lastName: "",
  city: ""
})
const loadingState = ref(false)
const errorOccurred = ref(false)
const fieldsEmpty = ref(false)

watch(newUserInfo, (value) => {
  if (value.firstName === "" || value.lastName === "") {
    fieldsEmpty.value = true
  } else if (value.firstName !== "" && value.lastName !== "") {
    fieldsEmpty.value = false
  }
}, {deep: true})

const updateUserInfo = async () => {
  if (newUserInfo.value.firstName === props.firstName &&
      newUserInfo.value.lastName === props.lastName &&
      newUserInfo.value.city === props.city) {
    loadingState.value = false
    emit('closeModal')
    return;
  }
  if (newUserInfo.value.firstName !== "" && newUserInfo.value.lastName !== "") {
    fieldsEmpty.value = false
    loadingState.value = true
    try {
      const response = await accountAPI.updateUserInfo(newUserInfo.value)
      if (response.status === 200) {
        errorOccurred.value = false
        const responseData = response.data
        console.log(responseData)
        toast.success("Данные профиля обновлены!")
        emit('updateDataEvent', newUserInfo.value)
      }
    } catch (_) {
      toast.error("Произошла ошибка, повторите попытку позже.")
      errorOccurred.value = true
    } finally {
      loadingState.value = false
    }
  } else {
    fieldsEmpty.value = true
  }
}

document.onkeydown = async (e) => {
  if (e.key === 'Enter') await updateUserInfo()
}

onMounted(() => {
  newUserInfo.value = {...props}
})

</script>

<template>
  <Modal title="Изменение&nbsp;профиля">
    <form class="flex flex-col gap-4">
      <div
          class="flex flex-col gap-1 *:w-full border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
        <label class="sm:text-[18px] text-[14px]" for="firstname">Имя<span
            class="text-[#FF5F5F]"> *</span></label>
        <input
            v-model="newUserInfo.firstName"
            class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
              sm:text-[20px] text-[18px]"
            name="firstname"
            placeholder="Мариса"
            type="text">
      </div>
      <div
          class="flex flex-col gap-1 *:w-full border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
        <label class="sm:text-[18px] text-[14px]" for="lastname">Фамилия<span
            class="text-[#FF5F5F]"> *</span></label>
        <input
            v-model="newUserInfo.lastName"
            class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
              sm:text-[20px] text-[18px]"
            name="lastname"
            placeholder="Кирисамэ"
            type="text">
      </div>
      <div
          class="flex flex-col gap-1 *:w-full border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
        <label class="sm:text-[18px] text-[14px]" for="city">Город</label>
        <input
            v-model="newUserInfo.city"
            class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
              sm:text-[20px] text-[18px]"
            name="city"
            placeholder="Токио, Япония"
            type="text">
      </div>
      <span
          :class="errorOccurred ? 'block' :'hidden'"
          class="text-[#FF5F5F] sm:text-[18px] text-[14px]">Произошла ошибка.</span>
      <span
          :class="fieldsEmpty ? 'block' :'hidden'"
          class="text-[#FF5F5F] sm:text-[18px] text-[14px]">Заполните обязательные поля!</span>
      <div class="flex flex-row gap-2 *:basis-1/2">
        <button class="w-full rounded-xl transition-all flex justify-center
                          hover:bg-[#d4a26f] hover:text-white
                          bg-transparent ring-[1.5px] ring-[#d4a26f] text-[#d4a26f]
                          active:scale-[98%]
                          py-2 sm:text-[18px] text-[14px]" type="submit"
                @click.prevent.stop="$emit('closeModal')">
          <span>Отменить</span>
        </button>
        <button :class="!loadingState && 'py-2'" :disabled="fieldsEmpty"
                class="w-full rounded-xl transition-all flex justify-center items-center
                          bg-[#d4a26f] text-white
                          disabled:bg-[#d4a26f]/50 disabled:text-white/60
                          enabled:hover:bg-transparent enabled:hover:ring-[1.5px] enabled:hover:ring-[#d4a26f] enabled:hover:text-[#d4a26f]
                          enabled:active:scale-[98%]
                          sm:text-[18px] text-[14px]" type="submit"
                @click.prevent.stop="updateUserInfo">
          <svg v-if="loadingState" class="max-h-[2em] h-full" viewBox="0 0 200 200"
               xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="65" fill="#ffffff" r="10" stroke="#ffffff" stroke-width="2">
              <animate attributeName="cy" begin="-.4" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                       repeatCount="indefinite" values="65;135;65;"></animate>
            </circle>
            <circle cx="100" cy="65" fill="#ffffff" r="10" stroke="#ffffff" stroke-width="2">
              <animate attributeName="cy" begin="-.2" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                       repeatCount="indefinite" values="65;135;65;"></animate>
            </circle>
            <circle cx="160" cy="65" fill="#ffffff" r="10" stroke="#ffffff" stroke-width="2">
              <animate attributeName="cy" begin="0" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                       repeatCount="indefinite" values="65;135;65;"></animate>
            </circle>
          </svg>
          <span v-else>Сохранить</span>
        </button>
      </div>
    </form>
  </Modal>
</template>

<style scoped>

</style>