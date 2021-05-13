import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/pages/Home';
// import About from '@/views/pages/About';
import MeetTheTeam from '@/views/pages/MeetTheTeam';
import Calendar from '@/views/calendars/Calendar';
import Diary from '@/views/diaries/Diary';
import Organizer from '@/views/organizers/Organizer';
import NotFound from '@/views/pages/NotFound';
import GoogleLogin from '@/views/users/GoogleLogin';
import GoogleCallback from '@/views/users/GoogleCallback';
import { DEFAULT_TITLE } from '@/assets/config.js';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        title: "Home",
    }
}, {
    path: '/404',
    alias: '*',
    component: NotFound,
    meta: {
        title: 'Not_found',
    }
}, {
    path: '*',
    redirect: '/404'
}, {
    path: '/about',
    name: 'About',
    component: MeetTheTeam,
    meta: {
        title: 'About',
    }
}, {
    path: '/login',
    name: 'GoogleLogin',
    component: GoogleLogin,
    meta: {
        title: 'Login',
    }
}, {
    path: '/auth/google',
    name: 'GoogleCallback',
    component: GoogleCallback,
    meta: {
        title: 'Auth',
    }
}, {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    meta: {
        requiresAuth: true,
        title: 'Calendar',
    },
}, {
    path: '/diary',
    name: 'Diary',
    component: Diary,
    meta: {
        requiresAuth: true,
        title: 'Diary',
    },
}, {
    path: '/organizer',
    name: 'Organizer',
    component: Organizer,
    meta: {
        // requiresAuth: true,
        title: 'Organizer',
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

router.afterEach((to) => {
    // NProgress.done()
    // setTimeout(() => console.log('after'), 1500); // timeout for demo purposes;
    // console.log('after');
    Vue.nextTick(() => {
        if (to.meta.title) {
            document.title = to.meta.title + ` | ${DEFAULT_TITLE}`;
        } else {
            document.title = DEFAULT_TITLE;
        }
    });
})

export default router