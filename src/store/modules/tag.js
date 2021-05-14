import axios from 'axios';
import { API_URL } from '@/assets/config';
import { showMessage } from '@/helpers/index';
import i18n from '@/lang/i18n.js'

const state = {
    tags: [
        {
            name: "Tag0",
            id: 0
        },
        {
            name: "Tag1",
            id: 1
        },
    ],
    filterTags: [],
}

const getters = {
    getTag: state => state.tag,
    getTags: state => state.tags,
    getFilterTags: state => state.filterTags
}

const actions = {
    async fetchTags({ commit }) {
        showMessage('loading',i18n.t('notification.loading'));
        const response = await axios.get(API_URL + '/tag');

        if (response.status === 200) {
            commit('setTags', response.data);
            showMessage('success',i18n.t('notification.success'));
        }
    },

    async createTag({ commit }, tag) {
        showMessage('loading',i18n.t('notification.loading'));
        const response = await axios.post(API_URL + '/tag', tag);

        if (response.status === 200) {
            commit('createTag', response.data);
            showMessage('success',i18n.t('notification.success'));
        }
    },
    // createTag({ commit }, tag) {
    //     commit('createTag', tag);
    // },

    async deleteTag({ commit }, tagId) {
        showMessage('loading',i18n.t('notification.loading'));
        const response = await axios.delete(API_URL + `/tag/${tagId}`);

        if (response.status === 200) {
            commit('deleteTag', tagId);
            showMessage('success',i18n.t('notification.success'));
        }
    },

    // deleteTag({ commit }, tagId) {
    //     commit('deleteTag', tagId);
    // },

    async updateTag({ commit }, tag) {
        showMessage('loading',i18n.t('notification.loading'));

        const response = await axios.put(API_URL + `/tag/${tag.id}`, tag);
        if (response.status === 200) {
            commit('updateTag', tag);
            showMessage('success',i18n.t('notification.success'));
        } 
    },
    // updateTag({ commit }, tag) {
    //     commit('updateTag', tag);
    // },

    setFilterTags({ commit }, tags) {
        commit('setFilterTag', tags)
    }
}

const mutations = {
    setTags: (state, tags) => (state.tags = tags),
    createTag: (state, tag) => {
        state.tags.push(tag)
    },
    deleteTag: (state, tagId) => state.tags = state.tags.filter(tag => tag.id !== tagId),
    updateTag: (state, tag) => {
        const tagIndex = state.tags.findIndex(x => x.id === tag.id)
        if (tagIndex !== -1) {
            state.tags.splice(tagIndex, 1, tag)
        }
        // console.log(tag)
    },
    setFilterTag: (state, tags) => {
        state.filterTags = tags
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};