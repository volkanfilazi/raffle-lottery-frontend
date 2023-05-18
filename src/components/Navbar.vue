<script setup lang="ts">
  import { onMounted, ref, watchEffect } from 'vue';
  import { useUserStore } from '../store/UserStore';
  import { CurrentUser } from '../interfaces/currentUser'
  import { useRouter } from "vue-router";

  const router = useRouter()
  const userName = ref<string>('')
  const userStore = useUserStore()
  const isLoading = ref<boolean>(true)
  const response = ref<CurrentUser|null>(null)

  async function fetchCurrentUser(){
    response.value = await userStore.currentUser()
    isLoading.value = false
  }

  watchEffect(async () =>{
    await fetchCurrentUser()
  })

  async function logOut(){
    userStore.logout()
    router.push({ name: 'login'})
    fetchCurrentUser() 
  }
</script>

<template>
  <div class="w-full flex justify-between border-b-[1px] border-black pl-5 pr-5 min-h-[50px] items-center">
    <ul>
      <li>Logo</li>
    </ul>
    <ul class="flex gap-2">
      <li class="cursor-pointer" v-if="isLoading">Loading...</li>
      <li>Homepage</li>
      <li class="cursor-pointer font-bold" v-if="!isLoading && !response">Login</li>
      <li class="cursor-pointer font-bold" v-if="!isLoading && !response">Register</li>
      <li>Profile</li>
      <li class="cursor-pointer text-yellow-400" v-if="!isLoading && response"><span v-if="response.admin">admin</span><span v-if="!response.admin">user</span> {{ response.name }}</li>
      <li v-if="!isLoading && response" class="cursor-pointer" @click="logOut()">logout</li>
    </ul>
  </div>
</template>