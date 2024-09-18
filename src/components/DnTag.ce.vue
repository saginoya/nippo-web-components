<script setup lang="ts">
import { computed } from 'vue'
import TagHoso from '@/assets/images/top_news_h.gif'
import TagKankyo from '@/assets/images/top_news_w.gif'
import type { Category } from '@/types/categories'

const props = defineProps<{
  cat: Category
}>()

const image = computed(() => {
  switch (props.cat) {
    case 'hoso':
      return TagHoso
    default:
      return TagKankyo
  }
})
</script>

<template>
  <span>
    <img :src="image" alt="" width="27" height="17" />
  </span>
</template>
