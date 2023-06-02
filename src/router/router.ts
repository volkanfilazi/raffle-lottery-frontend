import { START_LOCATION, createRouter, createWebHistory } from 'vue-router';
import Homepage from '../pages/Homepage.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import { useStorage } from "@vueuse/core";
import { useUserStore } from '../store/UserStore';


const routes = [
  { path: '/', name: 'homepage', component: Homepage, meta:{requiresAuth: true}},
  { path: '/login', name: 'login', component: Login},
  { path: '/register', name: 'register', component: Register}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach( async(to, from)=>{
  const accessToken = useStorage("token", "")
  const userSore = useUserStore()
  if(from === START_LOCATION){
    if(accessToken.value){
      await userSore.currentUser()
    }
  }

  if(!userSore.userProfile){
    if(to.meta.requiresAuth){
      router.push({ name: "login" , query: { redirect: to.path !== '/logout' ? to.path : undefined }})
    }
  }
})

export default router;