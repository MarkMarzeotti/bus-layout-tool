<template>
  <div>
    <label :class="`${labelClass} block tracking-wide font-medium mb-2`" :for="sanitizeText(label)">
      {{ label }}
    </label>
    <span class="flex">
      <input v-model="content" :placeholder="placeholder" :name="sanitizeText(label)" class="appearance-none block w-full bg-white text-gray-700 border border-r-1 border-gray-300 rounded rounded-r-none py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
      <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-200 text-gray-500 text-sm">
        inches
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'InchInput',
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
      type: [Number, String],
      required: false
    },
    labelClass: {
      type: String,
      default: 'text-gray-700 text-sm'
    }
  },
  computed: {
    content: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
