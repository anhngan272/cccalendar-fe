import axios from 'axios';
import { API_URL } from '@/assets/config';
import { showMessage } from '@/helpers/index';
// import moment from 'moment';

let diaryId = 0
export function createDiaryId() {
    return String(diaryId++)
}

const state = {
    diaries: [
        // {
        //     id: createDiaryId(),
        //     title: "Ant Design Title 1",
        //     date: "6/4/2021",
        //     tags: [],
        //     content: 'haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        // },
        // {
        //     id: createDiaryId(),
        //     title: "Ant Design Title 2",
        //     date: "6/4/2021",
        //     tags: ['ha', 'hi'],
        //     content: 'haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        // },
    ],
    pagination: {
        currentPage: 1,
        totalPage: 1,
    },
    searchKey: '',
}

const getters = {
    getDiary: state => state.diary,
    getDiaries: state => state.diaries,
    getPagination: state => state.pagination,
    getSearchKey: state => state.searchKey
}

const actions = {
    async fetchDiaries({ commit }, searchTerms) {
        let response = null;
        if (searchTerms) {
            const searchParams = { ...searchTerms };

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

            showMessage('loading');
            response = await axios.get(API_URL + '/diary', {
                params: searchParams
            });
        } else {
            showMessage('loading');
            response = await axios.get(API_URL + '/diary');
        }

        if (response.status === 200) {
            showMessage('success');
            commit('setDiaries', response.data);
            commit('setPagnation', response.data);
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

        showMessage('loading')

        const response = await axios.post(API_URL + '/diary', formDataDiary, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 200 || response.status === 201) {
            showMessage('success')
            commit('createDiary', response.data);
        } else {
            showMessage('error')
        }
    },

    async deleteDiary({ commit }, diaryId) {
        showMessage('loading')

        const response = await axios.delete(API_URL + `/diary/${diaryId}`);
        if (response.status === 200 || response.status === 201) {
            showMessage('success')
            commit('deleteDiary', diaryId);
        } else {
            showMessage('error')
        }
    },
    // deleteDiary({ commit }, diaryId) {
    //     commit('deleteDiary', diaryId);
    // },
    async updateDiary({ commit }, diary) {
        showMessage('loading')
        // console.log(diary)
        const response = await axios.put(API_URL + `/diary/${diary.id}`, diary);

        if (response.status === 200) {
            commit('updateDiary', response.data);
            showMessage('success')
        }
    },
}

const mutations = {
    setDiaries: (state, diaries) => (state.diaries = diaries.data),
    createDiary: (state, diary) => {
        state.isSuccess = true
        state.diaries.unshift(diary)
    },
    deleteDiary: (state, diaryId) => state.diaries = state.diaries.filter(diary => diary.id !== diaryId),
    updateDiary: (state, diary) => {
        const diaryIndex = state.diaries.findIndex(x => x.id === diary.id)
        state.diaries.splice(diaryIndex, 1, diary)
        // console.log(diary)
    },
    setPagnation: (state, pagination) => {
        state.pagination.currentPage = pagination.meta.current_page;
        state.pagination.totalPage = pagination.meta.total;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};