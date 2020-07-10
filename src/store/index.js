import Vue from 'vue';
import Vuex from 'vuex';
import cookie from 'vue-cookies';
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  state: {
    workspaceWidth: cookie.get('workspaceWidth') ? JSON.parse(cookie.get('workspaceWidth')) : 50,
    workspaceHeight: cookie.get('workspaceHeight') ? JSON.parse(cookie.get('workspaceHeight')) : 20,
    workspaceScale: cookie.get('workspaceScale') ? JSON.parse(cookie.get('workspaceScale')) : 1,
    tmpFeature: {
      name: '',
      size: {
        height: null,
        width: null
      },
      position: {
        left: null,
        top: null
      },
      color: {
        background: '#ffffff',
        border: '#000000'
      }
    },
    features: cookie.get('features') ? JSON.parse(cookie.get('features')) : [],
    tmpSave: {
      name: ''
    },
    saves: cookie.get('saves') ? JSON.parse(cookie.get('saves')) : []
  },
  getters: {
    featureSize: (state) => (index) => {
      return state.features[index].size;
    },
    featurePosition: (state) => (index) => {
      return state.features[index].position;
    },
    featureMaxPosition: (state) => (index) => {
      const left = state.workspaceWidth - state.features[index].size.width;
      const top = state.workspaceHeight - state.features[index].size.height
      
      return {left, top};
    },
  },
  mutations: {},
  actions: {}
});