<template>
  <div id="controls" class="w-4/12 overflow-y-auto">

    <Panel title="Space Dimensions">

      <div class="flex">
        <div class="w-1/2 mr-6">
          <label class="block tracking-wide text-gray-700 text-xs font-medium mb-2" for="workspaceWidth">
            Width
          </label>
          <span class="flex">
            <input v-model="$store.state.workspaceWidth" id="workspaceWidth" name="workspaceWidth" placeholder="55" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
            <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
              inches
            </span>
          </span>
        </div>
        <div class="w-1/2">
          <label class="block tracking-wide text-gray-700 text-xs font-medium mb-2" for="workspaceHeight">
            Height
          </label>
          <span class="flex">
            <input v-model="$store.state.workspaceHeight" id="workspaceHeight" name="workspaceHeight" placeholder="25" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
            <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
              inches
            </span>
          </span>
        </div>
      </div>
      
    </Panel>

    <Panel title="Features">

      <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2" for="grid-last-name">
        Feature Name
      </label>
      <input v-model="$store.state.tmpFeature.name" placeholder="Main Circuit Breaker" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm mb-4">
      <div class="w-full">
        <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
          Size
        </label>
      </div>
      <div class="flex mb-4">
        <div class="w-1/2 mr-6">
          <label class="block tracking-wide text-gray-500 text-xs font-medium mb-2" for="feature-width">
            Width
          </label>
          <span class="flex">
            <input v-model="$store.state.tmpFeature.size.width" placeholder="55" name="feature-width" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
            <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
              inches
            </span>
          </span>
        </div>
        <div class="w-1/2">
          <label class="block tracking-wide text-gray-500 text-xs font-medium mb-2" for="feature-height">
            Height
          </label>
          <span class="flex">
            <input v-model="$store.state.tmpFeature.size.height" placeholder="25" name="feature-height" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
            <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
              inches
            </span>
          </span>
        </div>
      </div>
      <div class="w-full">
        <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
          Position
        </label>
      </div>
      <div class="flex mb-4">
        <div class="w-1/2 mr-6">
          <label class="block tracking-wide text-gray-500 text-xs font-medium mb-2" for="feature-position-left">
            Left
          </label>
          <span class="flex">
            <input v-model="$store.state.tmpFeature.position.left" placeholder="0" name="feature-position-left" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
            <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
              inches
            </span>
          </span>
        </div>
        <div class="w-1/2">
          <label class="block tracking-wide text-gray-500 text-xs font-medium mb-2" for="feature-position-right">
            Top
          </label>
          <span class="flex">
            <input v-model="$store.state.tmpFeature.position.top" placeholder="0" name="feature-position-right" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
            <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
              inches
            </span>
          </span>
        </div>
      </div>
      <div class="w-full">
        <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2">
          Color
        </label>
      </div>
      <div class="flex mb-4">
        <div class="w-1/2 mr-6">
          <label class="block tracking-wide text-gray-500 text-xs font-medium mb-2" for="feature-color-background">
            Background
          </label>
          <span class="relative flex">
            <div class="w-circle h-circle mr-4 my-auto border rounded-full" :style="backgroundSelect"></div>
            <select v-model="$store.state.tmpFeature.color.background" name="feature-color-background" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
              <option v-for="(color, index) in colors" :value="color.hex" :key="index">{{ color.name }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </span>
        </div>
        <div class="w-1/2">
          <label class="block tracking-wide text-gray-500 text-xs font-medium mb-2" for="feature-color-border">
            Border
          </label>
          <span class="relative flex">
            <div class="w-circle h-circle mr-4 my-auto border rounded-full" :style="borderSelect"></div>
            <select v-model="$store.state.tmpFeature.color.border" name="feature-color-border" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
              <option v-for="(color, index) in colors" :value="color.hex" :key="index">{{ color.name }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </span>
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

export default {
  name: 'Controls',
  components: {
    Panel
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
      },
      colors: [
        {
          hex: '#ffffff',
          name: 'White'
        },
        {
          hex: '#a8a8a8',
          name: 'Silver Chalice'
        },
        {
          hex: '#545454',
          name: 'Emperor'
        },
        {
          hex: '#000000',
          name: 'Black'
        },
        {
          hex: '#017f7e',
          name: 'Teal'
        },
        {
          hex: '#01ffff',
          name: 'Cyan / Aqua'
        },
        {
          hex: '#401f00',
          name: 'Morocco Brown'
        },
        {
          hex: '#804000',
          name: 'Cinnamon'
        },
        {
          hex: '#00497e',
          name: 'Congress Blue'
        },
        {
          hex: '#0094fe',
          name: 'Azure Radiance'
        },
        {
          hex: '#800001',
          name: 'Maroon'
        },
        {
          hex: '#fe0000',
          name: 'Red'
        },
        {
          hex: '#001280',
          name: 'Navy Blue'
        },
        {
          hex: '#0026ff',
          name: 'Blue'
        },
        {
          hex: '#803400',
          name: 'Red Beech'
        },
        {
          hex: '#fe6a00',
          name: 'Blaze Orange'
        },
        {
          hex: '#590080',
          name: 'Pigment Indigo'
        },
        {
          hex: '#b100fe',
          name: 'Electric Violet'
        },
        {
          hex: '#806b00',
          name: 'Olive'
        },
        {
          hex: '#ffd800',
          name: 'School bus Yellow'
        },
        {
          hex: '#7f0037',
          name: 'Siren'
        },
        {
          hex: '#ff006e',
          name: 'Rose'
        },
        {
          hex: '#017f01',
          name: 'Japanese Laurel'
        },
        {
          hex: '#00ff01',
          name: 'Green'
        }
      ],
    }
  },
  computed: {
    backgroundSelect() {
      return {
        backgroundColor: `${this.$store.state.tmpFeature.color.background}`
      }
    },
    borderSelect() {
      return {
        backgroundColor: `${this.$store.state.tmpFeature.color.border}`
      }
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
