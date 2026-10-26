<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../api.js';

const router = useRouter();
const form = reactive({ name: '', email: '', password: '', confirmPassword: '' });
const message = ref({ type: '', text: '' });

async function submit() {
  // Quick checks in the browser (the server checks again)
  if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return (message.value = { type: 'danger', text: 'Name and a valid email are required.' });
  }
  if (form.password.length < 6) return (message.value = { type: 'danger', text: 'Password must be at least 6 characters.' });
  if (form.password !== form.confirmPassword) return (message.value = { type: 'danger', text: 'Passwords do not match.' });
  try {
    await api('POST', '/api/auth/signup', form);
    message.value = { type: 'success', text: 'Account created! Redirecting to login...' };
    setTimeout(() => router.push('/login'), 1200);
  } catch (e) {
    message.value = { type: 'danger', text: e.message };
  }
}
</script>

<template>
  <div class="container mt-5 form-box">
    <h1 class="mb-4">Create an account</h1>
    <div v-if="message.text" :class="'alert alert-' + message.type">{{ message.text }}</div>
    <form @submit.prevent="submit" novalidate>
      <div class="form-group"><label>Name</label><input v-model="form.name" type="text" class="form-control" required></div>
      <div class="form-group"><label>Email</label><input v-model="form.email" type="email" class="form-control" required></div>
      <div class="form-group"><label>Password (min 6 characters)</label><input v-model="form.password" type="password" class="form-control" minlength="6" required></div>
      <div class="form-group"><label>Confirm Password</label><input v-model="form.confirmPassword" type="password" class="form-control" required></div>
      <button type="submit" class="btn btn-teal btn-block">Sign up</button>
    </form>
    <p class="mt-3">Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>
