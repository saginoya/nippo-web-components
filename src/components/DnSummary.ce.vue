<script setup lang="ts">
import { computed } from 'vue'
import { useDate } from '@/composables/useDate'
import { usePathGenerator } from '@/composables/usePathGenerator'
import type { DailyNews } from '@/types/dailyNews'

const props = defineProps<{
  article: DailyNews
}>()

const { release, formatMD } = useDate(props.article.date)

const { dailyNewsArticlePage } = usePathGenerator()
const url = computed(() => {
  return dailyNewsArticlePage(props.article.category, props.article.date, props.article.id)
})
</script>

<template>
  <p class="flex gap-1">
    <dn-tag :cat="article.category"></dn-tag>
    <a :href="url">
      <span v-html="article.title"></span>
      <span v-if="article.organization">――{{ article.organization }}</span>
      <span v-if="formatMD">（{{ formatMD }}）</span>
      <span v-if="!release">【予約】</span>
    </a>
  </p>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
