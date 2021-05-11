import axios from 'axios';
import { API_URL } from '@/assets/config';
import { showMessage } from '@/helpers/index';
import i18n from '@/lang/i18n.js'

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
            const searchParams = {...searchTerms };

            // check if date is undefined
            if (searchTerms.start) {
                searchParams.start = searchTerms.start.clone().format('YYYY-MM-DD') + " 00:00";
            } else {
                delete searchParams.start;
            }

            // check if date is undefined
            if (searchTerms.end) {
                searchParams.end = searchTerms.end.clone().format('YYYY-MM-DD') + " 23:59";
            } else {
                delete searchParams.end;
            }

            showMessage('loading', i18n.t('notification.loading'));
            response = await axios.get(API_URL + '/calendar', {
                params: searchParams
            });
        } else {
            showMessage('loading', i18n.t('notification.loading'));
            response = await axios.get(API_URL + '/calendar');
        }

        if (response.status === 200) {
            showMessage('success', i18n.t('notification.success'));
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
        showMessage('loading', i18n.t('notification.loading'));

        const response = await axios.post(API_URL + '/calendar', event);

        if (response.status === 200) {
            showMessage('success', i18n.t('notification.success'));
            commit('addEvent', response.data);
        } else {
            showMessage('error', i18n.t('notification.error'));
        }
    },
    async deleteEvent({ commit }, eventId) {
        showMessage('loading', i18n.t('notification.loading'));

        const response = await axios.delete(API_URL + `/calendar/${eventId}`);

        if (response.status === 200) {
            showMessage('success', i18n.t('notification.success'));
            commit('deleteEvent', eventId);
            commit('deleteFilterEvent', eventId);
        }
    },
    async updateEvent({ commit }, event) {
        showMessage('loading', i18n.t('notification.loading'));

        const response = await axios.put(API_URL + `/calendar/${event.id}`, event);

        if (response.status === 200) {
            showMessage('success', i18n.t('notification.success'));
            commit('updateEvent', response.data);
            commit('updateFilterEvent', response.data);
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
    deleteEvent: (state, eventId) => state.events = state.events.filter(event => event.id !== eventId),
    deleteFilterEvent: (state, eventId) => state.filterEvents = state.filterEvents.filter(event => event.id !== eventId),
    updateEvent: (state, event) => {
        const eventIndex = state.events.findIndex(e => e.id === event.id)
        state.events.splice(eventIndex, 1, event)
    },
    updateFilterEvent: (state, event) => {
        const eventIndex = state.filterEvents.findIndex(e => e.id === event.id)
        state.filterEvents.splice(eventIndex, 1, event)
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