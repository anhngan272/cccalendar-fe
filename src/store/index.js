import Vue from 'vue';
import Vuex from 'vuex';
import google from '@/store/modules/google';
import lang from './modules/lang';
// import app from '../main.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        google,
        lang,
    }
})