import Vue from 'vue';
import Vuex from 'vuex';
import cookie from 'vue-cookies';
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  state: {
    saves: cookie.get('saves') ? JSON.parse(cookie.get('saves')) : [
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
    editingSave: cookie.get('editingSave') ? JSON.parse(cookie.get('editingSave')) : 0,
    editingFeature: cookie.get('editingFeature') ? JSON.parse(cookie.get('editingFeature')) : false
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