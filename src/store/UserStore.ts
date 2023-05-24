import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import axios from 'axios'
import { User } from '../interfaces/user'

export const useUserStore = defineStore('user', () => {
  const KEY = 'http://localhost:5001/api'
  const accessToken = useStorage("token","")
  const loginSuccessMessage = ref<string>('')
  const loginErrorMessage = ref<string>('')
  const registerSuccessMessage = ref<string>('')
  const registerErrorMessage = ref<string>('')
  const userProfile = ref<User>()

  const config = {
    headers: { Authorization: `Bearer ${accessToken.value}`}
  }

  async function login(email: string, password: string){
    try {
      let response = await axios.post<any>(`${KEY}/user/login`,{
        email,
        password
      })
      
      accessToken.value = response.data.token
      console.log("login function called");
      console.log(accessToken.value);
      
      if(response.data){
        loginSuccessMessage.value = "Successfuly"
        loginErrorMessage.value = ''
      }
      
      return response.data
    } catch (error:any) {   
      loginErrorMessage.value = error.response.data.message
      loginSuccessMessage.value = ''
    }
  }

  async function register(username: String, email: String, password: String){
    try {
      let response = await axios.post(`${KEY}/user/register`,{
        username,
        email,
        password
      })
      if(response.data){
        registerSuccessMessage.value = "Successfully registered"
        registerErrorMessage.value = ""
      }
      return response.data
    } catch (error: any) {
      console.log(error);
      
      registerErrorMessage.value = error.response.data.message
      registerSuccessMessage.value = ""
    }
  }
  
  async function currentUser(){
    try {
      let response = await axios.get<User>(`${KEY}/user/currentuser`,config)
      userProfile.value = response.data

      console.log("currentuser called");
      
      return response.data
    } catch (error) {
      
    }
  }

  function logout(){
    accessToken.value = ''

    return accessToken.value
  }
  return{
    login,
    register,
    logout,
    loginSuccessMessage,
    loginErrorMessage,
    registerErrorMessage,
    registerSuccessMessage,
    currentUser,
    userProfile
  }
})