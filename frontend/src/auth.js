import { reactive } from 'vue';
import { api } from './api.js';

// Shared login state: every component can read auth.user
export const auth = reactive({ user: null, checked: false });

// Asks the backend who is logged in (uses the session cookie)
export async function loadUser() {
  try {
    auth.user = await api('GET', '/api/auth/me');
  } catch (e) {
    auth.user = null;
  }
  auth.checked = true;
}

export async function logout() {
  await api('POST', '/api/auth/logout').catch(() => {});
  auth.user = null;
}
