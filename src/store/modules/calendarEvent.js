import axios from 'axios';
import { API_URL } from '@/assets/config';
import { showMessage } from '@/helpers/index';

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
            colorId: 11,
            textColor: '#fff',
            description: "<b>hello world</b><br/>hehe",
            attendees: ["ngannnnnnnn@gmail.com", 'huy@gmail.com'],
            tags: ['event', 'work'],
            start: new Date('2021-04-21').toISOString().replace(/T.*$/, '') + 'T01:00',
            end: new Date('2021-04-23').toISOString().replace(/T.*$/, '') + 'T01:01',
            allDay: false,
        },
    ],
}

const getters = {
    getEvent: state => state.event,
    getEvents: state => state.events,
}

const actions = {
    async fetchEvents({ commit }) {
        const response = await axios.get(API_URL + '/calendar');

        if (response.status === 200) {
            commit('setEvents', response.data);
        }
    },
    async addEvent({ commit }, event) {
        showMessage('loading', true)

        const response = await axios.post(API_URL + '/calendar', event);

        if (response.status === 200) {
            showMessage('success', false)
            commit('addEvent', event);
        } else {
            console.log(response.status)
        }
    },
    async deleteEvent({ commit }, eventId) {
        showMessage('loading', true)

        const response = await axios.delete(API_URL + `/calendar/${eventId}`);

        if (response.status === 200) {
            showMessage('success', false)
            commit('deleteEvent', eventId);
        }
    },
    async updateEvent({ commit }, event) {
        showMessage('loading', true)

        const response = await axios.put(API_URL + `/calendar/${event.id}`, event);

        if (response.status === 200) {
            showMessage('success', false)
            commit('updateEvent', event);
        }
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
        console.log(event)
    },
    setError: (state, error) => {
        state.error = error
        console.log(error)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};