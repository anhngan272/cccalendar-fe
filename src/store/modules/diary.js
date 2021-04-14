import axios from 'axios';
import { API_URL } from '@/assets/config';

let diaryId = 0
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
            content:'ha'
        },
        {
            id: createDiaryId(),
            title: "Ant Design Title 2",
            date: "6/4/2021",
            tags: ['ha', 'huu'],
            content:'hii'
        },
        // {
        //     id: 0,
        //     title: 'Event 1',
        //     backgroundColor: '#D50000',
        //     borderColor: '#fff',
        //     colorId: '11',
        //     textColor: '#fff',
        //     description: "<b>hello world</b><br/>hehe",
        //     attendees: ["ngannnnnnnn@gmail.com", 'huy@gmail.com'],
        //     tags: ['diary', 'work'],
        //     start: new Date('2021-04-21').toISOString().replace(/T.*$/, '') + 'T01:00',
        //     end: new Date('2021-04-23').toISOString().replace(/T.*$/, '') + 'T01:01',
        //     allDay: false,
        // },
    ],
}

const getters = {
    getDiary: state => state.diary,
    getDiaries: state => state.diaries
}

const actions = {
    async fetchDiaries({ commit }) {
        const response = await axios.get(API_URL + '/diary');

        if (response.status === 200) {
            commit('setDiaries', response.data);
        }
    },
    async createDiary({ commit }, diary) {
        const response = await axios.post(API_URL + '/diary', diary, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 200) {
            commit('createDiary', diary);
        }
    },
    // createDiary({ commit }, diary) {
    //     commit('createDiary', diary);
    // },

    // async deleteDiary({ commit }, diaryId) {
    //     const response = await axios.delete(API_URL + `/diary/${diaryId}`);

    //     if (response.status === 200) {
    //         commit('deleteDiary', diaryId);
    //     }
    // },
    deleteDiary({ commit }, diaryId) {
        commit('deleteDiary', diaryId);

    },
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
        state.diaries.push(diary)
    },
    deleteDiary: (state, diaryId) => {
        const diaryIndex = state.diaries.findIndex(diary => diary.id === diaryId)
        state.diaries.splice(diaryIndex, 1);
    },
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