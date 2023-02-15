<script setup>
const { $bus } = useNuxtApp()
import colors from "~/src/colors.json"
import _ from 'lodash'
const dsfrColors = ref(colors.colors)
const limit = ref(1)
const page = ref(0)
const displayFail = ref(false)
// ###############################################
// Keyboard manager (voir le composant dans l'html)
// ###############################################
let Keyboard = globalEvent()

const colorsFromDSFR = computed(() => {
  return dsfrColors.value.slice(page.value * limit.value, (page.value + 1) *limit.value)
})
const prevPage = () => {
  page.value = page.value-1
}
const nextPage = () => {
  page.value = page.value+1
}
const changeDisplay = () => {
  $bus.$emit('changeDisplay', displayFail.value)
}
function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
</script>

<template>

  <Keyboard
    @keyup.prevent.right.exact="nextPage"
  />

  <Keyboard
    @keyup.prevent.left.exact="prevPage"
  />

  <!-- Wrapper-->
  <div class="py-4" :style="{backgroundColor: colorsFromDSFR[0].color}">
    <h1 class="text-2xl font-bold text-gray-900 tracking-tight flex justify-center" :style="{color: invertColor(colorsFromDSFR[0].color, true)}">Combinaisons avec la couleur {{colorsFromDSFR[0].name}}</h1>
  </div>

  <div class="flex-1 container max-w-5xl mx-auto pt-5 pb-36">


    <!-- Content grid -->
    <div class="box-border max-w-5xl mx-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 mt-6">

      <Card v-for="(color, index) in colorsFromDSFR" :key="index" :colors="dsfrColors" :name="color.name" :hex="color.color" :index="index" />

    </div>

    <div class="transition flex justify-between z-40 bg-white shadow-xl rounded-full h-16 w-1/2 bottom-12 fixed left-1/2 transform -translate-x-1/2 p-2">
      <button v-if="page > 0" @click="prevPage" type="button" class="transition inline-flex items-center rounded-full border border-transparent bg-gray-300 px-5 py-2 text-base font-medium text-black shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
      </button>
      <button v-else type="button" class="opacity-20 transition inline-flex items-center rounded-full border border-transparent bg-gray-300 px-5 py-2 text-base font-medium text-black shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
      </button>
      <div class="flex align-center py-2.5">
        <div class="">
          <label class="relative inline-flex items-center cursor-pointer mr-4">
            <input type="checkbox" value="" v-on:change="changeDisplay" v-model="displayFail" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-400"></div>
            <span class="ml-3 text-sm font-medium text-black">Display fail</span>
          </label>
        </div>
      </div>
      <button v-if="page < dsfrColors.length - 1" @click="nextPage" type="button" class="transition ml-2 inline-flex items-center rounded-full border border-transparent bg-gray-300 px-5 py-2 text-base font-medium text-black shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </button>
      <button v-else type="button" class="opacity-20 transition ml-2 inline-flex items-center rounded-full border border-transparent bg-gray-300 px-5 py-2 text-base font-medium text-black shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </button>
    </div>

  </div>

</template>

<style lang="css" scoped>
</style>
