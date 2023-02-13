<script setup>
const route = useRoute()
const color = ref(route.params.color)
const { $bus } = useNuxtApp()
import colors from "~/src/colors.json"
import _ from 'lodash'
const dsfrColors = ref(colors.colors)
const displayFail = ref(true)
let alternateColor = ref(_.find(dsfrColors.value, {color: `#${color.value}`}))
const changeDisplay = () => {
  $bus.$emit('changeDisplay', displayFail.value)
}
</script>

<template>
  <!-- Wrapper-->
<div class="flex-1 container max-w-7xl mx-auto pt-5 pb-36">

    <nav class="flex p-4">
      <NuxtLink to="/" class="flex-inline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
        Retour
      </NuxtLink>
    </nav>

    <!-- Content grid -->
    <div class="box-border max-w-7xl mx-4 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-3">

      <CardAlternate />

    </div>

    <div class="transition flex justify-center z-40 bg-white shadow-xl rounded-full h-16 w-auto bottom-12 fixed left-1/2 transform -translate-x-1/2 p-2 px-6">
      <div class="flex align-center py-2.5">
        <div class="">
          <label class="relative inline-flex items-center cursor-pointer mr-4">
            <input type="checkbox" value="" v-on:change="changeDisplay" v-model="displayFail" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-400"></div>
            <span class="ml-3 text-sm font-medium text-black">Display fail</span>
          </label>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="css" scoped>
</style>
