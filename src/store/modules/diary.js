import axios from 'axios';
import { API_URL } from '@/assets/config';
import { showMessage } from '@/helpers/index';

let diaryId = 100
export function createDiaryId() {
    return String(diaryId++)
}

const state = {
    diaries: [
        {
            id: createDiaryId(),
            title: "Ant Design Title 1",
            date: "6/4/2021",
            tags: ['ha', 'hi'],
            content:'haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        },
        // {
        //     id: createDiaryId(),
        //     title: "Ant Design Title 2",
        //     date: "6/4/2021",
        //     tags: ['ha', 'huu'],
        //     content:'<b>12345678901234567890</b>'
        // },
    ],
}

const getters = {
    getDiary: state => state.diary,
    getDiaries: state => state.diaries,
}

const actions = {
    async fetchDiaries({ commit }) {
        const response = await axios.get(API_URL + '/diary');

        if (response.status === 200) {
            commit('setDiaries', response.data);
        }
    },
    async createDiary({ commit }, diary) {
        var formDataDiary = new FormData()
        formDataDiary.append('title', diary.title);
        formDataDiary.append('content', diary.content);
        for (let i = 0; i < diary.tags.length; i++) {
            formDataDiary.append('tags[]', diary.tags[i]);
        }

        showMessage('loading', true)

        const response = await axios.post(API_URL + '/diary', formDataDiary, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 200 || response.status === 201) {
            showMessage('success', false)
            commit('createDiary', response.data);
        } else {
            showMessage('error', false)
        }
    },
    // createDiary({ commit }, diary) {
    //     commit('createDiary', diary);
    // },

    async deleteDiary({ commit }, diaryId) {
        showMessage('loading', true)

        const response = await axios.delete(API_URL + `/diary/${diaryId}`);
        if (response.status === 200 || response.status === 201) {
            showMessage('success', false)
            commit('deleteDiary', diaryId);
        } else {
            showMessage('error', false)
        }
    },
    // deleteDiary({ commit }, diaryId) {
    //     commit('deleteDiary', diaryId);
    // },
    async updateDiary({ commit }, diary) {
        const response = await axios.put(API_URL + `/calendar/${diary.id}`, diary);

        if (response.status === 200) {
            commit('updateDiary', diary);
        }
    }
}

const mutations = {
    setDiaries: (state, diaries) => (state.diaries = diaries),
    createDiary: (state, diary) => {
        state.isSuccess = true
        state.diaries.push(diary)
    },
    deleteDiary: (state, diaryId) => state.diaries = state.diaries.filter(diary => diary.id !== diaryId),
    updateDiary: (state, diary) => {
        const diaryIndex = state.diaries.findIndex(x => x.id === diary.id)
        state.diaries.splice(diaryIndex, 1, diary)
        console.log(diary)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};