import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

// {"saves":[{"name":"Floor Plan","workspace":{"height":"87","width":"322","scale":4},"features":[{"name":"Garage Wall","size":{"height":"87","width":"3"},"position":{"left":"22","top":"0"},"color":{"background":"#804000","border":"#000000"}},{"name":"Wheel Well","size":{"height":"22.5","width":"42"},"position":{"left":111.75,"top":0},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Wheel Well","size":{"height":"22.5","width":"42"},"position":{"left":"109.5","top":"64.5"},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Stairs","size":{"height":"30","width":"6"},"position":{"left":"316","top":57},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Drivers Seat","size":{"height":"30","width":"9.5"},"position":{"left":"312.5","top":"0"},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Bathroom Wall","size":{"height":"32.5","width":"2.5"},"position":{"left":"109.5","top":"0"},"color":{"background":"#804000","border":"#000000"}},{"name":"Closet Wall","size":{"height":"27","width":"2.5"},"position":{"left":"109.5","top":"60"},"color":{"background":"#804000","border":"#000000"}},{"name":"Shower","size":{"height":"32","width":"34"},"position":{"left":"175.5","top":"1.5"},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Shower Wall","size":{"height":"36","width":"3"},"position":{"left":"209.5","top":null},"color":{"background":"#804000","border":"#000000"}},{"name":"Counter w/ Sink","size":{"height":"24","width":"36"},"position":{"left":"212.5","top":"0"},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Refrigerator","size":{"height":"26","width":"27.6"},"position":{"left":"154","top":61},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Closet Wall","size":{"height":"27","width":"2.5"},"position":{"left":151.4,"top":"60"},"color":{"background":"#804000","border":"#000000"}},{"name":"Counter","size":{"height":"24","width":"36"},"position":{"left":"248.5","top":0},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Mark Work Chair","size":{"height":"16","width":"16"},"position":{"left":"290","top":"4"},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Fridge Wall","size":{"height":"27","width":"2.5"},"position":{"left":"181.5","top":60},"color":{"background":"#804000","border":"#000000"}},{"name":"Garage","size":{"height":"87","width":"22"},"position":{"left":null,"top":null},"color":{"background":"#ffffff","border":"#000000"}}]},{"name":"Electrical","workspace":{"height":"57","width":"87","scale":10},"features":[{"name":"Battery","size":{"height":"9","width":"21"},"position":{"left":0,"top":48},"color":{"background":"#ffffff","border":"#000000"}},{"name":"12v +","size":{"height":"1","width":"5"},"position":{"left":"6","top":"36"},"color":{"background":"#fe0000","border":"#000000"}},{"name":"12v -","size":{"height":"1","width":"5"},"position":{"left":"6","top":"41"},"color":{"background":"#ffffff","border":"#000000"}},{"name":"Inverter Switch","size":{"height":"3","width":"3"},"position":{"left":"18","top":"36"},"color":{"background":"#fe0000","border":"#000000"}},{"name":"Fuse Block Switch","size":{"height":"3","width":"3"},"position":{"left":"11","top":"29"},"color":{"background":"#fe0000","border":"#000000"}},{"name":"Battery Switch","size":{"height":"3","width":"3"},"position":{"left":"26","top":"36"},"color":{"background":"#fe0000","border":"#000000"}},{"name":"12v Fuse Block","size":{"height":"6.5","width":"3.25"},"position":{"left":"18","top":"23.5"},"color":{"background":"#806b00","border":"#000000"}},{"name":"Disconnect","size":{"height":"10","width":"5"},"position":{"left":"26","top":"23"},"color":{"background":"#a8a8a8","border":"#000000"}},{"name":"Circuit Breaker","size":{"height":"14","width":"12.5"},"position":{"left":"35","top":"23"},"color":{"background":"#a8a8a8","border":"#000000"}},{"name":"Inverter","size":{"height":"9","width":"19.5"},"position":{"left":"28","top":"42"},"color":{"background":"#0026ff","border":"#000000"}}]}],"editingSave":2,"editingFeature":false,"editingWorkspace":false}

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
      console.log(state);
    },
    updateWorkspaceWidth (state, value) {
      state.saves[state.editingSave].workspace.width = value;
      console.log(state);
    },
    updateWorkspaceHeight (state, value) {
      state.saves[state.editingSave].workspace.height = value;
      console.log(state);
    },
    updateName (state, name) {
      state.saves[state.editingSave].features[state.editingFeature].name = name;
      console.log(state);
    },
    updateSizeWidth (state, width) {
      state.saves[state.editingSave].features[state.editingFeature].size.width = width;
      console.log(state);
    },
    updateSizeHeight (state, height) {
      state.saves[state.editingSave].features[state.editingFeature].size.height = height;
      console.log(state);
    },
    updatePosition (state, position) {
      state.saves[state.editingSave].features[state.editingFeature].position = position;
      console.log(state);
    },
    updatePositionLeft (state, value) {
      state.saves[state.editingSave].features[state.editingFeature].position.left = value;
      console.log(state);
    },
    updatePositionTop (state, value) {
      state.saves[state.editingSave].features[state.editingFeature].position.top = value;
      console.log(state);
    },
    updateColorBackground (state, value) {
      state.saves[state.editingSave].features[state.editingFeature].color.background = value;
      console.log(state);
    },
    updateColorBorder (state, value) {
      state.saves[state.editingSave].features[state.editingFeature].color.border = value;
      console.log(state);
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
      console.log(state);
    },
    deleteFeature (state, index) {
      state.saves[state.editingSave].features.splice(index, 1);
      console.log(state);
    },
    copyFeature (state, index) {
      const duplicatedFeature = JSON.parse(JSON.stringify(state.saves[state.editingSave].features[index]));
      duplicatedFeature.name = `${duplicatedFeature.name} copy`;
      state.saves[state.editingSave].features.push(duplicatedFeature);
      console.log(state);
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
      state.editingSave = newIndex;
      console.log(state);
    },
    deleteWorkspace (state, index) {
      state.saves.splice(index, 1);
      console.log(state);
      console.log(JSON.stringify(state));
    },
    copyWorkspace (state, index) {
      const duplicatedWorkspace = JSON.parse(JSON.stringify(state.saves[index]));
      duplicatedWorkspace.name = `${duplicatedWorkspace.name} copy`;
      state.saves.push(duplicatedWorkspace);
      console.log(state);
    },
    saveWorkspaces (state, saves) {
      state.saves = saves;
      console.log(state);
    },
    saveEditingSave (state, index) {
      state.editingSave = index;
      console.log(state);
    },
    saveEditingFeature (state, index) {
      state.editingFeature = index;
      console.log(state);
    },
    zoomIn (state) {
      state.saves[state.editingSave].workspace.scale = state.saves[state.editingSave].workspace.scale - 1;
      console.log(state);
    },
    zoomOut (state) {
      state.saves[state.editingSave].workspace.scale = state.saves[state.editingSave].workspace.scale + 1;
      console.log(state);
    },
    clearWorkspace (state) {
      state.saves[state.editingSave].features = [];
      console.log(state);
    }
  },
  plugins: [createPersistedState()]
});