<template>
  <div class="controls">
    <div class="panel">
      <h2>Features</h2>
      <p v-for="feature in features" :key="feature.index">{{ feature.name }}
      <button>Add Feature</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  props: {
    features: Array
  }
}
</script>

<style scoped>
</style>