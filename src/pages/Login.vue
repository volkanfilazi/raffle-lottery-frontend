<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { useUserStore } from '../store/UserStore';
import { useRouter } from "vue-router";
import VInput from "../components/base/V-Input.vue"
import VButton from "../components/base/V-Button.vue"
import VCheckbox from "../components/base/V-Checkbox.vue"
import { useStorage } from "@vueuse/core";


const router = useRouter();

const userStore = useUserStore()
const email = ref<string>('')
const password = ref<string>('')
const checked = ref(false)
const savedEmail = useStorage("email", "")
const savedPassword = useStorage("password", "")
const loginSuccessControl = useStorage("loginControl",false)

const checkLogout = useStorage("logout", Boolean)

const drawerToogle = ref(false)

onMounted(() => {
  if (checked.value === true) {
    email.value = savedEmail.value
    password.value = savedPassword.value
  }
})

useStorage("check", checked)

async function login() {
  const response = await userStore.login(email.value, password.value)
  if (response) {
    loginSuccessControl.value = true
  } 

  if(loginSuccessControl.value === true){
    await userStore.currentUser()
  }

  setTimeout(async () => {
    checkLogout.value = true
    router.push({ name: 'homepage', });
  }, 2000)

  if (userStore.loginErrorMessage) {
    drawerToogle.value = true
    setTimeout(() => {
      drawerToogle.value = false
    }, 2000)
  }
  if (userStore.loginSuccessMessage) {
    drawerToogle.value = true
    setTimeout(() => {
      drawerToogle.value = false
    }, 2000)
  }
  rememberMe()
}

function rememberMe() {
  if (checked.value) {
    savedEmail.value = email.value
    savedPassword.value = password.value
  } else {
    savedEmail.value = ''
    savedPassword.value = ''
  }
}
</script>

<template>
  <div class="flex h-full justify-center text-white items-center w-full">
    <div class="flex flex-col gap-2">
      <VInput placeValue="email" typeValue="string" v-model="email"></VInput>
      <VInput placeValue="password" typeValue="password" v-model="password"></VInput>
      <VButton @click="login()">Login</VButton>
      <div class="flex justify-start items-center gap-1 w-full pl-1">
        <VCheckbox class="cursor-pointer" :open="checked" @click="checked = !checked"></VCheckbox>
        <h3 @click="checked = !checked" class="text-[14px] cursor-pointer">Remember me</h3>
      </div>
      <p class="text-white">You dont have account? <span class="text-yellow-400 cursor-pointer"
          @click="router.push({ name: 'register' })">Register</span></p>
    </div>
    <div class="flex z-[120]">
      <div
        class="fixed bottom-0 right-0 flex flex-col rounded-lg bg-red-500 shadow-sm shadow-black justify-center items-center z-40 w-64 sm-w-64 md:w-[250px] md:h-[100px] mb-20 ml-2 transition-transform duration-500 transform"
        :class="{ 'translate-x-full': !drawerToogle, 'translate-x-0 mr-2': drawerToogle, 'translate-x-0 mb-2 bg-green-500': userStore.loginSuccessMessage }">
        <p v-if="userStore.loginErrorMessage" class="transition-all duration-500 text-white">{{
          userStore.loginErrorMessage }}</p>
        <p v-if="userStore.loginSuccessMessage" class="transition-all duration-500 text-white">{{
          userStore.loginSuccessMessage }}</p>
      </div>
    </div>
  </div>
</template>