<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../api.js';

const router = useRouter();
const form = reactive({ title: '', destination: '', imageUrl: '', description: '' });
const message = ref({ type: '', text: '' });

async function submit() {
  if (!form.title.trim() || !form.destination.trim() || !form.description.trim() || !/^https?:\/\//i.test(form.imageUrl)) {
    return (message.value = { type: 'danger', text: 'Fill in every field. The image URL must start with http:// or https://' });
  }
  try {
    await api('POST', '/api/posts', form);
    message.value = { type: 'success', text: 'Post published! Redirecting to My Posts...' };
    setTimeout(() => router.push('/my-posts'), 1500);
  } catch (e) {
    message.value = { type: 'danger', text: e.message };
  }
}
</script>

<template>
  <div class="container mt-5 form-box">
    <h1 class="mb-4">Create a travel post</h1>
    <div v-if="message.text" :class="'alert alert-' + message.type">{{ message.text }}</div>
    <form @submit.prevent="submit" novalidate>
      <div class="form-group"><label>Post Title</label><input v-model="form.title" type="text" class="form-control" maxlength="120" required></div>
      <div class="form-group"><label>Destination</label><input v-model="form.destination" type="text" class="form-control" maxlength="120" required></div>
      <div class="form-group"><label>Image URL</label><input v-model="form.imageUrl" type="url" class="form-control" placeholder="https://..." required></div>
      <div class="form-group"><label>Description</label><textarea v-model="form.description" rows="6" class="form-control" required></textarea></div>
      <button type="submit" class="btn btn-teal btn-block">Publish</button>
    </form>
  </div>
</template>
