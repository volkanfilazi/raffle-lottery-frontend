import { defineStore } from 'pinia'
import { ref } from 'vue'
import { raffleList } from '../interfaces/raffle'
import axios from 'axios'

export const useRaffleStore = defineStore('raffle', () => {
  const KEY = 'http://localhost:5001/api/raffles'
  const allRaffles = ref<raffleList[]>([])

  async function getAllRaffles() {
    try {
      let response = await axios.get<raffleList[]>(KEY)
      allRaffles.value = response.data
      
      return response.data
    } catch (error: any) {
      console.log(error);
      
    }
  }

  return {
    getAllRaffles,
    allRaffles
  }
})