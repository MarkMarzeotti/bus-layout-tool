<template>
  <div id="area-container" class="w-8/12 h-full overflow-hidden relative" :style="areaZoom">
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
    <div id="area" class="overflow-scroll w-full h-full relative" :style="areaZoom">
      <div v-if="$store.state.editingSave !== false" id="workspace-container" class="relative box-content" :style="workspaceContainerStyle">
        <div id="workspace" class="bg-gray-100 border-4 border-gray-400 box-content" :style="workspaceStyle">
          <Moveable v-for="(feature, index) in $store.state.saves[$store.state.editingSave].features" :key="index" class="flex justify-center items-center text-center absolute cursor-pointer box-border" :style="featureStyles(index)" v-bind="moveable" @drag="handleDrag">
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
      this.$store.commit('zoomIn');
    },
    zoomIn: function () {
      this.$store.commit('zoomOut');
    },
    clearWorkspace: function () {
      this.$store.commit('saveEditingFeature', false);
      this.$store.commit('clearWorkspace');
    },
    handleDrag: function ({target, top, left}) {
      if (this.$store.state.editingSave !== false) {
        const index = parseInt(target.childNodes[0].dataset.index);
        this.$store.commit('saveEditingFeature', index);
        left = left / this.$store.state.saves[this.$store.state.editingSave].workspace.scale;
        left = left < 0 ? 0 : left;
        left = left > this.$store.state.saves[this.$store.state.editingSave].workspace.width - this.$store.state.saves[this.$store.state.editingSave].features[index].size.width ? this.$store.state.saves[this.$store.state.editingSave].workspace.width - this.$store.state.saves[this.$store.state.editingSave].features[index].size.width : left;
        top = top / this.$store.state.saves[this.$store.state.editingSave].workspace.scale;
        top = top < 0 ? 0 : top;
        top = top > this.$store.state.saves[this.$store.state.editingSave].workspace.height - this.$store.state.saves[this.$store.state.editingSave].features[index].size.height ? this.$store.state.saves[this.$store.state.editingSave].workspace.height - this.$store.state.saves[this.$store.state.editingSave].features[index].size.height : top;
        const position = {
          left,
          top
        }
        this.$store.commit('updatePosition', position);
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
          margin: 'auto',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0
        }
      } else {
        return {};
      }
    },
    workspaceContainerStyle() {
      if (this.$store.state.editingSave !== false) {
        let style = {};
        if (window.innerHeight > this.$store.state.saves[this.$store.state.editingSave].workspace.scale * this.$store.state.saves[this.$store.state.editingSave].workspace.height) {
          style = {
            top: 0,
            bottom: 0
          };
        }

        return {
          position: 'absolute',
          margin: 'auto',
          left: 0,
          right: 0,
          height: `${parseInt(this.$store.state.saves[this.$store.state.editingSave].workspace.height) + 30}em`,
          width: `${parseInt(this.$store.state.saves[this.$store.state.editingSave].workspace.width) + 30}em`,
          ...style
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
