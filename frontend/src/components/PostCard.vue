<script setup>
import { computed } from 'vue';

const props = defineProps({ post: Object });
const short = computed(() => props.post.description.length > 100 ? props.post.description.slice(0, 100) + '...' : props.post.description);
</script>

<template>
  <!-- {{ }} always escapes text, so user content cannot inject HTML -->
  <div class="col-lg-4 col-md-6 col-12 mb-4">
    <router-link :to="'/posts/' + post._id" class="card h-100 post-card text-dark text-decoration-none">
      <img :src="post.imageUrl" class="card-img-top" :alt="post.title">
      <div class="card-body">
        <small class="text-teal font-weight-bold">&#128205; {{ post.destination }}</small>
        <h5 class="card-title mt-1">{{ post.title }}</h5>
        <p class="card-text text-muted">{{ short }}</p>
      </div>
    </router-link>
  </div>
</template>
