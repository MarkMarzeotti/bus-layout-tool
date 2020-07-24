<template>
  <div id="controls" class="w-4/12 overflow-y-auto">

    <Panel title="Workspace">
      <div v-if="$store.state.editingSave !== false">
        <SimpleInput label="Layout Name" placeholder="Floor plan" :value="$store.state.saves[$store.state.editingSave].name" @input="(name) => {
          const saves = [ ...$store.state.saves ]; 
          saves[$store.state.editingSave].name = name; 
          $store.commit('saveWorkspaces', saves);
        }" />
        <div class="w-full">
          <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
            Size
          </label>
        </div>
        <div class="flex mb-4">
          <div class="w-1/2 mr-6">
            <InchInput label="Width" placeholder="20" labelClass="text-gray-500 text-xs" :value="$store.state.saves[$store.state.editingSave].workspace.width" @input="(width) => {
              const saves = [ ...$store.state.saves ]; 
              saves[$store.state.editingSave].workspace.width = width;
              $store.commit('saveWorkspaces', saves);
            }" />
          </div>
          <div class="w-1/2">
            <InchInput label="Height" placeholder="40" labelClass="text-gray-500 text-xs" :value="$store.state.saves[$store.state.editingSave].workspace.height" @input="(height) => {
              const saves = [ ...$store.state.saves ]; 
              saves[$store.state.editingSave].workspace.height = height;
              $store.commit('saveWorkspaces', saves);
            }" />
          </div>
        </div>
      </div>
      <div v-else>
        <h2 v-if="$store.state.saves.length" class="tracking-wide text-gray-700 text-sm font-medium mb-2">Load a Workspace</h2>
        <ul v-if="$store.state.saves.length" class="my-6">
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
        <SimpleInput v-model="name" label="Feature Name" placeholder="Main Circuit Breaker" />
        <div class="w-full">
          <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
            Size
          </label>
        </div>
        <div class="flex mb-4">
          <div class="w-1/2 mr-6">
            <InchInput v-model="sizeWidth" label="Width" placeholder="55" labelClass="text-gray-500 text-xs" />
          </div>
          <div class="w-1/2">
            <InchInput v-model="sizeHeight" label="Height" placeholder="22" labelClass="text-gray-500 text-xs" />
          </div>
        </div>
        <div class="w-full">
          <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
            Position
          </label>
        </div>
        <div class="flex mb-4">
          <div class="w-1/2 mr-6">
            <InchInput v-model="positionLeft" label="Left" placeholder="0" labelClass="text-gray-500 text-xs" />
          </div>
          <div class="w-1/2">
            <InchInput v-model="positionTop" label="Top" placeholder="0" labelClass="text-gray-500 text-xs" />
          </div>
        </div>
        <div class="w-full">
          <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
            Color
          </label>
        </div>
        <div class="flex mb-4">
          <div class="w-1/2 mr-6">
            <ColorSelect v-model="colorBackground" label="Background" />
          </div>
          <div class="w-1/2">
            <ColorSelect v-model="colorBorder" label="Border" />
          </div>
        </div>
      </div>
      <div v-else>
        <p v-if="$store.state.editingSave === false" class="text-gray-500 text-sm">Select or create a Workspace.</p>
        <p v-if="$store.state.editingFeature === false && $store.state.editingSave !== false && $store.state.saves[$store.state.editingSave].features.length" class="text-gray-500 text-sm mb-4">Click on an existing feature to edit it, or select a feature below.</p>

        <ul v-if="$store.state.saves.length && $store.state.editingSave && $store.state.saves[$store.state.editingSave].features.length" class="my-6">
          <li v-for="(feature, index) in $store.state.saves[$store.state.editingSave].features" :key="index" class="flex justify-between tracking-wide text-gray-500 text-sm mb-4">
            <span>{{ feature.name }}</span>
            <div>
              <button v-on:click="copyFeature(index)" class="bg-gray-200 text-gray-600 hover:bg-gray-400 mr-2 py-1 px-3 rounded text-sm font-medium transition-colors duration-300">Duplicate</button>
              <button v-on:click="editFeature(index)" class="bg-gray-200 text-gray-600 hover:bg-gray-400 mr-2 py-1 px-3 rounded text-sm font-medium transition-colors duration-300">Load</button>
              <button v-on:click="deleteFeature(index)" class="bg-gray-200 text-gray-600 hover:bg-gray-400 py-1 px-2 rounded text-sm font-medium transition-colors duration-300">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="$store.state.editingSave !== false" class="flex justify-end">
        <button v-on:click="deleteFeature(false)" v-if="$store.state.editingFeature !== false" class="bg-red-500 hover:bg-red-700 text-white border border-transparent mr-2 text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Delete Feature</button>
        <button v-on:click="saveFeature" v-if="$store.state.editingFeature !== false" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Save Feature</button>
        <button v-on:click="addFeature" v-if="$store.state.editingFeature === false && $store.state.editingSave !== false" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Add Feature</button>
      </div>
      
    </Panel>

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
  data() {
    return {
      message: 'meow',
    }
  },
  computed: {
    name: {
      get() {
        return this.$store.state.saves[this.$store.state.editingSave].features[this.$store.state.editingFeature].name;
      },
      set(value) {
        this.$store.commit('updateName', value);
      },
    },
    sizeWidth: {
      get() {
        return this.$store.state.saves[this.$store.state.editingSave].features[this.$store.state.editingFeature].size.width;
      },
      set(value) {
        this.$store.commit('updateSizeWidth', value);
      },
    },
    sizeHeight: {
      get() {
        return this.$store.state.saves[this.$store.state.editingSave].features[this.$store.state.editingFeature].size.height;
      },
      set(value) {
        this.$store.commit('updateSizeHeight', value);
      },
    },
    positionLeft: {
      get() {
        return this.$store.state.saves[this.$store.state.editingSave].features[this.$store.state.editingFeature].position.left;
      },
      set(value) {
        this.$store.commit('updatePositionLeft', value);
      },
    },
    positionTop: {
      get() {
        return this.$store.state.saves[this.$store.state.editingSave].features[this.$store.state.editingFeature].position.top;
      },
      set(value) {
        this.$store.commit('updatePositionTop', value);
      },
    },
    colorBackground: {
      get() {
        return this.$store.state.saves[this.$store.state.editingSave].features[this.$store.state.editingFeature].color.background;
      },
      set(value) {
        this.$store.commit('updateColorBackground', value);
      },
    },
    colorBorder: {
      get() {
        return this.$store.state.saves[this.$store.state.editingSave].features[this.$store.state.editingFeature].color.border;
      },
      set(value) {
        this.$store.commit('updateColorBorder', value);
      },
    },
  },
  methods: {
    addFeature: function () {
      const newIndex = this.$store.state.saves[this.$store.state.editingSave].features.length;
      const newSaves = [ ...this.$store.state.saves ];
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
      newSaves[this.$store.state.editingSave].features.push(newFeature);
      this.$store.commit('saveWorkspaces', newSaves);
      this.$store.commit('saveEditingFeature', newIndex);
    },
    saveFeature: function () {
      this.$store.commit('saveEditingFeature', false);
    },
    editFeature: function (index) {
      this.$store.commit('saveEditingFeature', index);
    },
    deleteFeature: function (index) {
      const deleteIndex = index !== false ? index : this.$store.state.editingFeature;
      const newSaves = [ ...this.$store.state.saves ];
      newSaves[this.$store.state.editingSave].features.splice(deleteIndex, 1);
      this.$store.commit('saveWorkspaces', newSaves);
      this.$store.commit('saveEditingFeature', false);
    },
    copyFeature: function (index) {
      const newIndex = this.$store.state.saves[this.$store.state.editingSave].features.length;
      const duplicatedFeature = { ...this.$store.state.saves[this.$store.state.editingSave].features[index] };
      duplicatedFeature.name = `${duplicatedFeature.name} copy`;
      const saves = [ ...this.$store.state.saves ];
      saves[this.$store.state.editingSave].features = [ 
        ...this.$store.state.saves[this.$store.state.editingSave].features, 
        duplicatedFeature
      ];
      this.$store.commit('saveWorkspaces', saves);
      this.$store.commit('saveEditingFeature', newIndex);
    },
    addWorkspace: function () {
      const newIndex = this.$store.state.saves.length;
      const saves = [ 
        ...this.$store.state.saves, 
        {
          name: '',
          workspace: {
            height: 48,
            width: 48,
            scale: 10
          },
          features: []
        }
      ];
      this.$store.commit('saveWorkspaces', saves);
      this.$store.commit('saveEditingSave', newIndex);
    },
    saveWorkspace: function () {
      if (this.$store.state.saves[this.$store.state.editingSave].name) {
        this.$store.commit('saveEditingSave', false);
        this.$store.commit('saveEditingFeature', false);
      } else {
        alert('Name the Workspace in order to save it!');
      }
    },
    editWorkspace: function (index) {
      this.$store.commit('saveEditingSave', index);
    },
    deleteWorkspace: function (index) {
      const saves = [ ...this.$store.state.saves ];
      saves.splice(index, 1);
      this.$store.commit('saveEditingFeature', false);
      this.$store.commit('saveEditingSave', false);
      this.$store.commit('saveWorkspaces', saves);
    },
    copyWorkspace: function (index) {
      const newIndex = this.$store.state.saves.length;
      const duplicatedWorkspace = { ...this.$store.state.saves[index] };
      duplicatedWorkspace.name = `${duplicatedWorkspace.name} copy`;
      const saves = [ 
        ...this.$store.state.saves, 
        duplicatedWorkspace
      ];
      this.$store.commit('saveWorkspaces', saves);
      this.$store.commit('saveEditingSave', newIndex);
    },
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
