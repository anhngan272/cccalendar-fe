import axios from 'axios';
import { API_URL } from '@/assets/config';
let eventGuid = 0
export function createEventId() {
    return String(eventGuid++)
}
const state = {
    event: {},
    events: [{
        id: createEventId(),
        title: 'Event 1',
        backgroundColor: '#ff3e30',
        textColor: '#fff',
        description: "hello world",
        attendees: ["n", 'h'],
        tags: ['event', 'work'],
        start: new Date('2021-04-21').toISOString().replace(/T.*$/, '') + 'T12:00',
        end: new Date('2021-04-21').toISOString().replace(/T.*$/, '') + 'T12:00',
        allDay: false,
    },],
}

const getters = {
    getEvent: state => state.event,
    getEvents: state => state.events
}

const actions = {
    async fetchEvents({ commit }) {
        const response = await axios.get(API_URL + '/calendar');

        if (response.status === 200) {
            commit('setEvents', response.data);
        }
    },
    async addEvent({ commit }, event) {
        const response = await axios.post(API_URL + '/calendar', event);

        if (response.status === 200) {
            commit('addEvent', event);
        }
    },
}

const mutations = {
    setEvents: (state, events) => (state.events = events),
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