<script setup>
const signUp = () => {

}
</script>

<template>
  <div
      class="md:min-h-[calc(100vh-3em)] min-h-[calc(100vh-2em)] relative grid place-items-center place-content-center size-full sm:py-6 py-2">
    <img alt=""
         class="absolute z-[-500] inset-0 block object-cover brightness-[70%] xl:object-center object-right w-full md:h-[calc(100vh-3em)] h-[calc(100vh-2em)] select-none blur-sm pointer-events-none"
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
        <span class="w-full block text-center font-medium sm:text-[32px] text-[26px] leading-tight">Регистрация</span>
        <form aria-autocomplete="none" autocomplete="off"
              class="flex flex-col gap-6"
              method="post">
          <div
              class="flex flex-col gap-1 border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
            <label class="sm:text-[18px] text-[14px]" for="email">Электронная почта</label>
            <input
                class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]"
                name="email" placeholder="nate.higgers@weeb.com"
                type="email">
            <div class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <!--              <span>Чето неправильно!</span>-->
            </div>
          </div>
          <div
              class="flex flex-col gap-1 border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
            <label class="sm:text-[18px] text-[14px]" for="username">Имя пользователя</label>
            <input
                class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]"
                name="username"
                placeholder="OmenBestWaifu"
                type="text">
            <div class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <!--              <span>Чето неправильно!</span>-->
            </div>
          </div>
          <div
              class="flex flex-col gap-1 border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
            <label class="sm:text-[18px] text-[14px]" for="firstname">Имя</label>
            <input
                class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]"
                name="firstname"
                placeholder="Нейт"
                type="text">
            <div class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <!--              <span>Чето неправильно!</span>-->
            </div>
          </div>
          <div
              class="flex flex-col gap-1 border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
            <label class="sm:text-[18px] text-[14px]" for="lastname">Фамилия</label>
            <input
                class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]"
                name="lastname"
                placeholder="Хиггерс"
                type="text">
            <div class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <!--              <span>Чето неправильно!</span>-->
            </div>
          </div>
          <div
              class="flex flex-col gap-1 border-b-[#C1C1C1] has-[:focus]:border-b-[#d4a26f] border-b-2 transition-colors">
            <label class="sm:text-[18px] text-[14px]" for="password">Пароль</label>
            <input
                class="font-light w-full bg-transparent placeholder-opacity-70 placeholder-[#C1C1C1]
                sm:text-[20px] text-[18px]"
                name="password"
                placeholder="********"
                type="password">
            <div class="ERRORS flex flex-col text-red-600 sm:text-[18px] text-[14px]">
              <!--              <span>Чето неправильно!</span>-->
            </div>
          </div>
        </form>
        <div class="flex flex-col gap-1">
          <button class="w-full rounded-xl transition-all
                          bg-[#d4a26f] hover:bg-[#d4a26f]/80 text-white
                          active:bg-transparent active:ring-[2px] active:ring-[#d4a26f] active:text-[#d4a26f]
                          focus:bg-transparent focus:ring-[2px] focus:ring-[#d4a26f] focus:text-[#d4a26f]
                          py-2 sm:text-[20px] text-[16px] self-end"
                  @click.prevent="signUp">
            Зарегистрироваться
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