<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<template>
  <div class="area-html" v-html="html"></div>
</template>

<style scoped>
.area-html :deep(*):first-child {
  margin-top: 0;
}
.area-html :deep(*):last-child {
  margin-bottom: 0;
}
</style>
