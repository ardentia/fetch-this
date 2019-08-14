import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import shoppingList from './shopping-list-module';
import appSession from './app-session-module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    appSession,
    shoppingList
  }
});

Vue.prototype.$store = store;

export default store;