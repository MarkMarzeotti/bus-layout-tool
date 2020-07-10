<template>
  <div>
    <label :class="`${labelClass} block tracking-wide font-medium mb-2`" :for="sanitizeText(label)">
      {{ label }}
    </label>
    <input v-model="value" :placeholder="placeholder" :name="sanitizeText(label)" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm mb-4">
  </div>
</template>

<script>
export default {
  name: 'SimpleInput',
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    labelClass: {
      type: String,
      default: 'text-gray-700 text-sm'
    }
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    }
  }
}
</script>
