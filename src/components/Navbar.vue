<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '../store/UserStore';
import { useRouter } from "vue-router";
import { tryOnMounted, useStorage } from '@vueuse/core'
import { watchEffect } from 'vue';


const checkLogout = useStorage("logout",false)
const loginSuccessControl = useStorage("loginControl",Boolean)

const accessToken = useStorage("token","")


const router = useRouter()
const userStore = useUserStore()

watchEffect(async() =>{
  console.log("loginControl",loginSuccessControl.value);
  
  if(loginSuccessControl.value === true){
    await userStore.currentUser()
  }
})

async function logOut() {
  const response = userStore.logout()
  console.log(response);
  if(response === ''){
  checkLogout.value = false
  loginSuccessControl.value = false
   router.push({ name: 'login' })  
  }
}
</script>

<template>
  <div class="w-full flex bg-[#23232d] text-white justify-between border-b-[1px] border-yellow-400 pl-5 pr-5 min-h-[70px] items-center">
    <ul>
      <li class="text-white">Logo</li>
    </ul>
    <ul class="flex gap-2">
      <router-link class="border-[1px] border-orange-500 bg-orange-700 text-white p-1 rounded-md cursor-pointer" :to="{ name: 'homepage' }">Home</router-link>
      <template v-if="checkLogout === false">
        <router-link class="border-[1px] border-orange-500 bg-orange-700 text-white p-1 rounded-md cursor-pointer" :to="{ name: 'login' }">Login</router-link>
        <router-link class="border-[1px] border-orange-500 bg-orange-700 text-white p-1 rounded-md cursor-pointer" :to="{ name: 'register' }">Register</router-link>
      </template>
      <template v-if="checkLogout === true">
        <router-link class="border-[1px] border-orange-500 bg-orange-700 text-white p-1 rounded-md cursor-pointer" :to="{ name: 'login' }">{{ userStore.userProfile?.username }}</router-link>
        <p class="border-[1px] border-orange-500 bg-orange-700 text-white p-1 rounded-md cursor-pointer">balance : {{ userStore.userProfile?.balance }}</p>
        <p class="border-[1px] border-orange-500 bg-orange-700 text-white p-1 rounded-md cursor-pointer" @click="logOut()">Logout</p>
      </template>
    </ul>
  </div>
</template>