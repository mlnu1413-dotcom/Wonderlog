<script setup>
import PostList from '../components/PostList.vue';
</script>

<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>My Posts</h1>
      <router-link to="/posts/new" class="btn btn-teal">New Post</router-link>
    </div>
    <PostList path="/api/my-posts" empty="You have not written any posts yet." />
  </div>
</template>
