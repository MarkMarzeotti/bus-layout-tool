<template>
  <div>
    <label class="block tracking-wide text-gray-500 text-xs font-medium mb-2" :for="sanitizeText(label)">
      {{ label }}
    </label>
    <span class="relative flex">
      <div class="w-circle h-circle mr-4 my-auto border rounded-full" :style="indicatorSelect"></div>
      <select v-model="inputValue" :name="sanitizeText(label)" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
        <option v-for="(color, index) in colors" :value="color.hex" :key="index">{{ color.name }}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
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
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      inputValue: this.value,
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
  watch: {
    inputValue() {
      this.$emit('input', this.inputValue);
    }
  },
  computed: {
    indicatorSelect() {
      return {
        backgroundColor: `${this.inputValue}`
      }
    }
  }
}
</script>
