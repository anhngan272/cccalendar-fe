import Vue from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

export function getUser() {
    return Vue.$cookies.get('user');
}

export function setAuthorization(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}