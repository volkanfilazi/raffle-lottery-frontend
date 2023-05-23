<script setup>
  import Homepage from './pages/Homepage.vue'
  import NavBar from './components/Navbar.vue'
</script>

<template>
  <NavBar></NavBar>
  <div class="flex h-screen bg-[#23232d]">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>

</style>
