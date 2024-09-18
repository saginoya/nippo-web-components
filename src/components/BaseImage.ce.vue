<script setup lang="ts">
defineProps<{
  src: string
  width: string
  height: string
  caption: string
}>()
</script>

<template>
  <figure class="table">
    <img :src="src" :width="width" :height="height" />
    <figcaption
      class="table-caption caption-bottom text-sm leading-6"
      v-html="caption"
    ></figcaption>
  </figure>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
