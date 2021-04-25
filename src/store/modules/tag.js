import axios from 'axios';
import { API_URL } from '@/assets/config';

let tagId = 0
export function createTagId() {
    return String(tagId++)
}

const state = {
    tags: [
        // {
        //     label: "Tag1",
        //     value: "Tag1"
        // },
        // {
        //     label: "Tag2",
        //     value: "Tag2"
        // },
        // {
        //     label: "Tag3",
        //     value: "Tag3"
        // },
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
        const response = await axios.get(API_URL + '/tag');

        if (response.status === 200) {
            commit('setTags', response.data);
        }
    },
    // async createTag({ commit }, tag) {
    //     const response = await axios.post(API_URL + '/tag', tag);
    //     if (response.status === 200) {
    //         commit('createTag', tag);
    //     }
    // },
    createTag({ commit }, tag) {
        commit('createTag', tag);
    },

    // async deleteTag({ commit }, tagId) {
    //     const response = await axios.delete(API_URL + `/tag/${tagId}`);

    //     if (response.status === 200) {
    //         commit('deleteTag', tagId);
    //     }
    // },
    deleteTag({ commit }, tagId) {
        commit('deleteTag', tagId);
    },
    // async updateTag({ commit }, tag) {
    //     const response = await axios.put(API_URL + `/calendar/${tag.id}`, tag);

    //     if (response.status === 200) {
    //         commit('updateTag', tag);
    //     }
    // },
    updateTag({ commit }, tag) {
        commit('updateTag', tag);
    },

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
        console.log(tag)
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