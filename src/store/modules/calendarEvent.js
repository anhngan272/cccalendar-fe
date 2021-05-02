import axios from 'axios';
import { API_URL } from '@/assets/config';
import { showMessage } from '@/helpers/index';

const state = {
    event: {},
    events: [
        // {
        //     id: 0,
        //     title: 'Event 1',
        //     backgroundColor: '#D50000',
        //     colorId: 11,
        //     textColor: '#fff',
        //     description: "<b>hello world</b><br/>hehe",
        //     attendees: ["ngannnnnnnn@gmail.com", 'huy@gmail.com'],
        //     tags: ['event', 'work'],
        //     start: new Date('2021-04-21').toISOString().replace(/T.*$/, '') + 'T01:00',
        //     end: new Date('2021-04-23').toISOString().replace(/T.*$/, '') + 'T01:01',
        //     allDay: false,
        // },
    ],
    filterEvents: [],
}

const getters = {
    getEvent: state => state.event,
    getEvents: state => state.events,
    getFilterEvents: state => state.filterEvents,
}

const actions = {
    async fetchEvents({ commit }, searchTerms) {
        let response = null;
        if (searchTerms) {
            const searchParams = { ...searchTerms };

            // check if date is undefined
            if (searchTerms.start) {
                searchParams.start = searchTerms.start.clone().format('YYYY-MM-DD');
            } else {
                delete searchParams.start;
            }

            // check if date is undefined
            if (searchTerms.end) {
                searchParams.end = searchTerms.end.clone().format('YYYY-MM-DD');
            } else {
                delete searchParams.end;
            }

            showMessage('loading');
            response = await axios.get(API_URL + '/calendar', {
                params: searchParams
            });
        } else {
            showMessage('loading');
            response = await axios.get(API_URL + '/calendar');
        }

        if (response.status === 200) {
            showMessage('success');
            commit('setEvents', response.data);
            commit('setFilterEvents');
        }


        // showMessage('loading')        
        // const response = await axios.get(API_URL + '/calendar');
        // if (response.status === 200) {
        //     showMessage('success')  
        //     commit('setEvents', response.data);
        // }
    },
    async addEvent({ commit }, event) {
        showMessage('loading')

        const response = await axios.post(API_URL + '/calendar', event);

        if (response.status === 200) {
            showMessage('success')
            commit('addEvent', response.data);
        } else {
            showMessage('error')
        }
    },
    async deleteEvent({ commit }, eventId) {
        showMessage('loading')

        const response = await axios.delete(API_URL + `/calendar/${eventId}`);

        if (response.status === 200) {
            showMessage('success')
            commit('deleteEvent', eventId);
        }
    },
    async updateEvent({ commit }, event) {
        showMessage('loading')

        const response = await axios.put(API_URL + `/calendar/${event.id}`, event);

        if (response.status === 200) {
            showMessage('success')
            commit('updateEvent', response.data);
        }
    },

    filterEvents({ commit }, key) {
        commit("filterEvents", key)

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
    },
    setFilterEvents: (state) => {
        state.filterEvents = state.events
    },
    filterEvents: (state, key) => {
        state.filterEvents = state.events.filter((event) => {
            return event.title.toLowerCase().includes(key);
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};