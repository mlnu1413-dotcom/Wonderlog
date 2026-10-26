<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, logout } from '../auth.js';

const router = useRouter();
const open = ref(false); // mobile menu open or closed

async function handleLogout() {
  await logout();
  open.value = false;
  router.push('/');
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
    <div class="container">
      <router-link class="navbar-brand" to="/">&#9992; WanderLog</router-link>
      <button class="navbar-toggler" type="button" aria-label="Toggle navigation" @click="open = !open">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ show: open }" @click="open = false">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/posts">Explore</router-link></li>
          <template v-if="auth.user">
            <li class="nav-item"><router-link class="nav-link" to="/posts/new">New Post</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/my-posts">My Posts</router-link></li>
            <li class="nav-item"><a class="nav-link" href="#" @click.prevent="handleLogout">Logout ({{ auth.user.name }})</a></li>
          </template>
          <template v-else>
            <li class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li>
            <li class="nav-item"><router-link class="btn btn-teal ml-md-2" to="/signup">Sign up</router-link></li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
