import { defineStore } from 'pinia'
import { ref } from 'vue'
import { raffleList } from '../interfaces/raffle'
import { useStorage } from '@vueuse/core'

import axios from 'axios'

export const useRaffleStore = defineStore('raffle', () => {
  const KEY = 'http://localhost:5001/api'
  const allRaffles = ref<raffleList[]>([])
  const accessToken = useStorage("token","")
  const joinRaffleErrorMessage = ref<string>('')
  const getSingleRaffleErrorMessage = ref<string>('')
  let singleRaffleResponse = ref<raffleList>();


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

  async function newRaffle(createdBy: String, giftBalance: Number, maxParticipants: number){
    try {
      let response = await axios.post<any>(`${KEY}/raffle`,{
        createdBy,
        giftBalance,
        maxParticipants
      },config)
      return response.data
    } catch (error) {
      
    }
  }

  async function joinRaffle(raffleId: string, userId: string){
    try {
      let response = await axios.post<any>(`${KEY}/raffle/join`,{
        raffleId,
        userId
      },config)
      return response.data
    } catch (error: any) {
      joinRaffleErrorMessage.value = error.response.data.message
    }
  }

  async function getASingleRaffle(id: string){
    try {
      let response = await axios.get<raffleList>(`${KEY}/raffle/${id}`)
      singleRaffleResponse.value = response.data      
      if(response){
        getSingleRaffleErrorMessage.value = ''
      }
      return response.data
    } catch (error) {
      getSingleRaffleErrorMessage.value = error.response.data.message
    }
  }

  async function startRaffle(raffleId: string){
    try {
      let response = await axios.post<any>(`${KEY}/raffle/start`,{
        raffleId
      },config)
      return response.data
    } catch (error) {
      
    }
  }

  return {
    getAllRaffles,
    allRaffles,
    newRaffle,
    joinRaffle,
    joinRaffleErrorMessage,
    getASingleRaffle,
    getSingleRaffleErrorMessage,
    singleRaffleResponse,
    startRaffle
  }
})