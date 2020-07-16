<template>
  <div id="controls" class="w-4/12 overflow-y-auto">

    <Panel title="Workspace">
      <div v-if="$store.state.editingSave !== false">
        <SimpleInput label="Layout Name" placeholder="Floor plan" :value="$store.state.saves[$store.state.editingSave].name" @input="(name) => {saves[editingSave].name = name}" />
        <div class="w-full">
          <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
            Size
          </label>
        </div>
        <div class="flex mb-4">
          <div class="w-1/2 mr-6">
            <InchInput label="Width" placeholder="20" labelClass="text-gray-500 text-xs" :value="$store.state.saves[$store.state.editingSave].workspace.width" @input="(width) => {saves[editingSave].workspace.width = width}" />
          </div>
          <div class="w-1/2">
            <InchInput label="Height" placeholder="40" labelClass="text-gray-500 text-xs" :value="$store.state.saves[$store.state.editingSave].workspace.height" @input="(height) => {saves[editingSave].workspace.height = height}" />
          </div>
        </div>
      </div>
      <div v-else>
        <h2 v-if="$store.state.saves.length" class="tracking-wide text-gray-700 text-sm font-medium mb-2">Load a Workspace</h2>
        <ul class="my-6">
          <li v-for="(save, index) in $store.state.saves" :key="index" class="flex justify-between tracking-wide text-gray-500 text-sm mb-4">
            <span>{{ save.name }}</span>
            <div>
              <button v-on:click="copyWorkspace(index)" class="bg-gray-200 text-gray-600 hover:bg-gray-400 mr-2 py-1 px-3 rounded text-sm font-medium transition-colors duration-300">Duplicate</button>
              <button v-on:click="editWorkspace(index)" class="bg-gray-200 text-gray-600 hover:bg-gray-400 mr-2 py-1 px-3 rounded text-sm font-medium transition-colors duration-300">Load</button>
              <button v-on:click="deleteWorkspace(index)" class="bg-gray-200 text-gray-600 hover:bg-gray-400 py-1 px-2 rounded text-sm font-medium transition-colors duration-300">Delete</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex justify-end">
        <button v-on:click="deleteWorkspace($store.state.editingSave)" v-if="$store.state.editingSave !== false" class="bg-red-500 hover:bg-red-700 text-white border border-transparent mr-2 text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Delete Workspace</button>
        <button v-on:click="addWorkspace" v-if="$store.state.editingSave === false" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Add Workspace</button>
        <button v-on:click="saveWorkspace" v-if="$store.state.editingSave !== false" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Save Workspace</button>
      </div>
    </Panel>

    <Panel title="Add/Edit Features">
      <div v-if="$store.state.editingFeature !== false && $store.state.editingSave !== false">
        <SimpleInput label="Feature Name" placeholder="Main Circuit Breaker" :value="$store.state.saves[$store.state.editingSave].features[$store.state.editingFeature].name" @input="(name) => {saves[editingSave].features[editingFeature].name = name; updateFeature();}" />
        <div class="w-full">
          <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
            Size
          </label>
        </div>
        <div class="flex mb-4">
          <div class="w-1/2 mr-6">
            <InchInput label="Width" placeholder="55" labelClass="text-gray-500 text-xs" :value="$store.state.saves[$store.state.editingSave].features[$store.state.editingFeature].size.width" @input="(width) => {saves[editingSave].features[editingFeature].size.width = width; updateFeature();}" />
          </div>
          <div class="w-1/2">
            <InchInput label="Height" placeholder="22" labelClass="text-gray-500 text-xs" :value="$store.state.saves[$store.state.editingSave].features[$store.state.editingFeature].size.height" @input="(height) => {saves[editingSave].features[editingFeature].size.height = height; updateFeature();}" />
          </div>
        </div>
        <div class="w-full">
          <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
            Position
          </label>
        </div>
        <div class="flex mb-4">
          <div class="w-1/2 mr-6">
            <InchInput label="Left" placeholder="0" labelClass="text-gray-500 text-xs" :value="$store.state.saves[$store.state.editingSave].features[$store.state.editingFeature].position.left" @input="(left) => {saves[editingSave].features[editingFeature].position.left = left; updateFeature();}" />
          </div>
          <div class="w-1/2">
            <InchInput label="Top" placeholder="0" labelClass="text-gray-500 text-xs" :value="$store.state.saves[$store.state.editingSave].features[$store.state.editingFeature].position.top" @input="(top) => {saves[editingSave].features[editingFeature].position.top = top; updateFeature();}" />
          </div>
        </div>
        <div class="w-full">
          <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
            Color
          </label>
        </div>
        <div class="flex mb-4">
          <div class="w-1/2 mr-6">
            <ColorSelect label="Background" :value="$store.state.saves[$store.state.editingSave].features[$store.state.editingFeature].color.background" @input="(background) => {saves[editingSave].features[editingFeature].color.background = background; updateFeature();}" />
          </div>
          <div class="w-1/2">
            <ColorSelect label="Border" :value="$store.state.saves[$store.state.editingSave].features[$store.state.editingFeature].color.border" @input="(border) => {saves[editingSave].features[editingFeature].color.border = border; updateFeature();}" />
          </div>
        </div>
      </div>
      <p v-if="$store.state.editingSave === false" class="text-gray-500 text-sm">Select or create a Workspace.</p>
      <p v-if="$store.state.editingFeature === false && $store.state.editingSave !== false && $store.state.saves[$store.state.editingSave].features.length" class="text-gray-500 text-sm mb-4">Click on an existing feature to edit it.</p>
      <div v-if="$store.state.editingSave !== false" class="flex justify-end">
        <button v-on:click="deleteFeature" v-if="$store.state.editingFeature !== false" class="bg-red-500 hover:bg-red-700 text-white border border-transparent mr-2 text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Delete Feature</button>
        <button v-on:click="saveFeature" v-if="$store.state.editingFeature !== false" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Save Feature</button>
        <button v-on:click="addFeature" v-if="$store.state.editingFeature === false && $store.state.editingSave !== false" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Add Feature</button>
      </div>
      
    </Panel>

    <!-- <Panel title="Save">

      <div v-if="saves.length" class="mb-6">
        <p class="block tracking-wide text-gray-700 text-sm font-medium mb-2" for="grid-last-name">
          Saved Workspaces
        </p>
        <ul class="">
          <li v-for="(save, index) in saves" :key="save.name" class="flex mb-4">
            <span class="flex-grow text-sm text-gray-600">{{ save.name }}</span>
            <button v-on:click="loadSave(index)" class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 mr-2 rounded inline-flex items-center">
              <span>Load</span>
            </button>
            <button v-on:click="deleteSave(index)" class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded inline-flex items-center">
              <span>Delete</span>
            </button>
          </li>
        </ul>
      </div>
      <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2" for="grid-last-name">
        Workspace Name
      </label>
      <input v-model="tmpSave.name" placeholder="Electrical Layout" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm mb-4">
      <div class="flex justify-end">
        <button v-on:click="addSave" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">Save Workspace</button>
      </div>
      
    </Panel> -->

  </div>
</template>

<script>
import Panel from './Panel/Panel.vue';
import SimpleInput from './Panel/SimpleInput.vue';
import InchInput from './Panel/InchInput.vue';
import ColorSelect from './Panel/ColorSelect.vue';

export default {
  name: 'Controls',
  components: {
    Panel,
    SimpleInput,
    InchInput,
    ColorSelect
  },
  methods: {
    addFeature: function () {
      const newIndex = this.$store.state.saves[this.$store.state.editingSave].features.length;
      this.saves[this.editingSave].features = [ 
        ...this.$store.state.saves[this.$store.state.editingSave].features, 
        {
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
        } 
      ];
      this.editingFeature = newIndex;
      this.$store.commit('saveWorkspaces', this.saves);
      this.$store.commit('saveEditingFeature', this.editingFeature);
    },
    saveFeature: function () {
      this.editingFeature = false;
      this.$store.commit('saveEditingFeature', this.editingFeature);
    },
    editFeature: function (index) {
      this.editingFeature = index;
      this.$store.commit('saveEditingFeature', this.editingFeature);
    },
    updateFeature: function () {
      this.$store.commit('saveWorkspaces', this.saves);
    },
    deleteFeature: function () {
      this.saves[this.editingSave].features.splice(this.editingFeature, 1);
      this.editingFeature = false;
      this.$store.commit('saveWorkspaces', this.saves);
      this.$store.commit('saveEditingFeature', this.editingFeature);
    },
    addWorkspace: function () {
      const newIndex = this.$store.state.saves.length;
      this.saves = [ 
        ...this.$store.state.saves, 
        {
          name: '',
          workspace: {
            height: 48,
            width: 48,
            scale: 1
          },
          features: []
        }
      ];
      this.editingSave = newIndex;
      this.$store.commit('saveWorkspaces', this.saves);
      this.$store.commit('saveEditingSave', this.editingSave);
    },
    saveWorkspace: function () {
      if (this.$store.state.saves[this.$store.state.editingSave].name) {
        this.editingSave = false;
        this.editingFeature = false;
        this.$store.commit('saveWorkspaces', this.saves);
        this.$store.commit('saveEditingSave', this.editingSave);
        this.$store.commit('saveEditingFeature', this.editingFeature);
      } else {
        alert('Name the Workspace in order to save it!');
      }
    },
    editWorkspace: function (index) {
      this.editingSave = index;
      this.$store.commit('saveEditingSave', this.editingSave);
    },
    deleteWorkspace: function (index) {
      this.saves.splice(index, 1);
      this.editingSave = false;
      this.$store.commit('saveWorkspaces', this.saves);
      this.$store.commit('saveEditingSave', this.editingSave);
    },
    copyWorkspace: function (index) {
      const newIndex = this.$store.state.saves.length;
      const duplicatedWorkspace = { ...this.$store.state.saves[index] };
      duplicatedWorkspace.name = `${duplicatedWorkspace.name} copy`;
      this.saves = [ 
        ...this.$store.state.saves, 
        duplicatedWorkspace
      ];
      this.editingSave = newIndex;
      this.$store.commit('saveWorkspaces', this.saves);
      this.$store.commit('saveEditingSave', this.editingSave);
    }
  },
  data() {
    return {
      saves: this.$store.state.saves,
      editingSave: this.$store.state.editingSave,
      editingFeature: this.$store.state.editingFeature
    }
  }
}
</script>

<style>
#area,
#workspace {
  font-size: 10px;
}

.moveable-line {
  background: transparent !important;
}
</style>
