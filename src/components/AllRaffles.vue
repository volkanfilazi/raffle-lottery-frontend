<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRaffleStore } from '../store/RaffleStore'
import VInput from '../components/base/V-Input.vue'
import VButton from '../components/base/V-Button.vue'
import { useUserStore } from '../store/UserStore'


const balance = ref<number>()
const maxParticipants = ref<number>()
const userId = ref<string>('')
const raffleStore = useRaffleStore()
const userStore = useUserStore()
const raffleDetailToogle = ref<boolean>(false)

async function createRaffle() {
  await userStore.currentUser()
  userId.value = userStore.userProfile._id
  await raffleStore.newRaffle(userId.value, balance.value, maxParticipants.value)
  await raffleStore.getAllRaffles()
}

async function fetchJoinRaffle(raffleId: string, userId: string) {
  await raffleStore.joinRaffle(raffleId, userId)
  await raffleStore.getAllRaffles()
}

async function fetchGetSingleRaffle(id: string) {
  await raffleStore.getASingleRaffle(id)
  raffleDetailToogle.value = true
}

async function fetchStartRaffle(id: string) {
  await raffleStore.startRaffle(id)
  await raffleStore.getAllRaffles()
  await fetchGetSingleRaffle(id)
}
onMounted(async () => {
  await raffleStore.getAllRaffles()
})
</script>

<template>
  <div class="flex flex-col w-full text-white mt-5">
    <div class="flex flex-wrap p-1 gap-2">
      <div @click="fetchGetSingleRaffle(raffle._id)" class="min-w-[300px] p-2 border-[1px] border-yellow-400"
        v-for="raffle in raffleStore.allRaffles">
        <p class="text-green-500 font-bold text-right" v-if="raffle.available === true">Active</p>
        <p class="text-red-500 font-bold text-right" v-else>Finish</p>
        <p>Gift Balance : {{ raffle.giftBalance }} $</p>
        <p>{{ raffle.participants.length }} / {{ raffle.maxParticipants }}</p>
        <div class="w-full flex justify-center items-center">
          <button v-if="raffle.participants.some((user) => user._id === userStore.userProfile?._id)"
            class="text-red-500 p-1">Joined</button>
          <button v-else @click="fetchJoinRaffle(raffle._id, userStore.userProfile?._id)"
            class="border-[1px] border-black p-1">Join</button>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center w-full">
      <div v-if="raffleDetailToogle" class="w-1/2 border-[1px] mt-5 border-yellow-400 p-2">
        <div class="w-full flex flex-col justify-center items-center">
          <div>Creater : {{ raffleStore.singleRaffleResponse?.createdBy }}</div>
          <div>Max Participants :{{ raffleStore.singleRaffleResponse?.maxParticipants }}</div>
          <div>Gift Balance : {{ raffleStore.singleRaffleResponse?.giftBalance }}</div>
          <div class="bg-green-600 text-white p-5 w-[200px] rounded-md">Winner : {{ raffleStore.singleRaffleResponse?.winner?.username }}</div>
        </div>
        <div class="flex gap-2 mt-5">
          <div v-for="participants in raffleStore.singleRaffleResponse?.participants">
            <p class="border-[1px] border-black bg-orange-700 w-20 h-20 flex items-center justify-center">{{
              participants.username }}</p>
          </div>
        </div>
        <div class="flex justify-center mt-5"><button
            v-if="raffleStore.singleRaffleResponse.createdBy === userStore.userProfile._id && raffleStore.singleRaffleResponse.available === true"
            @click="fetchStartRaffle(raffleStore.singleRaffleResponse._id)"
            class="border-[1px] border-yellow-400 p-1">Start Raffle
          </button>
        </div>
      </div>
    </div>

    <div class="flex w-full h-full justify-center items-center">
      <div v-if="userStore.userProfile?._id" class="flex flex-col">
        <VInput placeValue="giftbalance" typeValue="number" v-model="balance"></VInput>
        <VInput placeValue="max participants" typeValue="number" v-model="maxParticipants"></VInput>
        <VButton @click="createRaffle()">Create a raffle</VButton>
      </div>
    </div>
  </div>
</template>