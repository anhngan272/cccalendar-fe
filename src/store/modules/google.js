import axios from 'axios';
import { API_URL, COOKIE_PATH } from '@/assets/config';
import { setAuthorization, getUser } from '@/helpers/auth';
import { setCookie, removeCookie } from '@/helpers';
import router from '@/router';

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
        if (!query.includes('error')) {
            const response = await axios.get(API_URL + '/auth/google/callback' + query);
            commit('loginSuccess', response.data);
            // console.log(response);
        } else {
            let error = query.split('error=')[1];
            error = error.replace('_', ' ');
            error = error.charAt(0).toUpperCase() + error.slice(1);

            const errorMessage = 'Failed to login: ' + error;
            commit('loginFailed', errorMessage);
        }
    },
    async logout({ commit }) {
        commit('logout');
    }
};

const mutations = {
    setLoginUrl: (state, loginUrl) => (state.loginUrl = loginUrl),
    loginSuccess: (state, payload) => {
        const data = {...payload };
        state.authError = null;
        state.currentUser = data.user;

        setAuthorization(data.access_token);
        setCookie('user', JSON.stringify(state.currentUser), data.expires_in, COOKIE_PATH);
        setCookie('access_token', data.access_token, data.expires_in, COOKIE_PATH);

        router.push({ name: 'Home' });
    },
    loginFailed(state, errorMessage) {
        state.authError = errorMessage;

        router.push({ name: 'GoogleLogin' });
    },
    logout: (state) => {
        removeCookie('user');
        removeCookie('access_token');
        state.currentUser = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};