<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRaffleStore } from '../store/RaffleStore'
import VInput from '../components/base/V-Input.vue'
import VButton from '../components/base/V-Button.vue'
import { useUserStore} from '../store/UserStore'


const balance = ref<number>()
const maxParticipants = ref<number>()
const userId = ref<string>('')
const raffleStore = useRaffleStore()
const userStore = useUserStore()

async function createRaffle(){
  await userStore.currentUser()
  userId.value = userStore.userProfile._id
  console.log("id",userId.value);
  console.log("balance",balance.value);
  
  await raffleStore.newRaffle(userId.value,balance.value,maxParticipants.value)
}

async function fetchJoinRaffle(raffleId: string, userId: string){
  await raffleStore.joinRaffle(raffleId,userId)
  await raffleStore.getAllRaffles()
}
onMounted(async () => {
  await raffleStore.getAllRaffles()
  console.log(userStore.userProfile._id);
  
})
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-wrap p-1 gap-2">
    <div class="min-w-[300px] p-2 border-[1px] border-black" v-for="raffle in raffleStore.allRaffles">
      <p class="text-green-500 font-bold text-right" v-if="raffle.available === true">Active</p>
      <p>Gift Balance : {{ raffle.giftBalance }} $</p>
      <p>{{ raffle.participants.length }} / {{ raffle.maxParticipants }}</p>
      <p v-for="participants in raffle.participants">{{ participants.username }}</p>
      <div class="w-full flex justify-center items-center">
        <button v-if="raffle.participants.some((user) => user._id === userStore.userProfile._id)" class="text-red-500 p-1">Joined</button>
        <button v-else @click="fetchJoinRaffle(raffle._id,userStore.userProfile._id)" class="border-[1px] border-black p-1">Join</button>
      </div>
    </div>
  </div>
    <div class="flex w-full h-full justify-center items-center">
      <div v-if="userStore.userProfile._id" class="flex flex-col">
      <VInput placeValue="giftbalance" typeValue="number" v-model="balance"></VInput>
      <VInput placeValue="max participants" typeValue="number" v-model="maxParticipants"></VInput>
      <VButton @click="createRaffle()">Create a raffle</VButton>
    </div>
    </div>
  </div>  
</template>