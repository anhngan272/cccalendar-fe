import axios from 'axios';
import { API_URL } from '@/assets/config';
// import moment from 'moment'
// let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
// export function createEventId() {
//     return String(eventGuid++)
//   }
const state = {
    event: {
        // title: "hello",
        // date1: moment(new Date()),
        // date2: moment(new Date()),
        // time1: moment("12:00", "HH:mm"),
        // time2: moment("13:00", "HH:mm"),
        // description: "",
        // isWholeDay: false,
        // attendees: [],
        // colorId: "",
    },
    events: [
        {
            id: 0,
            title: 'Event 1',
            backgroundColor: '#ff3e30',
            textColor: '#fff',
            description: "hello world",
            attendees: ["n", 'h'],
            start: new Date('2021-04-21').toISOString().replace(/T.*$/, '') + 'T12:00',
            allDay: false,
        },
    ],
}

const getters = {
    // getTitle: state => state.title,
    // getDate1: state => state.date1,
    // getDate2: state => state.date2,
    // getTime1: state => state.time1,
    // getTime2: state => state.time2,
    // getDescription: state => state.description,
    // getIsWholeDay: state => state.isWholeDay,
    // getAttendees: state => state.attendees,
    // getAttendeesSubmit: state => state.attendeesSubmited,
    // getColorId: state => state.colorId,
    // getEvent: state => state.event
    getEvents: state => state.events
}

const actions = {
    async fetchEvents({ commit }) {
        const response = await axios.get(API_URL + '/calendar')
        commit('setEvents', response.data)
    },
    setEvent({ commit }, event) {

        commit('setEvent', event)
    },
}

const mutations = {
    setEvents: (state, events) => (state.events = events),
    setEvent: (state, event) => (state.event = event),
    addEvent: (state, event) => {
        state.events.push(event)
    }

}

export default {
    state,
    getters,
    actions,
    mutations
};

