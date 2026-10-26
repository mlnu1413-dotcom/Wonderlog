<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../api.js';

const route = useRoute();
const post = ref(null);
const error = ref('');

onMounted(async () => {
  try {
    post.value = await api('GET', '/api/posts/' + route.params.id);
    document.title = post.value.title + ' | WanderLog';
  } catch (e) {
    error.value = e.status === 404 ? 'Post not found.' : e.message;
  }
});
</script>

<template>
  <div class="container mt-5">
    <router-link to="/posts" class="btn btn-outline-secondary mb-3">&larr; Back</router-link>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <article v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p class="text-muted">
        &#128205; {{ post.destination }} &middot; by {{ post.author ? post.author.name : 'Unknown' }}
        &middot; {{ new Date(post.createdAt).toDateString() }}
      </p>
      <img :src="post.imageUrl" class="img-fluid rounded mb-4 post-image" :alt="post.title">
      <p class="story">{{ post.description }}</p>
    </article>
  </div>
</template>
