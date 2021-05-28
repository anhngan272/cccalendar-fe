import axios from 'axios';
import { API_URL } from '@/assets/config';
import { showMessage } from '@/helpers/index';
import i18n from '@/lang/i18n.js'

// import moment from 'moment';

const state = {
    diaries: [
        // {
        //     id: 0,
        //     title: "Ant Design Title 1",
        //     date: "6/4/2021",
        //     tags: ["haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
        // "huuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu","hoooooooooooooooooooooooooooooooooooooooo"],
        //     content: 'haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<br/>vsdvdsvdsvsdvs<br/>f<br/>'
        // },
    ],
    pagination: {
        currentPage: 1,
        totalPage: 1,
    },
    filterDiaries: [],
    searchKey: '',
}

const getters = {
    getDiary: state => state.diary,
    getDiaries: state => state.diaries,
    getFilterDiaries: state => state.filterDiaries,
    getPagination: state => state.pagination,
    getSearchKey: state => state.searchKey
}

const actions = {
    async fetchDiaries({ commit }, searchTerms) {
        let response = null;
        if (searchTerms) {
            const searchParams = {...searchTerms };

            // check if date is undefined
            if (searchTerms.fromDate) {
                searchParams.fromDate = searchTerms.fromDate.clone().format('YYYY-MM-DD');
            } else {
                delete searchParams.fromDate;
            }

            // check if date is undefined
            if (searchTerms.toDate) {
                searchParams.toDate = searchTerms.toDate.clone().format('YYYY-MM-DD');
            } else {
                delete searchParams.toDate;
            }

            showMessage('loading', i18n.t('notification.loading'));
            response = await axios.get(API_URL + '/diary', {
                params: searchParams
            });
        } else {
            showMessage('loading', i18n.t('notification.loading'));
            response = await axios.get(API_URL + '/diary');
        }

        if (response.status === 200) {
            showMessage('success', i18n.t('notification.success'));
            commit('setDiaries', response.data);
            commit('setPagnation', response.data);
            commit('setFilterDiaries');
        }
    },
    async createDiary({ commit }, diary) {
        var formDataDiary = new FormData()
        formDataDiary.append('title', diary.title);
        formDataDiary.append('date', diary.date);
        formDataDiary.append('content', diary.content);
        for (let i = 0; i < diary.tags.length; i++) {
            formDataDiary.append('tags[]', diary.tags[i]);
        }

        showMessage('loading', i18n.t('notification.loading'));

        const response = await axios.post(API_URL + '/diary', formDataDiary, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 200 || response.status === 201) {
            showMessage('success', i18n.t('notification.success'));
            commit('createDiary', response.data);
        } else {
            showMessage('error', i18n.t('notification.error'));
        }
    },

    async deleteDiary({ commit }, diaryId) {
        showMessage('loading', i18n.t('notification.loading'));

        const response = await axios.delete(API_URL + `/diary/${diaryId}`);
        if (response.status === 200 || response.status === 201) {
            showMessage('success', i18n.t('notification.success'));
            // commit('deleteDiary', diaryId);
            commit('deleteFilterDiary', diaryId);
        } else {
            showMessage('error', i18n.t('notification.error'));
        }
    },

    async updateDiary({ commit }, diary) {
        showMessage('loading', i18n.t('notification.loading'));
        // console.log(diary)
        const response = await axios.put(API_URL + `/diary/${diary.id}`, diary);

        if (response.status === 200) {
            commit('updateDiary', response.data);
            commit('updateFilterDiary', response.data);
            showMessage('success', i18n.t('notification.success'));
        }
    },

    filterDiaries({ commit }, key) {
        commit("filterDiaries", key)

    }
}

const mutations = {
    setDiaries: (state, diaries) => {
        if (diaries.meta) {
            state.diaries = diaries.data;
        } else {
            state.diaries = diaries;
        }
    },
    createDiary: (state, diary) => {
        state.isSuccess = true
        state.diaries.unshift(diary)
    },
    deleteDiary: (state, diaryId) => state.diaries = state.diaries.filter(diary => diary.id !== diaryId),
    deleteFilterDiary: (state, diaryId) => state.filterDiaries = state.filterDiaries.filter(diary => diary.id !== diaryId),
    updateDiary: (state, diary) => {
        const diaryIndex = state.diaries.findIndex(x => x.id === diary.id)
        state.diaries.splice(diaryIndex, 1, diary)
            // console.log(diary)
    },
    updateFilterDiary: (state, diary) => {
        const diaryIndex = state.filterDiaries.findIndex(x => x.id === diary.id)
        state.filterDiaries.splice(diaryIndex, 1, diary)
            // console.log(diary)
    },

    setPagnation: (state, pagination) => {
        if (pagination.meta) {
            state.pagination.currentPage = pagination.meta.current_page;
            state.pagination.totalPage = pagination.meta.total;
        }
    },

    setFilterDiaries: (state) => {
        state.filterDiaries = state.diaries
    },

    filterDiaries: (state, key) => {
        state.filterDiaries = state.diaries.filter((diary) => {
            return diary.title.toLowerCase().includes(key);
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};