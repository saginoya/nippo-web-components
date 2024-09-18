<script setup lang="ts">
import { useStateDate } from '../composables/useStateDate'

const { year, month } = useStateDate()
</script>

<template>
  <span>
    {{ `【${year}年${month}月】` }}
  </span>
</template>
