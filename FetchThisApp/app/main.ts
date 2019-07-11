import Vue from 'nativescript-vue';
import App from './components/App.vue';
import store from './store';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/fonts-css/fontawesome.css'
};

TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
);

Vue.registerElement(
  'CheckBox',
  () => require('nativescript-checkbox').CheckBox
);

new Vue({
  store,
  computed: {
    shoppingItems() {
      return this.$store.state.shoppingItems
    }
  },
  render: h => h('frame', [h(App)])
}).$start();
