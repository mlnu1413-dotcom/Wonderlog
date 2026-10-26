import { createRouter, createWebHistory } from 'vue-router';
import { auth, loadUser } from './auth.js';
import Home from './views/Home.vue';
import Posts from './views/Posts.vue';
import PostDetail from './views/PostDetail.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import CreatePost from './views/CreatePost.vue';
import MyPosts from './views/MyPosts.vue';
import NotFound from './views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/posts', component: Posts },
    { path: '/posts/new', component: CreatePost, meta: { requiresAuth: true } },
    { path: '/posts/:id', component: PostDetail },
    { path: '/my-posts', component: MyPosts, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
});

// Pages marked requiresAuth need a login
router.beforeEach(async (to) => {
  if (!auth.checked) await loadUser();
  if (to.meta.requiresAuth && !auth.user) return '/login';
});

export default router;
