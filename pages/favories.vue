<script setup>

</script>

<template>
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

        <CardFavories />

      </div>


    </div>
</template>

<style lang="css" scoped>
</style>
