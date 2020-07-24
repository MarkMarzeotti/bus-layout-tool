<template>
  <div class="bg-gray-100 border-b-2 border-l-2 border-gray-300">
    <header class="bg-gray-200 px-6 border-b-1 border-gray-300 flex justify-between">
      <h2 class="uppercase tracking-wide text-gray-700 text-sm font-medium mb-0 py-4">{{ title }}</h2>
      <button v-on:click="panelOpen = !panelOpen" class="flex items-center px-2 py-3 text-gray-500">
        <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path v-if="!panelOpen" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/><path v-if="panelOpen" d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"/></svg>
      </button>
    </header>

    <div v-if="panelOpen" class="p-6">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      panelOpen: true,
    }
  }
}
</script>
