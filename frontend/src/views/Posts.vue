<script setup>
import PostList from '../components/PostList.vue';
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Explore Posts</h1>
    <PostList path="/api/posts" />
  </div>
</template>
