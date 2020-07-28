<template>
  <div id="controls" class="w-4/12 overflow-y-auto bg-gray-100 border-l-1 flex flex-wrap content-between">

    <div class="w-full">
      <Panel title="Workspace">
        <div v-if="$store.state.editingSave !== false">
          <SimpleInput v-model="workspaceName" label="Layout Name" placeholder="Floor plan" />
          <div class="w-full">
            <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
              Size
            </label>
          </div>
          <div class="flex mb-4">
            <div class="w-1/2 mr-6">
              <InchInput v-model="workspaceWidth" label="Width" placeholder="20" labelClass="text-gray-500 text-xs" />
            </div>
            <div class="w-1/2">
              <InchInput v-model="workspaceHeight" label="Height" placeholder="40" labelClass="text-gray-500 text-xs" />
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
          <button v-on:click="saveWorkspace" v-if="$store.state.editingSave !== false" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Close Workspace</button>
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

          <ul v-if="$store.state.saves.length && $store.state.editingSave !== false && $store.state.saves[$store.state.editingSave].features.length" class="my-6">
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
          <button v-on:click="saveFeature" v-if="$store.state.editingFeature !== false" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Close Feature</button>
          <button v-on:click="addFeature" v-if="$store.state.editingFeature === false && $store.state.editingSave !== false" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300">Add Feature</button>
        </div>
        
      </Panel>
    </div>

    <div class="p-6 text-center self-end w-full">
      <p class="text-gray-600 text-sm">An experiment with Vue and Tailwind by <a href="https://markmarzeotti.com" class="underline" target="_blank">Mark Marzeotti</a></p>
    </div>

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
    workspaceName: {
      get() {
        return this.$store.state.saves[this.$store.state.editingSave].name;
      },
      set(value) {
        this.$store.commit('updateWorkspaceName', value);
      },
    },
    workspaceWidth: {
      get() {
        return this.$store.state.saves[this.$store.state.editingSave].workspace.width;
      },
      set(value) {
        this.$store.commit('updateWorkspaceWidth', value);
      },
    },
    workspaceHeight: {
      get() {
        return this.$store.state.saves[this.$store.state.editingSave].workspace.height;
      },
      set(value) {
        this.$store.commit('updateWorkspaceHeight', value);
      },
    },
  },
  methods: {
    addFeature: function () {
      this.$store.commit('addFeature');
    },
    saveFeature: function () {
      this.$store.commit('saveEditingFeature', false);
    },
    editFeature: function (index) {
      this.$store.commit('saveEditingFeature', index);
    },
    deleteFeature: function (index) {
      const deleteIndex = index !== false ? index : this.$store.state.editingFeature;
      this.$store.commit('deleteFeature', deleteIndex);
      this.$store.commit('saveEditingFeature', false);
    },
    copyFeature: function (index) {
      const newIndex = this.$store.state.saves[this.$store.state.editingSave].features.length;
      this.$store.commit('copyFeature', index);
      this.$store.commit('saveEditingFeature', newIndex);
    },
    addWorkspace: function () {
      this.$store.commit('addWorkspace');
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
      const deleteIndex = index !== false ? index : this.$store.state.editingSave;
      this.$store.commit('deleteWorkspace', deleteIndex);
      this.$store.commit('saveEditingFeature', false);
      this.$store.commit('saveEditingSave', false);
    },
    copyWorkspace: function (index) {
      const newIndex = this.$store.state.saves.length;
      this.$store.commit('copyWorkspace', index);
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
