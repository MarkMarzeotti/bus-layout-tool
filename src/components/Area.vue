<template>
  <div class="area">
    <div id="features" v-for="feature in features" :key="feature.index">
      <Feature :name="feature.name" />
    </div>

		<svg class="wires">
			<defs>
				<marker id="positive" orient="auto" markerWidth="60" markerHeight="80" refX="20" refY="6">
					<path d="M0,0 V12 L10,6 Z" fill="red" />
				</marker>
				<marker id="negative" orient="auto" markerWidth="60" markerHeight="80" refX="20" refY="6">
					<path d="M0,0 V12 L10,6 Z" fill="black" />
				</marker>
			</defs>
      <Wire />
    </svg>
  </div>
</template>

<script>
import Feature from './Feature.vue'
import Wire from './Wire.vue'

export default {
  name: 'Area',
  props: {
    features: Array
  },
  components: {
    Feature,
    Wire
  }
}
</script>

<style scoped>
</style>