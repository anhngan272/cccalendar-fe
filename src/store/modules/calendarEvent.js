import axios from 'axios';
import { API_URL, COOKIE_PATH } from '@/assets/config';

const state = {
    event: {
        title: "",
        date1: moment(new Date()),
        date2: moment(new Date()),
        time1: moment("12:00", "HH:mm"),
        time2: moment("13:00", "HH:mm"),
        description: "",
        isWholeDay: false,
        attendees: [],
        colorId: "",
    },
    events: [],
    attendeesSubmited: Boolean,
}

const getters = {
    getTitle: state => state.title,
    getDate1: state => state.date1,
    getDate2: state => state.date2,
    getTime1: state => state.time1,
    getTime2: state => state.time2,
    getDescription: state => state.description,
    getIsWholeDay: state => state.issWholeDay,
    getAttendees: state => state.attendees,
    getAttendeesSubmit: state => state.attendeesSubmited,
    getColorId: state => state.colorId,
}

const actions = {
    async fetchEvents({ commit }) {
        const response = await axios.get(API_URL + '/calendar')
        commit('setEvents', response.data)
    }
}

const mutations = {
    setEvents: (state, events) => (state.events = events)
    
}

export default {
    state,
    getters,
    actions,
    mutations
};

