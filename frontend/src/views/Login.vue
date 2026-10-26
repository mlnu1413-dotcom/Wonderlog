<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../api.js';
import { loadUser } from '../auth.js';

const router = useRouter();
const form = reactive({ email: '', password: '' });
const error = ref('');

async function submit() {
  if (!form.email || !form.password) return (error.value = 'Email and password are required.');
  try {
    await api('POST', '/api/auth/login', form);
    await loadUser(); // update the navbar
    router.push('/');
  } catch (e) {
    error.value = e.message;
  }
}
</script>

<template>
  <div class="container mt-5 form-box">
    <h1 class="mb-4">Login</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <form @submit.prevent="submit" novalidate>
      <div class="form-group"><label>Email</label><input v-model="form.email" type="email" class="form-control" required></div>
      <div class="form-group"><label>Password</label><input v-model="form.password" type="password" class="form-control" required></div>
      <button type="submit" class="btn btn-teal btn-block">Login</button>
    </form>
    <p class="mt-3">No account yet? <router-link to="/signup">Sign up</router-link></p>
  </div>
</template>
