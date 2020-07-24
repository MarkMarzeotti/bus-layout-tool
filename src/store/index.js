import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

// const saves = JSON.parse('[{"name":"Electrical Panel","workspace":{"height":"57","width":"87","scale":10},"features":[{"name":"Battery","size":{"height":"9","width":"21"},"position":{"left":0,"top":48},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Inverter","size":{"height":"9","width":"19.5"},"position":{"left":"28","top":"42"},"color":{"background":"#0026ff","border":"#000000"}},{"name":"Inverter Switch","size":{"height":"3","width":"3"},"position":{"left":"18","top":"36"},"color":{"background":"#fe0000","border":"#000000"}},{"name":"Fuse Block Switch","size":{"height":"3","width":"3"},"position":{"left":"11","top":"29"},"color":{"background":"#fe0000","border":"#000000"}},{"name":"Inverter In/Out Switch","size":{"height":"3","width":"3"},"position":{"left":"26","top":"36"},"color":{"background":"#fe0000","border":"#000000"}},{"name":"12v Fuse Block","size":{"height":"6.5","width":"3.25"},"position":{"left":"18","top":"23.5"},"color":{"background":"#806b00","border":"#000000"}},{"name":"Circuit Breaker","size":{"height":"14","width":"12.5"},"position":{"left":"35","top":"23"},"color":{"background":"#a8a8a8","border":"#000000"}},{"name":"Disconnect","size":{"height":"10","width":"5"},"position":{"left":"26","top":"23"},"color":{"background":"#a8a8a8","border":"#000000"}},{"name":"12v -","size":{"height":"1","width":"5"},"position":{"left":"6","top":"41"},"color":{"background":"#ffffff","border":"#000000"}},{"name":"12v +","size":{"height":"1","width":"5"},"position":{"left":"6","top":"36"},"color":{"background":"#fe0000","border":"#000000"}}]},{"name":"Floor Plan","workspace":{"height":"87","width":"322","scale":10},"features":[{"name":"Garage","size":{"height":"87","width":"22"},"position":{"left":"0","top":"0"},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Garage Wall","size":{"height":"87","width":"3"},"position":{"left":"22","top":"0"},"color":{"background":"#800001","border":"#000000"}},{"name":"Wheel Well","size":{"height":"22.5","width":"42"},"position":{"left":"109.5","top":"0"},"color":{"background":"#ffffff","border":"#000000"}}]}]');

export default new Vuex.Store({
  state: {
    saves: [],
    editingSave: false,
    editingFeature: false
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
      console.log(state.saves, state.editingSave, state.editingFeature);
    },
    saveEditingSave (state, index) {
      state.editingSave = index;
      console.log(state.saves, state.editingSave, state.editingFeature);
    },
    saveEditingFeature (state, index) {
      state.editingFeature = index;
      console.log(state.saves, state.editingSave, state.editingFeature);
    },
    // fix (state) {
    //   console.log(state.saves);
    //   const saves = [];
    //   for (const save in state.saves) {
    //     saves.push(state.saves[save]);
    //   }
    //   state.saves = saves;
    //   console.log(state.saves);
    // }
  },
  actions: {},
  plugins: [createPersistedState()]
});