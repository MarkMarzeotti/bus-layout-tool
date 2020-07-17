import Vue from 'vue';
import App from './App.vue';
import store from './store';

import './assets/styles/index.css';

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    sanitizeText: function (name) {
      name = name.toLowerCase();
      name = name.replace(/[\s]/g, '-');
      name = name.replace(/[^a-z0-9_-]/g, '');
      return name;
    }
  }
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
