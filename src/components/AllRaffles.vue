<script setup lang="ts">
import { onMounted } from 'vue';
import { useRaffleStore } from '../store/RaffleStore'

const raffleStore = useRaffleStore()

onMounted(async () => {
  const response = await raffleStore.getAllRaffles()
})
</script>

<template>
  <div class="flex p-1 border-b-[1px] border-black">
    <div class="min-w-[300px] border-[1px] border-black" v-for="raffle in raffleStore.allRaffles">
      <p>{{ raffle.giftBalance }}</p>
      <p v-if="raffle.available === true">Active</p>
      <p>{{ raffle.maxParticipants }}</p>
      <p v-for="participants in raffle.participants">{{ participants.username }}</p>
    </div>
  </div>
</template>