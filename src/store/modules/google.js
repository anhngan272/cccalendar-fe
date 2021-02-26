import axios from 'axios';
import { API_URL } from '../../assets/config';

const state = {
    loginUrl: '',
};

const getters = {
    getLoginUrl: state => state.loginUrl,
};

const actions = {
    async fetchLoginUrl({ commit }) {
        const response = await axios.get(API_URL + '/auth/google/url');
        commit('setLoginUrl', response.data.url);
        // console.log(response.data.url);
    },
};

const mutations = {
    setLoginUrl: (state, loginUrl) => (state.loginUrl = loginUrl)
};

export default {
    state,
    getters,
    actions,
    mutations
};