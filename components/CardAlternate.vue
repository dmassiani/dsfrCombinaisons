<script setup>
const route = useRoute()
import _ from 'lodash'
const { $bus } = useNuxtApp()
const color = ref(route.params.color)
import checkContrast from "color-contrast-checker"
import colors from "~/src/colors.json"
const dsfrColors = ref(colors.colors)
const displayFail = ref(true)
let alternateColor = ref(_.find(dsfrColors.value, {color: `#${color.value}`}))

const isValide = (color) => {
  if(alternateColor.value.name == color.name) return false

  if(displayFail.value === true){
    return true
  }else if(checkColorsAA(alternateColor.value.color, color.color, 30) == false || checkColorsAAA(alternateColor.value.color, color.color, 30) == false){
    return false
  }else{
    return true
  }
}
const combinaisonsColors = computed(() => {
  return dsfrColors.value.filter(isValide);
})

var ContrastChecker = new checkContrast();
const checkColorsAA = (a,b, size = 14) => {
  return ContrastChecker.isLevelAA(a,b,size)
}
const checkColorsAAA = (a,b, size = 14) => {
  return ContrastChecker.isLevelAAA(a,b,size)
}
const copyColor = (color) => {
  navigator.clipboard.writeText(color).then(function() {
    console.log('Async: Copying to clipboard was successful!', color);
  });
}
$bus.$on('changeDisplay', (display) => {
  displayFail.value = display
})
</script>

<template>

  <article v-for="(color, index) in combinaisonsColors" :key="index" :style="{backgroundColor: alternateColor.color}"
  class="break-inside-avoid mb-4 p-6 rounded-xl flex flex-col bg-clip-border">
    <div class="">
      <Badge :valide="checkColorsAA(alternateColor.color, color.color, 30)" segment="AA"/> <Badge :valide="checkColorsAAA(alternateColor.color, color.color, 30)" segment="AAA"/>
    </div>
    <h2 class="text-3xl font-extrabold dark:text-white" :style="{color: color.color}">
      La VAE Rox en {{alternateColor.name}}
    </h2>
    <div class="mt-6">
      <Badge :valide="checkColorsAA(alternateColor.color, color.color, 20)" segment="AA"/> <Badge :valide="checkColorsAAA(alternateColor.color, color.color, 20)" segment="AAA"/>
      <p :style="{color: color.color}">
        Cras mattis consectetur purus sit amet fermentum.
      </p>
      <p>Text : {{color.color}}</p>
      <p>Background : {{alternateColor.color}}</p>
    </div>
    <div class="flex mt-6">
      <button @click="copyColor(color.color)" type="button" class="mr-2 inline-flex items-center rounded bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
        Background color
      </button>

      <button @click="copyColor(color.color)" type="button" class="inline-flex items-center rounded bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
        Text color
      </button>

    </div>
  </article>

</template>


<style lang="css" scoped>
</style>
