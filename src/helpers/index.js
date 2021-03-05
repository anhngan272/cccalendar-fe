import Vue from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { setAuthorization } from '@/helpers/auth';

Vue.use(VueCookies);

/**
 * Get cookie
 * @param {string} cname - The name of the cookie.
 * @return {*} The value of the cookie.
 */
const getCookie = (cname) => {
    return Vue.$cookies.get(cname);
}

/**
 * Set cookie
 */
const setCookie = (key, value, expireTimes, path, domain, secure, sameSite) => {
    Vue.$cookies.set(key, value, expireTimes, path, domain, secure, sameSite);
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

/**
 * Check if route require logged in user.
 * @param {*} store 
 * @param {*} router 
 */
const initialize = (store, router) => {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = getCookie('user');

        console.log(currentUser);

        // if route require login and user not logged in yet
        if (requiresAuth && !currentUser) {
            next('/login');
        } else if (to.path == '/login' && currentUser) { // if user already logged in
            next('/');
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