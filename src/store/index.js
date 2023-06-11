import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        apiData: null,
    },
    mutations: {
        setApiData(state, data) {
            state.apiData = data;
        },
    },
});

export default store;