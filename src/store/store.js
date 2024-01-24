// store/index.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    rules: false,
    btnSelected: '',
    animacion: false,
    modalWinner: false,
    playerScore: 5,
  },
  mutations: {
    setRules(state, value) {
      state.rules = value;
    },
    setBtnSelected(state, value) {
      state.btnSelected = value;
    },
    setAnimacion(state, value) {
      state.animacion = value;
    },
    setModalWinner(state, value) {
      state.modalWinner = value;
    },
    setPlayerScore(state, value) {
      state.playerScore = value;
    },
    
    
  },
  actions: {
    showRules({ commit, state }) {
      commit('setRules', !state.rules);
    },
    showModalWinner({ commit, state }) {
      commit('setModalWinner', !state.modalWinner);
    },
    
  },
  getters: {
   
   
  },

});
