import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

// const saves = JSON.parse('[{"name":"Electrical Panel","workspace":{"height":"57","width":"87","scale":10},"features":[{"name":"Battery","size":{"height":"9","width":"21"},"position":{"left":0,"top":48},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Inverter","size":{"height":"9","width":"19.5"},"position":{"left":"28","top":"42"},"color":{"background":"#0026ff","border":"#000000"}},{"name":"Inverter Switch","size":{"height":"3","width":"3"},"position":{"left":"18","top":"36"},"color":{"background":"#fe0000","border":"#000000"}},{"name":"Fuse Block Switch","size":{"height":"3","width":"3"},"position":{"left":"11","top":"29"},"color":{"background":"#fe0000","border":"#000000"}},{"name":"Inverter In/Out Switch","size":{"height":"3","width":"3"},"position":{"left":"26","top":"36"},"color":{"background":"#fe0000","border":"#000000"}},{"name":"12v Fuse Block","size":{"height":"6.5","width":"3.25"},"position":{"left":"18","top":"23.5"},"color":{"background":"#806b00","border":"#000000"}},{"name":"Circuit Breaker","size":{"height":"14","width":"12.5"},"position":{"left":"35","top":"23"},"color":{"background":"#a8a8a8","border":"#000000"}},{"name":"Disconnect","size":{"height":"10","width":"5"},"position":{"left":"26","top":"23"},"color":{"background":"#a8a8a8","border":"#000000"}},{"name":"12v -","size":{"height":"1","width":"5"},"position":{"left":"6","top":"41"},"color":{"background":"#ffffff","border":"#000000"}},{"name":"12v +","size":{"height":"1","width":"5"},"position":{"left":"6","top":"36"},"color":{"background":"#fe0000","border":"#000000"}}]},{"name":"Floor Plan","workspace":{"height":"87","width":"322","scale":10},"features":[{"name":"Garage","size":{"height":"87","width":"22"},"position":{"left":"0","top":"0"},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Garage Wall","size":{"height":"87","width":"3"},"position":{"left":"22","top":"0"},"color":{"background":"#800001","border":"#000000"}},{"name":"Wheel Well","size":{"height":"22.5","width":"42"},"position":{"left":"109.5","top":"0"},"color":{"background":"#ffffff","border":"#000000"}}]}]');

export default new Vuex.Store({
  strict: true,
  state: {
    saves: [],
    editingSave: false,
    editingFeature: false
  },
  mutations: {
    updateWorkspaceName (state, value) {
      state.saves[state.editingSave].name = value;
    },
    updateWorkspaceWidth (state, value) {
      state.saves[state.editingSave].workspace.width = value;
    },
    updateWorkspaceHeight (state, value) {
      state.saves[state.editingSave].workspace.height = value;
    },
    updateName (state, name) {
      state.saves[state.editingSave].features[state.editingFeature].name = name;
    },
    updateSizeWidth (state, width) {
      state.saves[state.editingSave].features[state.editingFeature].size.width = width;
    },
    updateSizeHeight (state, height) {
      state.saves[state.editingSave].features[state.editingFeature].size.height = height;
    },
    updatePosition (state, position) {
      state.saves[state.editingSave].features[state.editingFeature].position = position;
    },
    updatePositionLeft (state, value) {
      state.saves[state.editingSave].features[state.editingFeature].position.left = value;
    },
    updatePositionTop (state, value) {
      state.saves[state.editingSave].features[state.editingFeature].position.top = value;
    },
    updateColorBackground (state, value) {
      state.saves[state.editingSave].features[state.editingFeature].color.background = value;
    },
    updateColorBorder (state, value) {
      state.saves[state.editingSave].features[state.editingFeature].color.border = value;
    },
    addFeature (state) {
      const newIndex = state.saves[state.editingSave].features.length;
      const newFeature = {
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
      };
      state.saves[state.editingSave].features.push(newFeature);
      state.editingFeature = newIndex;
    },
    deleteFeature (state, index) {
      state.saves[state.editingSave].features.splice(index, 1);
    },
    copyFeature (state, index) {
      const duplicatedFeature = JSON.parse(JSON.stringify(state.saves[state.editingSave].features[index]));
      duplicatedFeature.name = `${duplicatedFeature.name} copy`;
      state.saves[state.editingSave].features.push(duplicatedFeature);
    },
    addWorkspace (state) {
      const newIndex = state.saves.length;
      const newWorkspace = {
        name: '',
        workspace: {
          height: 48,
          width: 48,
          scale: 10
        },
        features: []
      };
      state.saves.push(newWorkspace);
      state.editingWorkspace = newIndex;
    },
    deleteWorkspace (state, index) {
      state.saves.splice(index, 1);
    },
    copyWorkspace (state, index) {
      const duplicatedWorkspace = JSON.parse(JSON.stringify(state.saves[index]));
      duplicatedWorkspace.name = `${duplicatedWorkspace.name} copy`;
      state.saves.push(duplicatedWorkspace);
    },
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
    zoomIn (state) {
      state.saves[state.editingSave].workspace.scale = state.saves[state.editingSave].workspace.scale - 1;
    },
    zoomOut (state) {
      state.saves[state.editingSave].workspace.scale = state.saves[state.editingSave].workspace.scale + 1;
    },
    clearWorkspace (state) {
      state.saves[state.editingSave].features = [];
    }
  },
  plugins: [createPersistedState()]
});