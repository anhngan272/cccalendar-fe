import axios from 'axios';
import { API_URL } from '@/assets/config';
import store from '@/store';
// import { showMessage } from '@/helpers/index';

const state = {
    spinning: false,
};

const getters = {
    getSpinning: state => state.spinning,
};

const actions = {
    async clustering({ commit }, {
        isClusteringEvent,
        isClusteringDiary
    }) {
        commit('setSpinning', true);

        if (isClusteringEvent) {
            const response = await axios.post(API_URL + '/clustering/event');

            if (response.status == 200) {
                store.dispatch('fetchEvents');
            }
        }

        if (isClusteringDiary) {
            const response = await axios.post(API_URL + '/clustering/diary');

            if (response.status == 200) {
                store.dispatch('fetchDiaries', { all: true });
            }
        }

        await store.dispatch('fetchTags');
        commit('setSpinning', false);
    },
};

const mutations = {
    setSpinning: (state, isSpinning) => state.spinning = isSpinning,
};

export default {
    state,
    getters,
    actions,
    mutations
};