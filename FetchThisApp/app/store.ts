import Vue from 'vue';
import Vuex from 'vuex';
import deepCopy from './utils/deepCopy';
import * as http from 'http';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shoppingItems: []
  },
  getters: {
    currentShoppingItems: state => {
      return deepCopy(state.shoppingItems);
    }
  },
  mutations: {
    addShoppingItem(state, { item }) {
      state.shoppingItems.push(item);
    },
    removeShoppingItem(state, { index }) {
      state.shoppingItems.splice(index, 1);
    }
  },
  actions: {

  }
});
