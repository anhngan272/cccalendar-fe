import axios from 'axios';
import { API_URL } from '@/assets/config';
let eventGuid = 0
export function createEventId() {
    return String(eventGuid++)
}
const state = {
    event: {},
    events: [
        {
            id: createEventId(),
            title: 'Event 1',
            backgroundColor: '#D50000',
            textColor: '#fff',
            description: "hello world",
            attendees: ["ngannnnnnnn@gmail.com", 'huy@gmail.com'],
            tags: ['event', 'work'],
            start: new Date('2021-04-21').toISOString().replace(/T.*$/, '') + 'T01:00',
            end: new Date('2021-04-23').toISOString().replace(/T.*$/, '') + 'T01:01',
            allDay: false,
        },
        {
            id: createEventId(),
            title: 'Event 2',
            backgroundColor: '#D50000',
            textColor: '#fff',
            description: "hello world",
            attendees: ["ngannnnnnnn@gmail.com", 'huy@gmail.com'],
            tags: ['event', 'work'],
            start: new Date('2021-04-21').toISOString().replace(/T.*$/, '') + 'T12:30',
            end: new Date('2021-04-21').toISOString().replace(/T.*$/, '') + 'T13:00',
            allDay: false,
        },
        {
            id: createEventId(),
            title: 'Event 3',
            backgroundColor: '#D50000',
            textColor: '#fff',
            description: "hello world",
            attendees: ["ngannnnnnnn@gmail.com", 'huy@gmail.com'],
            tags: ['event', 'work'],
            start: new Date('2021-04-22').toISOString().replace(/T.*$/, '') + 'T12:30',
            end: new Date('2021-04-22').toISOString().replace(/T.*$/, '') + 'T13:00',
            allDay: false,
        },
    ],
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
    deleteEvent({ commit }, eventId) {
        commit('deleteEvent', eventId);
    },
    updateEvent({ commit }, event) {
        commit('updateEvent', event);
    }
}

const mutations = {
    setEvents: (state, events) => (state.events = events),
    addEvent: (state, event) => {
        state.events.push(event)
    },
    deleteEvent: (state, eventId) => {
        const eventIndex = state.events.findIndex(event => event.id === eventId)
        state.events.splice(eventIndex, 1);
    },
    updateEvent: (state, event) => {
        const eventIndex = state.events.findIndex(e => e.id === event.id)
        state.events.splice(eventIndex, 1, event)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};