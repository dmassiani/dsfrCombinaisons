<script setup>
const { $bus } = useNuxtApp()
import checkContrast from "color-contrast-checker"
import colors from "~/src/colors.json"
const dsfrColors = ref(colors.colors)
const props = defineProps(['color', 'generatedColors', 'index', 'nColors'])
const displayFail = ref(true)
import { useApp } from '~/stores/app'
const APP = useApp()

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

  <article :style="{backgroundColor: color}" class="break-inside-avoid w-full h-full flex flex-col bg-clip-border">
    <div class="mt-4">
      <h1 class="text-3xl text-center w-full" :style="{color: invertColor(color, true)}">{{color}}</h1>
      <div class="text-center w-full mt-2" :style="{color: invertColor(color, true)}" v-if="index == 0 || index == nColors - 1">
        Couleur DSFR
        <p v-if="index == 0">{{generatedColors[0].name}}</p>
        <p v-if="index == nColors - 1">{{generatedColors[1].name}}</p>
      </div>
    </div>
  </article>

</template>


<style lang="css" scoped>
</style>
