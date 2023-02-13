<script setup>
const props = defineProps(['valide', 'segment'])
</script>

<template>

  <span v-if="props.valide" class="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
    {{segment}}
  </span>
  <span v-else class="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    {{segment}}
  </span>

</template>


<style lang="css" scoped>
</style>
