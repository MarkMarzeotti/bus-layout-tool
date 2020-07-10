<template>
  <div id="app" class="flex items-stretch h-screen">
    
    <Workspace ref="workspace" />

    <Controls ref="controls" />

  </div>
</template>

<script>
import Workspace from './components/Workspace.vue';
import Controls from './components/Controls.vue';

export default {
  name: 'App',
  components: {
    Workspace,
    Controls
  }
}
</script>

<style>
</style>
