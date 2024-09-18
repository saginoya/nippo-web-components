<script setup lang="ts">
import { computed } from 'vue'
import { useDate } from '@/composables/useDate'
import { usePathGenerator } from '@/composables/usePathGenerator'
import type { DailyNews } from '@/types/dailyNews'

const props = defineProps<{
  article: DailyNews
}>()

const { release, formatMMDD } = useDate(props.article.date)

const { dailyNewsArticlePage } = usePathGenerator()
const url = computed(() => {
  return dailyNewsArticlePage(props.article.category, props.article.date, props.article.id)
})
</script>

<template>
  <p class="flex gap-1 py-2">
    <span>{{ formatMMDD }}</span>
    <dn-tag-cat :cat="article.subcategory" />
    <a :href="url" class="text-[#0000ff]">
      <span v-html="article.title"></span>
      <span v-if="article.organization">――{{ article.organization }}</span>
      <span v-if="!release">【予約】</span>
    </a>
  </p>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
