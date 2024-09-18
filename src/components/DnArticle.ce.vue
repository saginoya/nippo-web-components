<script setup lang="ts">
import { computed } from 'vue'
import { useDate } from '@/composables/useDate'
import type { DailyNews } from '@/types/dailyNews'

const props = defineProps<{
  article: DailyNews
}>()

const { release, formatMD, formatJaMDHm } = useDate(props.article.date)

const footer = computed(() => {
  const date = formatJaMDHm.value
  const info = (value: string | undefined) => {
    return value ? '&ensp;' + value : ''
  }
  return `（${date}${info(props.article.forMoreInformation)}）`
})
</script>

<template>
  <article class="border-b border-black border-dotted flex text-base">
    <header class="basis-12 grow-0 p-1">
      <p v-if="!release">予約</p>
      <p>{{ formatMD }}</p>
    </header>
    <section class="grow p-1">
      <div class="flex gap-1">
        <dn-tag-cat :cat="article.subcategory" />
        <h1 class="font-bold" :class="`text-${article.category}`">
          <span v-html="article.title"> </span>
          <span v-if="article.organization"> ――{{ article.organization }} </span>
        </h1>
      </div>
      <div class="flex justify-between gap-1" :class="{ 'flex-col': article.imagePositionBottom }">
        <area-html :html="article.sentence + footer"> </area-html>
        <div v-if="article.images" class="shrink-0 text-center">
          <div class="flex justify-center gap-2">
            <base-image
              v-for="(image, index) in article.images"
              :key="index"
              :src="image.url"
              :width="image.width"
              height="auto"
              :caption="image.caption"
            ></base-image>
          </div>
          <p v-if="article.straddlingCaption" class="text-sm leading-6">
            {{ article.straddlingCaption }}
          </p>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import url(../assets/css/main.css);
.text-hoso {
  color: #4067d0;
}
.text-kankyo {
  color: #008000;
}
</style>
