import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies); 
Vue.use(Vuex);

const cookieSaves = Vue.$cookies.get('saves');
const cookieEditingSave = Vue.$cookies.get('editingSave') !== 'false' ? parseInt(Vue.$cookies.get('editingSave')) : false;
const cookieEditingFeature = Vue.$cookies.get('editingFeature') !== 'false' ? parseInt(Vue.$cookies.get('editingFeature')) : false;
console.log(cookieSaves, cookieEditingSave, cookieEditingFeature);
 
export default new Vuex.Store({
  state: {
    saves: Vue.$cookies.get('saves') ? JSON.parse(Vue.$cookies.get('saves')) : [
      {
        name: '',
        workspace: {
          height: '48',
          width: '48',
          scale: 1
        },
        features: []
      }
    ],
    editingSave: cookieEditingSave,
    editingFeature: Vue.$cookies.get('editingFeature') !== 'false' ? Vue.$cookies.get('editingFeature') : false
  },
  getters: {
    // featureSize: (state) => (index) => {
    //   return state.features[index].size;
    // },
    // featurePosition: (state) => (index) => {
    //   return state.features[index].position;
    // },
    // featureMaxPosition: (state) => (index) => {
    //   const left = state.workspaceWidth - state.features[index].size.width;
    //   const top = state.workspaceHeight - state.features[index].size.height
      
    //   return {left, top};
    // },
  },
  mutations: {},
  actions: {}
});