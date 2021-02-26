import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/pages/Home';
import About from '../views/pages/About';
import NotFound from '../views/pages/NotFound';
import GoogleAuth from '../views/users/GoogleAuth';
import GoogleAuthCallback from '../views/users/GoogleAuthCallback';

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
}, {
    path: '/login/google',
    name: 'Signin with Google',
    component: GoogleAuth
}, {
    path: '/auth/google',
    name: 'Signin with Google - Callback',
    component: GoogleAuthCallback
}];

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