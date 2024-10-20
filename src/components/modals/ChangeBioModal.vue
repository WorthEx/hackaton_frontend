<script setup>
import Modal from "@/components/modals/Modal.vue";
import {onMounted, ref} from "vue";
import {toast} from "vue3-toastify";
import accountAPI from "@/apis/AccountAPI.js";

const props = defineProps({
  bio: String
})
const emit = defineEmits(['updateBioEvent'])

const newBio = ref("")
const loadingState = ref(false)
const errorOccurred = ref(false)


const updateBio = async () => {
  if (newBio.value === props.bio) {
    loadingState.value = false
    emit('closeModal')
    return
  }
  loadingState.value = true
  try {
    const response = await accountAPI.updateBio(newBio.value)
    if (response.status === 200) {
      errorOccurred.value = false
      const responseData = response.data
      console.log(responseData)
      toast.success("Биография изменена!")
      emit('updateBioEvent', newBio.value)
    }
  } catch (_) {
    toast.error("Произошла ошибка, повторите попытку позже.")
    errorOccurred.value = true
  } finally {
    loadingState.value = false
  }
}

document.onkeydown = async (e) => {
  if (e.key === 'Enter') await updateBio()
}

onMounted(() => {
  newBio.value = props.bio.trim()
})

</script>

<template>
  <Modal title="Изменение&nbsp;биографии">
    <form class="flex flex-col gap-4">
      <div
          class="flex flex-col gap-1 *:w-full border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
        <label class="sm:text-[18px] text-[14px]" for="bio>">Био</label>
        <textarea
            v-model="newBio"
            class="resize-none font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1] sm:text-[18px] text-[16px] no-scrollbar"
            name="bio>"
            placeholder="В поисках адекватных тиммейтов..."
            rows="3"
            type="text"/>
      </div>
      <span
          :class="errorOccurred ? 'block' :'hidden'"
          class="text-[#FF5F5F] sm:text-[18px] text-[14px]">Произошла ошибка.</span>
      <div class="flex flex-row gap-2 *:basis-1/2">
        <button class="w-full rounded-xl transition-all flex justify-center
                          hover:bg-[#d4a26f] hover:text-white
                          bg-transparent ring-[1.5px] ring-[#d4a26f] text-[#d4a26f]
                          active:scale-[98%]
                          py-2 sm:text-[18px] text-[14px]" type="submit"
                @click.prevent.stop="$emit('closeModal')">
          <span>Отменить</span>
        </button>
        <button :class="!loadingState && 'py-2'"
                class="w-full rounded-xl transition-all flex justify-center items-center
                          bg-[#d4a26f] text-white
                          disabled:bg-[#d4a26f]/50 disabled:text-white/60
                          enabled:hover:bg-transparent enabled:hover:ring-[1.5px] enabled:hover:ring-[#d4a26f] enabled:hover:text-[#d4a26f]
                          enabled:active:scale-[98%]
                          sm:text-[18px] text-[14px]" type="submit"
                @click.prevent.stop="updateBio">
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