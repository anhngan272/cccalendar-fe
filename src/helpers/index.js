import axios from 'axios';
import store from '../store';

const checkCookie = (cname) => {
    let cvalue = Vue.$cookies.get(cname);
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

export { toast, setCookie, getCookie, checkCookie, initialize };