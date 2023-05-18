<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../store/UserStore';
import VInput from '../components/base/V-Input.vue';
import VButton from '../components/base/V-Button.vue'

const userStore = useUserStore()
const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

const drawerToogle = ref(false)

async function register() {
  await userStore.register(username.value, email.value, password.value)
  if (userStore.registerErrorMessage) {
    drawerToogle.value = true
    setTimeout(() => {
      drawerToogle.value = false
    }, 2000)
  }
  if(userStore.registerSuccessMessage){
    drawerToogle.value = true
    setTimeout(() =>{
      drawerToogle.value = false
    },2000)
  }
}
</script>
<template>
  <div class="flex h-full justify-center items-center w-full">
    <div class="flex flex-col gap-2">
      <VInput typeValue="string" placeValue="username" v-model="username"></VInput>
      <VInput typeValue="string" placeValue="email" v-model="email"></VInput>
      <VInput typeValue="password" placeValue="password" v-model="password"></VInput>
      <VButton @click="register">Register</VButton>
    </div>
  </div>

  <div class="flex z-[120]">
    <div
      class="fixed bottom-0 right-0 flex flex-col rounded-lg bg-red-500 shadow-sm shadow-black justify-center items-center z-40 w-64 sm-w-64 md:w-[250px] md:h-[100px] mb-20 ml-2 transition-transform duration-500 transform"
      :class="{ 'translate-x-full': !drawerToogle, 'translate-x-0 mr-2 bg-red-500': drawerToogle, 'translate-x-0 mb-2 bg-green-500': userStore.registerSuccessMessage }">
      <p v-if="userStore.registerErrorMessage" class="transition-all duration-500 text-white">{{ userStore.registerErrorMessage }}</p>
      <p v-if="userStore.registerSuccessMessage" class="transition-all duration-500 text-white">{{ userStore.registerSuccessMessage }}</p>
    </div>
  </div>
</template>