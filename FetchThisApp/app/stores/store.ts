import Vue from 'vue';
import Vuex from 'vuex';
import shoppingList from './shopping-list.store';
import inAppChanges from './in-app-changes.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shoppingList, inAppChanges
  }
});