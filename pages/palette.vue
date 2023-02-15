<script setup>
import colors from "~/src/colors.json"
import _ from 'lodash'
import chroma from "chroma-js";
const { $bus } = useNuxtApp()
useHead({
  bodyAttrs: {
    class: 'h-full overflow-hidden'
  },
  htmlAttrs: {
    class: 'h-full'
  }
})

// ###############################################
// Keyboard manager (voir le composant dans l'html)
// ###############################################
let Keyboard = globalEvent()

const dsfrColors = ref(colors.colors)
const displayFail = ref(true)
const colorsSample = ref(2)
const colorsToGenerated = ref(5)
const generatedColors = ref(_.sampleSize(dsfrColors.value, colorsSample.value))

const getColors = computed(() => {
  return chroma.scale([generatedColors.value[0].color, generatedColors.value[1].color]).mode('hsl').colors(colorsToGenerated.value)
})
const paletteColors = ref(getColors.value)

const changeDisplay = () => {
  $bus.$emit('changeDisplay', displayFail.value)
}
const generatePalette = () => {
  generatedColors.value = _.sampleSize(dsfrColors.value, colorsSample.value)
  paletteColors.value = chroma.scale([generatedColors.value[0].color, generatedColors.value[1].color]).mode('hsl').colors(colorsToGenerated.value)
}
watch(colorsToGenerated, () => {
  generatePalette()
});
</script>

<template>

    <Keyboard
      @keyup.prevent.space.exact="generatePalette"
    />

    <!-- Content grid -->
    <div class="box-border h-full flex">

      <CardPalette v-for="(color, index) in paletteColors" :key="index" :color="color" :generatedColors="generatedColors" :index="index" :nColors="colorsToGenerated"/>

    </div>

    <div class="transition flex justify-center z-40 bg-white shadow-xl rounded-full h-16 w-auto bottom-12 fixed left-1/2 transform -translate-x-1/2 p-2 px-6">
      <div class="flex align-center py-2.5">
        Space for new scheme
      </div>
      <div class="ml-4">
        <input type="number" v-model="colorsToGenerated" name="colors" id="colors" class="block h-12 w-20 rounded-md border-none sm:max-w-xs sm:text-sm">
      </div>
    </div>

</template>

<style lang="css" scoped>

</style>
