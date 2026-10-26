<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar />
  <router-view />
  <footer class="footer text-center py-4 mt-5">
    <div class="container">&copy; {{ new Date().getFullYear() }} WanderLog - Share your journeys</div>
  </footer>
</template>
