import axios from 'axios';
import { API_URL } from '../../assets/config';

const state = {
    loginUrl: '',
    user: {},
    googleUser: {},
};

const getters = {
    getLoginUrl: state => state.loginUrl,
    getUser: state => state.user,
};

const actions = {
    async fetchLoginUrl({ commit }) {
        const response = await axios.get(API_URL + '/auth/google/url');
        commit('setLoginUrl', response.data.url);
        // console.log(response.data.url);
    },
    async fetchGoogleCallback({ commit }, query) {
        console.log(query);
        const response = await axios.get(API_URL + '/auth/google/callback' + query);
        commit('setUser', response.data.user);
        console.log(response.data);
    },
};

const mutations = {
    setLoginUrl: (state, loginUrl) => (state.loginUrl = loginUrl),
    setUser: (state, user) => (state.user = user),
};

export default {
    state,
    getters,
    actions,
    mutations
};