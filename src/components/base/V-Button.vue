<script setup lang="ts">
import { promiseTimeout } from '@vueuse/shared';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const isLoading = ref(false)
const clicked = async () => {
  isLoading.value = true
  await promiseTimeout(3000)
  isLoading.value = false
}

</script>

<template>
  <button @click.self="clicked()" :disabled="isLoading"
    class="flex justify-center items-center bg-yellow-400 bg-transparent border-[1px] border-black min-w-[150px] min-h-[34px] hover:bg-yellow-300 transition-all ease-in duration-100 hover:text-black p-1 rounded-lg text-black">
    <Icon v-if="isLoading" icon="eos-icons:bubble-loading" color="black" class="text-black" />
    <slot v-else></slot>
  </button>
</template>

<style scoped>
:disabled {
  opacity: 0.50;
  pointer-events: none
}
</style>