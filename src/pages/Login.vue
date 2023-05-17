<script setup lang="ts">
  import { ref } from 'vue';
import { useUserStore } from '../store/UserStore';

  const userStore = useUserStore()
  const email = ref<string>('')
  const password = ref<string>('')

  async function login(){
    const response = await userStore.login(email.value,password.value)
    console.log("test",userStore.loginErrorMessage);
    console.log("test2",userStore.loginSuccessMessage);
    
  }
</script>

<template>
  <div class="flex h-full justify-center items-center w-full">
    <div class="flex flex-col gap-2">
      <input class="border-[1px] border-black" type="text" placeholder="email" v-model="email">
      <input class="border-[1px] border-black" type="text" placeholder="password" v-model="password">
      <button @click="login()" class="border-[1px] border-black">Login</button>
      <div>
        <p class="text-green-500" v-if="userStore.loginSuccessMessage">{{ userStore.loginSuccessMessage }}</p>
        <p class="text-red-500" v-if="userStore.loginErrorMessage">{{ userStore.loginErrorMessage }}</p>
      </div>
    </div>
  </div>
</template>