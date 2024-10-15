<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import accountAPI from "@/apis/AccountAPI.js";

const route = useRoute()
const confirmationCode = route.query.code
const confirmationStatus = ref('loading')

const verifyRegistration = async (confirmationCode) => {
  try {
    const response = await accountAPI.verifyRegistration(confirmationCode)
    if (response.status === 200) confirmationStatus.value = 'success'
  } catch (e) {
    confirmationStatus.value = 'error'
  }
}

onMounted(async _ => {
  if (confirmationCode) await verifyRegistration(confirmationCode)
})
</script>

<template>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] relative grid place-items-center place-content-center size-full lg:px-12 px-4">
    <img alt=""
         class="absolute z-[-500] inset-0 block object-cover xl:object-center brightness-[70%] object-right w-full md:h-[calc(100vh-3em)] h-[calc(100vh-2em)] select-none blur-sm pointer-events-none"
         src="@/assets/images/bookshelfs_2_comp.jpg">

    <div class="flex flex-col justify-center items-center">
      <div
          v-if="confirmationStatus === 'loading'"
          class="lg:text-[42px] text-[18px] font-medium text-[#eeeeee] select-none text-center">
        Registration confirmation <span class="rounded-md bg-[#d4a26f] px-1.5 sm:py-1 py-0.5">in&nbsp;progress</span>
      </div>
      <div
          v-else-if="confirmationStatus === 'error'"
          class="lg:text-[42px] text-[18px] font-medium text-[#eeeeee] select-none text-center">
        Unexpected error has occurred! Please let your backend dev sleep and <span
          class="rounded-md bg-[#d4a26f] px-1.5 sm:py-1 py-0.5">try&nbsp;again&nbsp;later.</span>
      </div>
      <div
          v-else
          class="lg:text-[42px] text-[18px] font-medium text-[#eeeeee] select-none text-center">
        Registration confirmed! Now you can
        <RouterLink
            class="" to="/sign-in">
          <span
              class="hover:text-[#eeeeee] hover:underline decoration-2 decoration-[#d4a26f] text-[#d4a26f] transition-colors">log
          in to your brand new account!</span>
        </RouterLink>
      </div>
      <svg v-if="confirmationStatus === 'loading'" class="lg:size-[150px] size-[80px]" viewBox="0 0 200 200"
           xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="65" fill="#FFFFFF" r="15" stroke="#FFFFFF" stroke-width="2">
          <animate attributeName="cy" begin="-.4" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                   repeatCount="indefinite" values="65;135;65;"></animate>
        </circle>
        <circle cx="100" cy="65" fill="#FFFFFF" r="15" stroke="#FFFFFF" stroke-width="2">
          <animate attributeName="cy" begin="-.2" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                   repeatCount="indefinite" values="65;135;65;"></animate>
        </circle>
        <circle cx="160" cy="65" fill="#FFFFFF" r="15" stroke="#FFFFFF" stroke-width="2">
          <animate attributeName="cy" begin="0" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1"
                   repeatCount="indefinite" values="65;135;65;"></animate>
        </circle>
      </svg>
    </div>
  </div>
</template>

<style scoped>

</style>