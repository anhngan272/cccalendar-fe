import Vue from 'vue';
import Vuex from 'vuex';
import google from '@/store/modules/google';
import lang from './modules/lang';
import calendarEvent from './modules/calendarEvent';
import diary from './modules/diary';
import tag from './modules/tag';
import kmeans from './modules/kmeans';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        google,
        lang,
        calendarEvent,
        diary,
        tag,
        kmeans,
    }
})