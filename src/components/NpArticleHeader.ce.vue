<script setup lang="ts">
import { useDate } from '@/composables/useDate'
import type { Image } from '@/types/newsPaper'

const props = defineProps<{
  name: string
  releaseDate: string
  suspended?: boolean
  message?: string
  images?: Image[]
}>()

const { release } = useDate(props.releaseDate)
</script>

<template>
  <header class="text-center">
    <div v-if="!release">【予約】公開日：{{ releaseDate }}</div>
    <div class="flex justify-center items-center gap-3">
      <img v-if="images" :src="images[0]" class="object-contain w-24 h-24" />
      <span v-if="!suspended" class="font-bold text-[#ff0000]" v-html="name"></span>
      <span v-else class="text-[#ffa500]">---- {{ name }} ----</span>
      <img v-if="images" :src="images[1]" class="object-contain w-24 h-24" />
    </div>
    <div v-if="message">
      <p>{{ message }}</p>
    </div>
  </header>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
