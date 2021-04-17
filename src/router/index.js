import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/pages/Home';
import About from '@/views/pages/About';
import Calendar from '@/views/calendars/Calendar';
import Diary from '@/views/diaries/Diary';
import NotFound from '@/views/pages/NotFound';
import GoogleLogin from '@/views/users/GoogleLogin';
import GoogleCallback from '@/views/users/GoogleCallback';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/404',
    alias: '*',
    component: NotFound
}, {
    path: '*',
    redirect: '/404'
}, {
    path: '/about',
    name: 'About',
    component: About
}, {
    path: '/login',
    name: 'GoogleLogin',
    component: GoogleLogin
}, {
    path: '/auth/google',
    name: 'GoogleCallback',
    component: GoogleCallback
}, {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    meta: {
        requiresAuth: true,
      },
}, {
    path: '/diary',
    name: 'Diary',
    component: Diary,
    meta: {
        requiresAuth: true,
      },
}, ];

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
});

router.beforeEach((to, from, next) => {
    next();
})

router.afterEach(() => {
    // NProgress.done()
    // setTimeout(() => console.log('after'), 1500); // timeout for demo purposes;
    // console.log('after');
})

export default router