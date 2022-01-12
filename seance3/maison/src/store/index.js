import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    ouEstLeLapin : '',
    lumieres: {
      salon: false,
      chambre: false,
    }
  },
  mutations: {
    setOuEstLeLapin(state, piece){
      state.ouEstLeLapin = piece;
    },
    setLumiere(state, piece){
      state.lumieres[piece] = !state.lumieres[piece];
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
