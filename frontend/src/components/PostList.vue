<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../api.js';
import PostCard from './PostCard.vue';

// path = API route to load, limit = optional max number of posts to show
const props = defineProps({ path: String, limit: Number, empty: { type: String, default: 'No posts yet.' } });

const posts = ref([]);
const error = ref('');
const loading = ref(true);

onMounted(async () => {
  try {
    const all = await api('GET', props.path);
    posts.value = props.limit ? all.slice(0, props.limit) : all;
  } catch (e) {
    error.value = e.message;
  }
  loading.value = false;
});
</script>

<template>
  <div v-if="error" class="alert alert-danger">{{ error }}</div>
  <p v-else-if="loading" class="text-muted">Loading...</p>
  <p v-else-if="!posts.length" class="text-muted">{{ empty }}</p>
  <div v-else class="row">
    <PostCard v-for="post in posts" :key="post._id" :post="post" />
  </div>
</template>
