<script setup lang="ts">
  import { ref } from 'vue';
import { useUserStore } from '../store/UserStore';

  const userStore = useUserStore()
  const username = ref<string>('')
  const email = ref<string>('')
  const password = ref<string>('')

  async function register(){
    const response = await userStore.register(username.value, email.value, password.value)
    console.log("test1",userStore.registerErrorMessage);
    
    console.log(response);
    
  }
</script>
<template>
  <div class="flex h-full justify-center items-center w-full">
    <div class="flex flex-col gap-2">
      <input class="border-[1px] border-black" type="text" placeholder="username" v-model="username">
      <input class="border-[1px] border-black" type="text" placeholder="email" v-model="email">
      <input class="border-[1px] border-black" type="text" placeholder="password" v-model="password">
      <button @click="register()" class="border-[1px] border-black">Register</button>
      <div>
        <p class="text-green-500" v-if="userStore.registerSuccessMessage">{{ userStore.registerSuccessMessage }}</p>
        <p class="text-red-500" v-if="userStore.registerErrorMessage">{{ userStore.registerErrorMessage }}</p>
      </div>
    </div>
  </div>
</template>