<script setup>
import PostList from '../components/PostList.vue';
</script>

<template>
  <section class="hero text-white text-center">
    <div class="hero-overlay">
      <h1 class="display-4 font-weight-bold">Welcome to WanderLog</h1>
      <p class="lead">Read and share stories from around the world.</p>
      <router-link to="/posts" class="btn btn-teal btn-lg">Explore Posts</router-link>
    </div>
  </section>
  <div class="container mt-5">
    <h2 class="mb-4">Recent Travel Posts</h2>
    <PostList path="/api/posts" :limit="3" />
  </div>
</template>
