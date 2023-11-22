<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>

<style>
/* 禁选网页文本的css样式 */
.font-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
