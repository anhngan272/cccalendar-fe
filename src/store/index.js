import Vue from 'vue';
import Vuex from 'vuex';
import google from '@/store/modules/google';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        google,
    }
})