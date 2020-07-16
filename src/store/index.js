import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies); 
Vue.use(Vuex);

const cookieSaves = Vue.$cookies.get('saves') ? JSON.parse(Vue.$cookies.get('saves')) : [];
const cookieEditingSave = Vue.$cookies.get('editingSave') && Vue.$cookies.get('editingSave') !== 'false' ? parseInt(Vue.$cookies.get('editingSave')) : false;
const cookieEditingFeature = Vue.$cookies.get('editingFeature') && Vue.$cookies.get('editingFeature') !== 'false' ? parseInt(Vue.$cookies.get('editingFeature')) : false;
 
export default new Vuex.Store({
  state: {
    saves: cookieSaves,
    editingSave: cookieEditingSave,
    editingFeature: cookieEditingFeature
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
    // }
  },
  mutations: {
    saveWorkspaces (state, saves) {
      state.saves = saves;
      Vue.$cookies.set('saves', JSON.stringify(saves));
      console.log(saves);
    },
    saveEditingSave (state, index) {
      state.editingSave = index;
      Vue.$cookies.set('editingSave', index);
      console.log(index);
    },
    saveEditingFeature (state, index) {
      state.editingFeature = index;
      Vue.$cookies.set('editingFeature', index);
      console.log(index);
    }
  },
  actions: {}
});