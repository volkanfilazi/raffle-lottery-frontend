import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../pages/Homepage.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'


const routes = [
  { path: '/', name: 'homepage', component: Homepage},
  { path: '/login', name: 'login', component: Login},
  { path: '/register', name: 'register', component: Register}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;