<template>
  <div id="controls" class="w-4/12 overflow-y-auto">

    <Panel title="Space Dimensions">

      <div class="flex">
        <div class="w-1/2 mr-6">
          <InchInput label="Width" placeholder="20" labelClass="text-gray-700 text-sm" :value="$store.state.workspaceWidth" @input="(width) => {$store.state.workspaceWidth = width}" />
        </div>
        <div class="w-1/2">
          <InchInput label="Height" placeholder="40" labelClass="text-gray-700 text-sm" :value="$store.state.workspaceHeight" @input="(height) => {$store.state.workspaceHeight = height}" />
        </div>
      </div>
      
    </Panel>

    <Panel title="Features">
      <SimpleInput label="Feature Name" placeholder="Main Circuit Breaker" :value="$store.state.tmpFeature.name" @input="(name) => {$store.state.tmpFeature.name = name}" />
      <div class="w-full">
        <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
          Size
        </label>
      </div>
      <div class="flex mb-4">
        <div class="w-1/2 mr-6">
          <InchInput label="Width" placeholder="55" labelClass="text-gray-500 text-xs" :value="$store.state.tmpFeature.size.width" @input="(width) => {$store.state.tmpFeature.size.width = width}" />
        </div>
        <div class="w-1/2">
          <InchInput label="Height" placeholder="22" labelClass="text-gray-500 text-xs" :value="$store.state.tmpFeature.size.height" @input="(height) => {$store.state.tmpFeature.size.height = height}" />
        </div>
      </div>
      <div class="w-full">
        <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
          Position
        </label>
      </div>
      <div class="flex mb-4">
        <div class="w-1/2 mr-6">
          <InchInput label="Left" placeholder="0" labelClass="text-gray-500 text-xs" :value="$store.state.tmpFeature.position.left" @input="(left) => {$store.state.tmpFeature.position.left = left}" />
        </div>
        <div class="w-1/2">
          <InchInput label="Top" placeholder="0" labelClass="text-gray-500 text-xs" :value="$store.state.tmpFeature.position.top" @input="(top) => {$store.state.tmpFeature.position.top = top}" />
        </div>
      </div>
      <div class="w-full">
        <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
          Color
        </label>
      </div>
      <div class="flex mb-4">
        <div class="w-1/2 mr-6">
          <ColorSelect label="Background" :value="$store.state.tmpFeature.color.background" @input="(background) => {$store.state.tmpFeature.color.background = background}" />
        </div>
        <div class="w-1/2">
          <ColorSelect label="Border" :value="$store.state.tmpFeature.color.border" @input="(border) => {$store.state.tmpFeature.color.border = border}" />
        </div>
      </div>
      <div class="flex justify-between">
        <div class="">
          <button v-on:click="deleteFeature" v-if="updatingFeature" class="bg-white bg-red-400 hover:bg-red-600 text-white border border-red-400 hover:border-transparent mr-4 text-sm font-medium py-2 px-4 rounded">Delete</button>
        </div>
        <div class="">
          <button v-on:click="cancelFeature" class="bg-white hover:bg-red-500 text-gray-600 border border-blue-500 hover:border-transparent hover:text-white mr-4 text-sm font-medium py-2 px-4 rounded">Cancel</button>
          <button v-on:click="addFeature" v-if="!updatingFeature" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">Add Feature</button>
          <button v-on:click="updateFeature" v-if="updatingFeature" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">Update Feature</button>
        </div>
      </div>
      
    </Panel>

    <Panel title="Save">

      <div v-if="$store.state.saves.length" class="mb-6">
        <p class="block tracking-wide text-gray-700 text-sm font-medium mb-2" for="grid-last-name">
          Saved Workspaces
        </p>
        <ul class="">
          <li v-for="(save, index) in $store.state.saves" :key="save.name" class="flex mb-4">
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
      <input v-model="$store.state.tmpSave.name" placeholder="Electrical Layout" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm mb-4">
      <div class="flex justify-end">
        <button v-on:click="addSave" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">Save Workspace</button>
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
  methods: {
    addFeature: function () {
      this.$cookies.set('features', JSON.stringify([ ...this.$store.state.features, this.$store.state.tmpFeature ]));
      this.$store.state.features = [ ...this.$store.state.features, this.$store.state.tmpFeature ];
      this.cancelFeature();
    },
    editFeature: function (index) {
      this.updatingFeature = true;
      this.$store.state.tmpFeature = this.$store.state.features[index];
    },
    updateFeature: function () {
      this.$cookies.set('features', JSON.stringify([ ...this.$store.state.features ]));
      this.cancelFeature();
    },
    cancelFeature: function () {
      this.updatingFeature = false;
      this.$store.state.tmpFeature = {
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
    },
    deleteFeature: function () {
      let index = this.$store.state.features.indexOf(this.$store.state.tmpFeature);
      this.$store.state.features.splice(index, 1);
      this.$cookies.set('features', JSON.stringify([ ...this.$store.state.features ]));
      this.cancelFeature();
    },
    addSave: function () {
      this.$store.state.saves = [ ...this.$store.state.saves, {
        name: this.$store.state.tmpSave.name,
        workspaceWidth: this.$store.state.workspaceWidth,
        workspaceHeight: this.$store.state.workspaceHeight,
        workspaceScale: this.$store.state.workspaceScale,
        features: this.$store.state.features,
      } ];
      this.$cookies.set('saves', JSON.stringify([ ...this.saves ]));
    },
    loadSave: function (index) {
      this.$store.state.tmpSave.name = this.$store.state.saves[index].name;
      this.$store.state.workspaceWidth = this.$store.state.saves[index].workspaceWidth;
      this.$store.state.workspaceHeight = this.$store.state.saves[index].workspaceHeight;
      this.$store.state.workspaceScale = this.$store.state.saves[index].workspaceScale;
      this.$store.state.features = this.$store.state.saves[index].features;
    },
    deleteSave: function (index) {
      this.$store.state.saves.splice(index, 1);
      this.$cookies.set('saves', JSON.stringify([ ...this.$store.state.saves ]));
    }
  },
  data() {
    return {
      updatingFeature: false,
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
      tmpSave: {
        name: ''
      }
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
