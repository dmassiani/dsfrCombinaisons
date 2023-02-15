<script setup>
import _ from 'lodash'
const { $bus } = useNuxtApp()
import checkContrast from "color-contrast-checker"
import { useApp } from '~/stores/app'
import chroma from "chroma-js"
const APP = useApp()
const favories = ref(APP.getAllFavories)

const isValide = (color) => {
  if(checkColorsAA(color.background, color.text, 30) == false || checkColorsAAA(color.background, color.text, 30) == false){
    return false
  }else{
    return true
  }
}
const combinaisonsColors = computed(() => {
  return favories.value.filter(isValide);
})

var ContrastChecker = new checkContrast();
const checkColorsAA = (a,b, size = 14) => {
  return ContrastChecker.isLevelAA(a,b,size)
}
const checkColorsAAA = (a,b, size = 14) => {
  return ContrastChecker.isLevelAAA(a,b,size)
}
const getContrast = (a,b) => {
  return chroma.contrast(a, b)
}
const copyColor = (color) => {
  navigator.clipboard.writeText(color).then(function() {
    console.log('Async: Copying to clipboard was successful!', color);
  });
}
const addFavorie = async (bgColor, textColor) => {
  APP.addFavorie(bgColor, textColor)
}
</script>

<template>

  <article v-for="(color, index) in combinaisonsColors" :key="index" :style="{backgroundColor: color.background}"
  class="break-inside-avoid mb-4 p-6 rounded-xl flex flex-col bg-clip-border">

    <nav class="flex justify-between pb-4">
      <button @click="addFavorie(color.background, color.text)" type="button">
        <svg v-if="!APP.isFavorie(color.background, color.text)" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        <span class="sr-only">Favorie</span>
      </button>
      <NuxtLink :to="`${color.background.slice(1)}`" :style="{color: color.text}" class="inline-flex">
        <span>{{Math.round((getContrast(color.background, color.text) + Number.EPSILON) * 100) / 100}}</span>
        <span class="ml-2">Alternate</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </NuxtLink>
    </nav>

    <div class="">
      <Badge :valide="checkColorsAA(color.background, color.text, 30)" segment="AA"/> <Badge :valide="checkColorsAAA(color.background, color.text, 30)" segment="AAA"/>
    </div>
    <h2 class="text-3xl font-extrabold dark:text-white" :style="{color: color.text}">
      Lorem ipsum
    </h2>
    <div class="mt-6">
      <Badge :valide="checkColorsAA(color.background, color.text, 20)" segment="AA"/> <Badge :valide="checkColorsAAA(color.background, color.text, 20)" segment="AAA"/>
      <p :style="{color: color.text}">
        Cras mattis consectetur.
      </p>
      <p class="mt-2" :style="{color: color.text}">Text :
        <strong @click="copyColor(color.text)">
          {{color.text}}
        </strong>
      </p>
      <p :style="{color: color.text}">Background :
        <strong @click="copyColor(color.background)">
          {{color.background}}
        </strong>
      </p>
    </div>
    <div class="flex mt-6">
      <button @click="copyColor(color.background)" type="button" class="mr-2 inline-flex items-center rounded bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
        Background color
      </button>

      <button @click="copyColor(color.text)" type="button" class="inline-flex items-center rounded bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
