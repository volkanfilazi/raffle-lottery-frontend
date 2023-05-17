import { defineStore } from 'pinia'
import { ref } from 'vue'
import { raffleList } from '../interfaces/raffle'
import { useStorage } from '@vueuse/core'

import axios from 'axios'

export const useRaffleStore = defineStore('raffle', () => {
  const KEY = 'http://localhost:5001/api'
  const allRaffles = ref<raffleList[]>([])
  const accessToken = useStorage("token","")

  const config = {
    headers: { Authorization: `Bearer ${accessToken.value}`}
  }

  async function getAllRaffles() {
    try {
      let response = await axios.get<raffleList[]>(`${KEY}/raffles`)
      allRaffles.value = response.data
      
      return response.data
    } catch (error: any) {
      console.log(error);
      
    }
  }

  async function newRaffle(userId: String, giftBalance: String, maxParticipants: String){
    try {
      let response = await axios.post<any>(`${KEY}/raffle`,{
        userId,
        giftBalance,
        maxParticipants
      },config)
      return response.data
    } catch (error) {
      
    }
  }

  return {
    getAllRaffles,
    allRaffles,
    newRaffle
  }
})