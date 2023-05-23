<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '../store/UserStore';
import { useRouter } from "vue-router";
import { tryOnMounted, useStorage } from '@vueuse/core'

const checkLogout = useStorage("logout",false)

const router = useRouter()
const userStore = useUserStore()

onMounted(async() =>{
  await userStore.currentUser()
})

async function logOut() {
  const response = userStore.logout()
  console.log(response);
  if(response === ''){
  checkLogout.value = false
   router.push({ name: 'login' })  
  }
}
</script>

<template>
  <div class="w-full flex bg-[#23232d] text-white justify-between border-b-[1px] border-orange-700 pl-5 pr-5 min-h-[70px] items-center">
    <ul>
      <li class="text-white">Logo</li>
    </ul>
    <ul class="flex gap-2">
      <router-link class="border-[1px] bg-orange-700 text-white border-orange-500 p-1 rounded-md" :to="{ name: 'homepage' }">Home</router-link>
      <template v-if="checkLogout === false">
        <router-link class="border-[1px] border-orange-500 p-1 rounded-md" :to="{ name: 'login' }">Login</router-link>
        <router-link class="border-[1px] border-orange-500 p-1 rounded-md" :to="{ name: 'register' }">Register</router-link>
      </template>
      <template v-if="checkLogout === true">
        <router-link class="border-[1px] bg-orange-700 text-white border-orange-500 p-1 rounded-md" :to="{ name: 'login' }">{{ userStore.userProfile?.username }}</router-link>
        <p class="border-[1px] bg-orange-700 text-white border-orange-500 p-1 rounded-md">balance : {{ userStore.userProfile?.balance }}</p>
        <p class="border-[1px] bg-orange-700 text-white border-orange-500 p-1 rounded-md cursor-pointer" @click="logOut()">Logout</p>
      </template>
    </ul>
  </div>
</template>