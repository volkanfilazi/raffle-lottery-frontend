<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { useUserStore } from '../store/UserStore';
import { CurrentUser } from '../interfaces/currentUser'
import { useRouter } from "vue-router";

const router = useRouter()
const userStore = useUserStore()
const isLoading = ref<boolean>(true)

async function fetchCurrentUser() {
  await userStore.currentUser()
  
  isLoading.value = false
}

watchEffect(async () => {
  await fetchCurrentUser()
})

async function logOut() {
  userStore.logout()
  router.push({ name: 'login' })
  fetchCurrentUser()
}
</script>

<template>
  <div class="w-full flex justify-between border-b-[1px] border-black pl-5 pr-5 min-h-[50px] items-center">
    <ul>
      <li>Logo</li>
    </ul>
    <ul class="flex gap-2">
      <router-link class="hover:text-yellow-400" :to="{ name: 'homepage' }">Home</router-link>
      <template v-if="!userStore.userProfile">
        <router-link class="hover:text-yellow-400" :to="{ name: 'login' }">Login</router-link>
        <router-link class="hover:text-yellow-400" :to="{ name: 'register' }">Register</router-link>
      </template>
      <template v-else>
        <router-link class="hover:text-yellow-400" :to="{ name: 'login' }">{{ userStore.userProfile.username }}</router-link>
        <p class="cursor-pointer" @click="logOut()">Logout</p>
      </template>
    </ul>
  </div>
</template>