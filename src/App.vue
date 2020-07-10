<template>
  <div id="app" class="flex items-stretch h-screen">
    <div id="area" class="w-8/12 h-full flex items-center justify-center overflow-scroll relative">
      <div class="z-50 absolute top-0 right-0 mt-4 mr-4 border border-gray-300 rounded items-stretch flex">
        <button v-on:click="workspaceScale = workspaceScale - .125" class="bg-gray-200 text-gray-600 p-2 border-r-1 border-gray-300">
          <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM5 7h6v2H5V7z"/></svg>
        </button>
        <span class="bg-white text-sm text-gray-600 px-3 flex items-center">{{ workspaceScale * 100 }}%</span>
        <button v-on:click="workspaceScale = workspaceScale + .125" class="bg-gray-200 text-gray-600 p-2 border-l-1 border-gray-300">
          <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM7 7V5h2v2h2v2H9v2H7V9H5V7h2z"/></svg>
        </button>
      </div>
      <div class="z-50 absolute top-0 left-0 mt-4 ml-4">
        <button v-on:click="clearWorkspace" class="bg-gray-200 text-gray-600 hover:bg-gray-400 py-2 px-4 rounded text-sm font-medium">
          Clear Workspace
        </button>
      </div>
      <div id="workspace" class="bg-gray-100 border-4 border-gray-400 relative" :style="[workspaceSize, areaScale]">
        <Moveable
          v-for="(feature, index) in features" :key="index" :id="`${sanitizeText(feature.name)}-${index}`" v-on:click="editFeature(index)" class="flex justify-center items-center text-center absolute cursor-pointer p-2" :style="featureStyles(index)"
          v-bind="moveable"
          @drag="handleDrag"
        >
          <p class="text-xs">{{ feature.name }}</p>
        </Moveable>
        <!-- <div v-for="(feature, index) in features" :key="index" :id="`${sanitizeText(feature.name)}-${index}`" v-on:click="editFeature(index)" class="flex justify-center items-center text-center absolute cursor-pointer p-2" :style="featureStyles(index)">
          <p class="text-xs">{{ feature.name }}</p>
        </div> -->
      </div>
    </div>

    <div id="controls" class="w-4/12 overflow-y-auto">

      <div class="bg-gray-100 border-b-2 border-l-2 border-gray-300">
        <header class="bg-gray-200 px-6 border-b-1 border-gray-300 flex justify-between">
          <h2 class="uppercase tracking-wide text-gray-700 text-sm font-medium mb-0 py-3">Space Dimensions</h2>
          <button v-on:click="addingDimensions = !addingDimensions" class="flex items-center px-2 py-3 text-gray-500">
            <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path v-if="!addingDimensions" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/><path v-if="addingDimensions" d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"/></svg>
          </button>
        </header>

        <div v-if="addingDimensions" class="flex p-6">
          <div class="w-1/2 mr-6">
            <label class="block tracking-wide text-gray-700 text-xs font-medium mb-2" for="grid-last-name">
              Width
            </label>
            <span class="flex">
              <input v-model="workspaceWidth" placeholder="55" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
              <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
                inches
              </span>
            </span>
          </div>
          <div class="w-1/2">
            <label class="block tracking-wide text-gray-700 text-xs font-medium mb-2" for="grid-last-name">
              Height
            </label>
            <span class="flex">
              <input v-model="workspaceHeight" placeholder="25" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
              <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
                inches
              </span>
            </span>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 border-b-2 border-l-2 border-gray-300">
        <header class="bg-gray-200 px-6 border-b-1 border-gray-300 flex justify-between">
          <h2 class="uppercase tracking-wide text-gray-700 text-sm font-medium mb-0 py-3">Features</h2>
          <button v-on:click="addingFeature = !addingFeature" v-if="!updatingFeature" class="flex items-center px-2 py-3 text-gray-500">
            <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path v-if="!addingFeature" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/><path v-if="addingFeature" d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"/></svg>
          </button>
        </header>

        <div v-if="addingFeature || updatingFeature" class="p-6">
          <label class="block tracking-wide text-gray-700 text-sm font-medium mb-2" for="grid-last-name">
            Feature Name
          </label>
          <input v-model="tmpFeature.name" placeholder="Main Circuit Breaker" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm mb-4">
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
                <input v-model="tmpFeature.size.width" placeholder="55" name="feature-width" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
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
                <input v-model="tmpFeature.size.height" placeholder="25" name="feature-height" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
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
                <input v-model="tmpFeature.position.left" placeholder="0" name="feature-position-left" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
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
                <input v-model="tmpFeature.position.top" placeholder="0" name="feature-position-right" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
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
                <select v-model="tmpFeature.color.background" name="feature-color-background" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
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
                <select v-model="tmpFeature.color.border" name="feature-color-border" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                  <option v-for="(color, index) in colors" :value="color.hex" :key="index">{{ color.name }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </span>
            </div>
          </div>
          <div class="flex justify-between mt-12">
            <div class="">
              <button v-on:click="deleteFeature" v-if="updatingFeature" class="bg-white bg-red-400 hover:bg-red-600 text-white border border-red-400 hover:border-transparent mr-4 text-sm font-medium py-2 px-4 rounded">Delete</button>
            </div>
            <div class="">
              <button v-on:click="cancelFeature" class="bg-white hover:bg-red-500 text-gray-600 border border-blue-500 hover:border-transparent hover:text-white mr-4 text-sm font-medium py-2 px-4 rounded">Cancel</button>
              <button v-on:click="addFeature" v-if="addingFeature && !updatingFeature" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">Add Feature</button>
              <button v-on:click="updateFeature" v-if="updatingFeature" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">Update Feature</button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 border-b-2 border-l-2 border-gray-300">
        <header class="bg-gray-200 px-6 border-b-1 border-gray-300 flex justify-between">
          <h2 class="uppercase tracking-wide text-gray-700 text-sm font-medium mb-0 py-3">Save</h2>
          <button v-on:click="addingSave = !addingSave" class="flex items-center px-2 py-3 text-gray-500">
            <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path v-if="!addingSave" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/><path v-if="addingSave" d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"/></svg>
          </button>
        </header>

        <div v-if="addingSave" class="p-6">
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
          <div class="flex justify-end mt-12">
            <button v-on:click="addSave" v-if="addingSave" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">Save Workspace</button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Moveable from 'vue-moveable';
// import Area from './components/Area.vue'
// import Controls from './components/Controls.vue'

export default {
  name: 'App',
  components: {
    Moveable,
    // Area,
    // Controls
  },
  watch: {
    workspaceWidth: function () {
      this.$cookies.set('workspaceWidth', JSON.stringify(this.workspaceWidth));
    },
    workspaceHeight: function () {
      this.$cookies.set('workspaceHeight', JSON.stringify(this.workspaceHeight));
    },
    workspaceScale: function () {
      this.$cookies.set('workspaceScale', JSON.stringify(this.workspaceScale));
    },
  },
  methods: {
    handleDrag: function ({ target, left, top }) {
      console.log('onDrag left, top', left, top);
      left = left / 10;
      top = top / 10;
      target.style.left = `${left}em`;
      target.style.top = `${top}em`;
    },
    addFeature: function () {
      this.$cookies.set('features', JSON.stringify([ ...this.features, this.tmpFeature ]));
      this.features = [ ...this.features, this.tmpFeature ];
      this.cancelFeature();
    },
    editFeature: function (index) {
      this.updatingFeature = true;
      this.tmpFeature = this.features[index];
    },
    updateFeature: function () {
      this.$cookies.set('features', JSON.stringify([ ...this.features ]));
      this.updatingFeature = false;
      this.cancelFeature();
    },
    cancelFeature: function () {
      this.addingFeature = true;
      this.updatingFeature = false;
      this.features = this.$cookies.get('features') ? JSON.parse(this.$cookies.get('features')) : [],
      this.tmpFeature = {
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
      let index = this.features.indexOf(this.tmpFeature);
      this.features.splice(index, 1);
      this.$cookies.set('features', JSON.stringify([ ...this.features ]));
      this.updatingFeature = false;
      this.cancelFeature();
    },
    addSave: function () {
      this.saves = [ ...this.saves, {
        name: this.tmpSave.name,
        workspaceWidth: this.workspaceWidth,
        workspaceHeight: this.workspaceHeight,
        workspaceScale: this.workspaceScale,
        features: this.features,
      } ];
      this.$cookies.set('saves', JSON.stringify([ ...this.saves ]));
    },
    loadSave: function (index) {
      this.tmpSave.name = this.saves[index].name;
      this.workspaceWidth = this.saves[index].workspaceWidth;
      this.workspaceHeight = this.saves[index].workspaceHeight;
      this.workspaceScale = this.saves[index].workspaceScale;
      this.features = this.saves[index].features;
    },
    deleteSave: function (index) {
      this.saves.splice(index, 1);
      this.$cookies.set('saves', JSON.stringify([ ...this.saves ]));
    },
    clearWorkspace: function () {
      this.features = [];
      this.tmpSave.name = '';
      this.$cookies.set('features', JSON.stringify([]));
    },
    featureStyles: function (index) {
      return {
        backgroundColor: `${this.features[index].color.background}`,
        border: `1px solid ${this.features[index].color.border}`,
        top: `${this.features[index].position.top}em`,
        height: `${this.features[index].size.height}em`,
        left: `${this.features[index].position.left}em`,
        width: `${this.features[index].size.width}em`
      }
    },
    sanitizeText: function (name) {
      name = name.toLowerCase();
      name = name.replace(/[\s]/g, '-');
      name = name.replace(/[^a-z0-9_-]/g, '');
      return name;
    }
  },
  data() {
    return {
      moveable: {
        draggable: true,
        throttleDrag: 0,
        resizable: false,
        keepRatio: true,
        scalable: false,
        rotatable: false,
      },
      addingDimensions: true,
      workspaceWidth: this.$cookies.get('workspaceWidth') ? JSON.parse(this.$cookies.get('workspaceWidth')) : 50,
      workspaceHeight: this.$cookies.get('workspaceHeight') ? JSON.parse(this.$cookies.get('workspaceHeight')) : 20,
      workspaceScale: this.$cookies.get('workspaceScale') ? JSON.parse(this.$cookies.get('workspaceScale')) : 1,
      addingFeature: true,
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
      features: this.$cookies.get('features') ? JSON.parse(this.$cookies.get('features')) : [],
      addingSave: false,
      tmpSave: {
        name: ''
      },
      saves: this.$cookies.get('saves') ? JSON.parse(this.$cookies.get('saves')) : [],
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
    workspaceSize() {
      return {
        height: `${this.workspaceHeight}em`,
        width: `${this.workspaceWidth}em`
      }
    },
    backgroundSelect() {
      return {
        backgroundColor: `${this.tmpFeature.color.background}`
      }
    },
    borderSelect() {
      return {
        backgroundColor: `${this.tmpFeature.color.border}`
      }
    },
    areaScale() {
      return {
        transform: `scale(${this.workspaceScale})`
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
