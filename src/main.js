import Vue from 'vue';
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);
Vue.$cookies.config('30d');
import App from './App.vue';
import store from './store';

import './assets/styles/index.css';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
