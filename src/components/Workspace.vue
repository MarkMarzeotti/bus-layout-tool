<template>
  <div id="area" class="w-8/12 h-full overflow-hidden relative" :style="areaZoom">
    <div v-if="$store.state.editingSave !== false" class="z-50 absolute top-0 right-0 mt-4 mr-4 border border-gray-300 rounded items-stretch flex">
      <button v-on:click="zoomOut" class="bg-gray-200 text-gray-600 p-2 border-r-1 border-gray-300">
        <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM5 7h6v2H5V7z"/></svg>
      </button>
      <span class="bg-white text-sm text-gray-600 px-3 w-20 flex justify-center items-center">{{ $store.state.saves[$store.state.editingSave].workspace.scale * 10 }}%</span>
      <button v-on:click="zoomIn" class="bg-gray-200 text-gray-600 p-2 border-l-1 border-gray-300">
        <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM7 7V5h2v2h2v2H9v2H7V9H5V7h2z"/></svg>
      </button>
    </div>
    <div v-if="$store.state.editingSave !== false" class="z-50 absolute top-0 left-0 mt-4 ml-4">
      <button v-on:click="clearWorkspace" class="bg-gray-200 text-gray-600 hover:bg-gray-400 py-2 px-4 rounded text-sm font-medium">
        Clear Workspace
      </button>
    </div>
    <div class="overflow-scroll w-full h-full">
      <div v-if="$store.state.editingSave !== false" id="workspace-container" class="relative box-content" :style="workspaceContainerStyle">
        <div id="workspace" class="bg-gray-100 border-4 border-gray-400 box-content" :style="workspaceStyle">
          <Moveable v-for="(feature, index) in $store.state.saves[$store.state.editingSave].features" :key="index" class="flex justify-center items-center text-center absolute cursor-pointer p-2 box-border" :style="featureStyles(index)" v-bind="moveable" @drag="handleDrag">
            <p :data-index="index" v-on:click="$parent.$refs.controls.editFeature(index)" class="text-xs absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">{{ feature.name }}</p>
          </Moveable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moveable from 'vue-moveable';

export default {
  name: 'Workspace',
  components: {
    Moveable,
  },
  methods: {
    zoomOut: function () {
      if (this.$store.state.editingSave !== false) {
        this.saves[this.editingSave].workspace.scale = this.$store.state.saves[this.$store.state.editingSave].workspace.scale - 1;
        this.$store.commit('saveWorkspaces', this.saves);
      }
    },
    zoomIn: function () {
      if (this.$store.state.editingSave !== false) {
        this.saves[this.editingSave].workspace.scale = this.$store.state.saves[this.$store.state.editingSave].workspace.scale + 1;
        this.$store.commit('saveWorkspaces', this.saves);
      }
    },
    clearWorkspace: function () {
      if (this.$store.state.editingSave !== false) {
        this.saves[this.editingSave].features = [];
        this.$store.commit('saveWorkspaces', this.saves);
      }
    },
    handleDrag: function ({target, top, left}) {
      if (this.$store.state.editingSave !== false) {
        const index = target.childNodes[0].dataset.index;
        left = left / 10;
        left = left < 0 ? 0 : left;
        left = left > this.$store.state.saves[this.$store.state.editingSave].workspace.width - this.$store.state.saves[this.$store.state.editingSave].features[index].size.width ? this.$store.state.saves[this.$store.state.editingSave].workspace.width - this.$store.state.saves[this.$store.state.editingSave].features[index].size.width : left;
        top = top / 10;
        top = top < 0 ? 0 : top;
        top = top > this.$store.state.saves[this.$store.state.editingSave].workspace.height - this.$store.state.saves[this.$store.state.editingSave].features[index].size.height ? this.$store.state.saves[this.$store.state.editingSave].workspace.height - this.$store.state.saves[this.$store.state.editingSave].features[index].size.height : top;
        this.saves[this.editingSave].features[index].position.left = left;
        this.saves[this.editingSave].features[index].position.top = top;
        this.$store.commit('saveWorkspaces', this.saves);
      }
    },
    featureStyles: function (index) {
      if (this.$store.state.editingSave !== false) {
        return {
          backgroundColor: `${this.$store.state.saves[this.$store.state.editingSave].features[index].color.background}`,
          border: `1px solid ${this.$store.state.saves[this.$store.state.editingSave].features[index].color.border}`,
          top: `${this.$store.state.saves[this.$store.state.editingSave].features[index].position.top}em`,
          height: `${this.$store.state.saves[this.$store.state.editingSave].features[index].size.height}em`,
          left: `${this.$store.state.saves[this.$store.state.editingSave].features[index].position.left}em`,
          width: `${this.$store.state.saves[this.$store.state.editingSave].features[index].size.width}em`
        }
      } else {
        return {};
      }
    },
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
      saves: this.$store.state.saves,
      editingSave: this.$store.state.editingSave,
      editingFeature: this.$store.state.editingFeature
    }
  },
  computed: {
    workspaceStyle() {
      if (this.$store.state.editingSave !== false) {
        return {
          height: `${this.$store.state.saves[this.$store.state.editingSave].workspace.height}em`,
          width: `${this.$store.state.saves[this.$store.state.editingSave].workspace.width}em`,
          fontSize: `${this.$store.state.saves[this.$store.state.editingSave].workspace.scale}px`,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          margin: 'auto'
        }
      } else {
        return {};
      }
    },
    workspaceContainerStyle() {
      if (this.$store.state.editingSave !== false) {
        return {
          height: `${parseInt(this.$store.state.saves[this.$store.state.editingSave].workspace.height) + 10}em`,
          width: `${parseInt(this.$store.state.saves[this.$store.state.editingSave].workspace.width) + 10}em`
        }
      } else {
        return {};
      }
    },
    areaZoom() {
      if (this.$store.state.editingSave !== false) {
        return {
          fontSize: `${this.$store.state.saves[this.$store.state.editingSave].workspace.scale}px`
        }
      } else {
        return {};
      }
    }
  }
}
</script>

<style>
.moveable-line {
  background: transparent !important;
}
</style>
