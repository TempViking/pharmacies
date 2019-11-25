import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: '',
    pharms: []
  },
  mutations: {
    searchUpdate(state, str) {
      state.search = str;
    },
    setPharms(state, pharms) {
      state.pharms = pharms;
    },
    activePharm(state, pharm) {
      state.pharms = state.pharms.map(el => {
        if (el.address === pharm) {
          el.active = !el.active;
        } else {
          el.active = false;
        }
        return el;
      });
    }
  },
  actions: {},
  modules: {}
});
