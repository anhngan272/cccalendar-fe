import Vue from 'vue';
import axios from 'axios';
import store from '../store';
import VueCookies from 'vue-cookies';
import { setAuthorization } from '@/helpers/auth';

Vue.use(VueCookies);

const getCookie = (cname) => {
    return Vue.$cookies.get(cname);
}

const setCookie = (key, value, expireTimes, path, domain, secure, sameSite) => {
    return Vue.$cookies.set(key, value, expireTimes, path, domain, secure, sameSite);
}

const checkCookie = (cname) => {
    let cvalue = getCookie(cname);
    if (cvalue != "") {
        // Cookie exists
        console.log(cname + " = " + cvalue);
    } else {
        // Cookie doesn't exist
    }
}

// check if logged in
const initialize = (router) => {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = getCookie('user');

        console.log(currentUser);

        // if route require login and user not logged in yet
        if (requiresAuth && !currentUser) {
            next('/');
        } else if (to.path == '/' && currentUser) {
            next('/albums');
        } else {
            next();
        }
    });

    axios.interceptors.response.use(null, (error) => {
        if (error.resposne.status == 401) {
            store.commit('logout');
            router.push('/login');
        }

        return Promise.reject(error);
    });

    if (store.getCurrentUser) {
        setAuthorization(store.getCurrentUser.access_token);
    }
}

export { setCookie, getCookie, checkCookie, initialize };