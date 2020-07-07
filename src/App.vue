<template>
  <div id="app" class="flex items-stretch h-screen">
    <div id="area" class="w-8/12 h-full flex items-center justify-center overflow-scroll relative">
      <div class="z-50 absolute top-0 right-0 mt-4 mr-4 border border-gray-300 rounded items-stretch flex">
        <button v-on:click="areaScale = areaScale - .25" class="bg-gray-200 text-gray-600 p-2 border-r-1 border-gray-300">
          <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM5 7h6v2H5V7z"/></svg>
        </button>
        <span class="bg-white text-sm text-gray-600 px-3 flex items-center">{{ areaScale * 100 }}%</span>
        <button v-on:click="areaScale = areaScale + .25" class="bg-gray-200 text-gray-600 p-2 border-l-1 border-gray-300">
          <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM7 7V5h2v2h2v2H9v2H7V9H5V7h2z"/></svg>
        </button>
      </div>
      <div id="workspace" class="bg-gray-100 border-4 border-gray-400 relative" :style="[workspace, areaScaleStyle]">
        <div v-for="(feature, index) in features" :key="index" :id="sanitizeText(feature.name)" v-on:click="editFeature(index)" class="flex justify-center items-center text-center absolute cursor-pointer" :style="featureStyles(index)">{{ feature.name }}</div>

        <svg id="connections" v-if="showConnections" class="absolute top-0 right-0 bottom-0 left-0 w-full h-full">
          <defs>
            <marker id="positive" orient="auto" markerWidth="60" markerHeight="80" refX="20" refY="6">
              <path d="M0,0 V12 L10,6 Z" fill="red" />
            </marker>
            <marker id="negative" orient="auto" markerWidth="60" markerHeight="80" refX="20" refY="6">
              <path d="M0,0 V12 L10,6 Z" fill="black" />
            </marker>
          </defs>
          <line v-for="(connection, index) in connections" :key="index" :id="sanitizeText(connection.name)" :x1="x1(index)" :y1="y1(index)" :x2="x2(index)" :y2="y2(index)" marker-end="url(#negative)" class="stroke-2 stroke-black" />
        </svg>
      </div>
    </div>

    <div id="controls" class="w-4/12 overflow-y-auto">

      <div class="bg-gray-100 border-b-2 border-l-2 border-gray-300">
        <header class="bg-gray-200 px-6 border-b-1 border-gray-300 flex justify-between">
          <h2 class="uppercase tracking-wide text-gray-700 text-sm font-bold mb-0 py-3">Space Dimensions</h2>
          <button v-on:click="addingDimensions = !addingDimensions" class="flex items-center px-2 py-3 text-gray-500">
            <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path v-if="!addingDimensions" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/><path v-if="addingDimensions" d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"/></svg>
          </button>
        </header>

        <div v-if="addingDimensions" class="flex p-6">
          <div class="w-1/2 mr-6">
            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Width
            </label>
            <span class="flex">
              <input v-model="areaWidth" placeholder="55" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
              <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
                inches
              </span>
            </span>
          </div>
          <div class="w-1/2">
            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Height
            </label>
            <span class="flex">
              <input v-model="areaHeight" placeholder="25" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
              <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
                inches
              </span>
            </span>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 border-b-2 border-l-2 border-gray-300">
        <header class="bg-gray-200 px-6 border-b-1 border-gray-300 flex justify-between">
          <h2 class="uppercase tracking-wide text-gray-700 text-sm font-bold mb-0 py-3">Features</h2>
          <button v-on:click="addingFeature = !addingFeature" v-if="!updatingFeature" class="flex items-center px-2 py-3 text-gray-500">
            <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path v-if="!addingFeature" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/><path v-if="addingFeature" d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"/></svg>
          </button>
        </header>

        <div v-if="addingFeature || updatingFeature" class="p-6">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-last-name">
            Feature Name
          </label>
          <input v-model="tmpFeature.name" placeholder="Main Circuit Breaker" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm mb-4">
          <div class="w-full">
            <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">
              Size
            </label>
          </div>
          <div class="flex mb-4">
            <div class="w-1/2 mr-6">
              <label class="block tracking-wide text-gray-500 text-xs font-bold mb-2" for="feature-width">
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
              <label class="block tracking-wide text-gray-500 text-xs font-bold mb-2" for="feature-height">
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
            <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">
              Position
            </label>
          </div>
          <div class="flex mb-4">
            <div class="w-1/2 mr-6">
              <label class="block tracking-wide text-gray-500 text-xs font-bold mb-2" for="feature-position-left">
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
              <label class="block tracking-wide text-gray-500 text-xs font-bold mb-2" for="feature-position-right">
                Bottom
              </label>
              <span class="flex">
                <input v-model="tmpFeature.position.bottom" placeholder="0" name="feature-position-right" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
                  inches
                </span>
              </span>
            </div>
          </div>
          <div class="w-full">
            <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">
              Color
            </label>
          </div>
          <div class="flex mb-4">
            <div class="w-1/2 mr-6">
              <label class="block tracking-wide text-gray-500 text-xs font-bold mb-2" for="feature-color-background">
                Background
              </label>
              <span class="relative flex">
                <div class="w-circle h-circle mr-4 my-auto border rounded-full" :style="backgroundSelect"></div>
                <select v-model="tmpFeature.color.background" name="feature-color-background" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                  <option value="#ffffff">White</option>
                  <option value="#a8a8a8">Silver Chalice</option>
                  <option value="#545454">Emperor</option>
                  <option value="#000000">Black</option>
                  <option value="#017f7e">Teal</option>
                  <option value="#01ffff">Cyan / Aqua</option>
                  <option value="#401f00">Morocco Brown</option>
                  <option value="#804000">Cinnamon</option>
                  <option value="#00497e">Congress Blue</option>
                  <option value="#0094fe">Azure Radiance</option>
                  <option value="#800001">Maroon</option>
                  <option value="#fe0000">Red</option>
                  <option value="#001280">Navy Blue</option>
                  <option value="#0026ff">Blue</option>
                  <option value="#803400">Red Beech</option>
                  <option value="#fe6a00">Blaze Orange</option>
                  <option value="#590080">Pigment Indigo</option>
                  <option value="#b100fe">Electric Violet</option>
                  <option value="#806b00">Olive</option>
                  <option value="#ffd800">School bus Yellow</option>
                  <option value="#7f0037">Siren</option>
                  <option value="#ff006e">Rose</option>
                  <option value="#017f01">Japanese Laurel</option>
                  <option value="#00ff01">Green</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </span>
            </div>
            <div class="w-1/2">
              <label class="block tracking-wide text-gray-500 text-xs font-bold mb-2" for="feature-color-border">
                Border
              </label>
              <span class="relative flex">
                <div class="w-circle h-circle mr-4 my-auto border rounded-full" :style="borderSelect"></div>
                <select v-model="tmpFeature.color.border" name="feature-color-border" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                  <option value="#ffffff">White</option>
                  <option value="#a8a8a8">Silver Chalice</option>
                  <option value="#545454">Emperor</option>
                  <option value="#000000">Black</option>
                  <option value="#017f7e">Teal</option>
                  <option value="#01ffff">Cyan / Aqua</option>
                  <option value="#401f00">Morocco Brown</option>
                  <option value="#804000">Cinnamon</option>
                  <option value="#00497e">Congress Blue</option>
                  <option value="#0094fe">Azure Radiance</option>
                  <option value="#800001">Maroon</option>
                  <option value="#fe0000">Red</option>
                  <option value="#001280">Navy Blue</option>
                  <option value="#0026ff">Blue</option>
                  <option value="#803400">Red Beech</option>
                  <option value="#fe6a00">Blaze Orange</option>
                  <option value="#590080">Pigment Indigo</option>
                  <option value="#b100fe">Electric Violet</option>
                  <option value="#806b00">Olive</option>
                  <option value="#ffd800">School bus Yellow</option>
                  <option value="#7f0037">Siren</option>
                  <option value="#ff006e">Rose</option>
                  <option value="#017f01">Japanese Laurel</option>
                  <option value="#00ff01">Green</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </span>
            </div>
          </div>
          <div class="flex justify-end">
            <button v-on:click="cancelFeature" class="bg-white hover:bg-red-500 text-gray-600 border border-blue-500 hover:border-transparent hover:text-white mr-4 text-sm font-bold py-2 px-4 rounded">Cancel</button>
            <button v-on:click="addFeature" v-if="addingFeature && !updatingFeature" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">Add Feature</button>
            <button v-on:click="updateFeature" v-if="updatingFeature" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">Update Feature</button>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 border-b-2 border-l-2 border-gray-300">
        <header class="bg-gray-200 px-6 border-b-1 border-gray-300 flex justify-between">
          <h2 class="uppercase tracking-wide text-gray-700 text-sm font-bold mb-0 py-3">Connections</h2>
          <button v-on:click="addingConnection = !addingConnection" class="flex items-center px-2 py-3 text-gray-500">
            <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path v-if="!addingConnection" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/><path v-if="addingConnection" d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"/></svg>
          </button>
        </header>

        <div v-if="addingConnection" class="p-6">
          <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-last-name">
            Connection Name
          </label>
          <input v-model="tmpConnection.name" placeholder="Wire" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm mb-4">
          <div class="w-full">
            <label class="block tracking-wide text-gray-700 text-sm font-bold mb-2">
              Details
            </label>
          </div>
          <div class="flex mb-4">
            <div class="w-1/2 mr-6">
              <label class="block tracking-wide text-gray-500 text-xs font-bold mb-2" for="connection-from">
                From
              </label>
              <span class="relative flex">
                <select v-model="tmpConnection.from" name="connection-from" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                  <option disabled>Select a feature</option>
                  <option v-for="(feature, index) in features" :key="index" :value="sanitizeText(feature.name)">{{ feature.name }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </span>
            </div>
            <div class="w-1/2">
              <label class="block tracking-wide text-gray-500 text-xs font-bold mb-2" for="connection-to">
                To
              </label>
              <span class="relative flex">
                <select v-model="tmpConnection.to" name="connection-to" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                  <option disabled>Select a feature</option>
                  <option v-for="(feature, index) in features" :key="index" :value="sanitizeText(feature.name)">{{ feature.name }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </span>
            </div>
          </div>
          <div class="flex justify-end">
            <button v-on:click="cancelConnection" class="bg-white hover:bg-red-500 text-gray-600 border border-blue-500 hover:border-transparent hover:text-white mr-4 text-sm font-bold py-2 px-4 rounded">Cancel</button>
            <button v-on:click="addConnection" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">Add Connection</button>
          </div>
        </div>
      </div>

      <button v-on:click="showConnections = !showConnections" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">Toggle Connections</button>

    </div>

  </div>
</template>

<script>
// import Area from './components/Area.vue'
// import Controls from './components/Controls.vue'

export default {
  name: 'App',
  components: {
    // Area,
    // Controls
  },
  methods: {
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
      this.addingFeature = false;
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
          bottom: null
        },
        color: {
          background: '#ffffff',
          border: '#000000'
        }
      };
    },
    addConnection: function () {
      this.$cookies.set('connections', JSON.stringify([ ...this.connections, this.tmpConnection ]));
      this.connections = [ ...this.connections, this.tmpConnection ];
      this.cancelConnection();
    },
    editConnection: function () {

    },
    updateConnection: function () {

    },
    cancelConnection: function () {
      this.addingConnection = false;
      this.tmpConnection = {
        name: '',
        from: '',
        to: ''
      };
    },
    x1: function (index) {
      const div1 = document.getElementById(this.connections[index].from);

      return div1.offsetLeft + ( div1.offsetWidth / 2 );
    },
    y1: function (index) {
      const div1 = document.getElementById(this.connections[index].from);

      return div1.offsetTop + ( div1.offsetHeight / 2 );
    },
    x2: function (index) {
      const div2 = document.getElementById(this.connections[index].to);

      return div2.offsetLeft + ( div2.offsetWidth / 2 );
    },
    y2: function (index) {
      const div2 = document.getElementById(this.connections[index].to);

      return div2.offsetTop + ( div2.offsetHeight / 2 );
    },
    featureStyles: function (index) {
      return {
        backgroundColor: `${this.features[index].color.background}`,
        border: `1px solid ${this.features[index].color.border}`,
        bottom: `${this.features[index].position.bottom}rem`,
        height: `${this.features[index].size.height}rem`,
        left: `${this.features[index].position.left}rem`,
        width: `${this.features[index].size.width}rem`
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
      addingDimensions: true,
      areaWidth: 50,
      areaHeight: 20,
      areaScale: 1,
      addingFeature: false,
      updatingFeature: false,
      tmpFeature: {
        name: '',
        size: {
          height: null,
          width: null
        },
        position: {
          left: null,
          bottom: null
        },
        color: {
          background: '#ffffff',
          border: '#000000'
        }
      },
      showConnections: false,
      addingConnection: false,
      updatingConnection: false,
      tmpConnection: {
        name: '',
        from: '',
        to: ''
      },
      features: this.$cookies.get('features') ? JSON.parse(this.$cookies.get('features')) : [],
      connections: this.$cookies.get('connections') ? JSON.parse(this.$cookies.get('connections')) : [],
    }
  },
  computed: {
    workspace() {
      return {
        height: `${this.areaHeight}rem`,
        width: `${this.areaWidth}rem`
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
    areaScaleStyle() {
      return {
        transform: `scale(${this.areaScale})`
      }
    }
  }
}
</script>

<style>
body {
  font-size: 10px;
}
</style>
