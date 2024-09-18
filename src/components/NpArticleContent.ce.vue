<script setup lang="ts">
import type { Content } from '@/types/newsPaper'

defineProps<{
  content: Content
}>()
</script>

<template>
  <div>
    <div v-if="content.project || content.title" class="flex gap-1 text-[#0000ff]">
      ◇
      <span v-show="content.project">{{ content.project }}</span>
      <span v-html="content.title"></span>
    </div>
    <div
      v-if="content.subtitles"
      class="text-[#0000ff]"
      v-html="content.subtitles.join(' / ')"
    ></div>
    <div v-if="content.organization" class="text-[#800080]">
      <template v-if="typeof content.organization === 'object'">
        <p
          v-for="(item, index) in content.organization"
          :key="`organization-${index}`"
          class="text-right m-0"
        >
          - {{ item }} -
        </p>
      </template>
      <template v-else-if="content.organization.length < 30">
        <p class="text-right m-0">- {{ content.organization }} -</p>
      </template>
      <template v-else>
        <p class="m-0">{{ content.organization }}</p>
      </template>
    </div>
    <area-html v-if="content.sentence" :html="content.sentence"></area-html>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
