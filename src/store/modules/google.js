import Vue from 'vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import { API_URL, COOKIE_PATH } from '@/assets/config';
import { setAuthorization } from '@/helpers/auth';
import { getUser } from '@/helpers/auth';
import router from '@/router';

Vue.use(VueCookies);

const user = getUser();

const state = {
    loginUrl: '',
    currentUser: user,
    authError: null,
    // googleUser: {},
};

const getters = {
    getLoginUrl: state => state.loginUrl,
    getCurrentUser: state => state.currentUser,
    getAuthError: state => state.authError,
};

const actions = {
    async fetchLoginUrl({ commit }) {
        const response = await axios.get(API_URL + '/auth/google/url');
        commit('setLoginUrl', response.data.url);
        // console.log(response.data.url);
    },
    async fetchGoogleCallback({ commit }, query) {
        const response = await axios.get(API_URL + '/auth/google/callback' + query);
        commit('loginSuccess', response.data);
        // console.log(response);
    },
};

const mutations = {
    setLoginUrl: (state, loginUrl) => (state.loginUrl = loginUrl),
    loginSuccess: (state, payload) => {
        const data = {...payload };
        state.authError = null;
        state.currentUser = data.user;

        setAuthorization(data.access_token);
        Vue.$cookies.set('user', JSON.stringify(state.currentUser), data.expires_in, COOKIE_PATH);

        router.push({ path: '/' });
    },
    loginFailed(state, payload) {
        state.authError = payload.message;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};