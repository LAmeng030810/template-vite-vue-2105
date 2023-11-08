<template>
  <div style="text-align: center">主页面</div>
  <hr />
  <RouterLink to="/pinia"><ElButton>计数器</ElButton></RouterLink>
  <br />
  <br />
  <RouterLink to="/test/apiserviceview"><ElButton>测试后端服务一</ElButton></RouterLink>
  <br />
  <br />
  <RouterLink to="/news"><ElButton>新闻</ElButton></RouterLink>
  <br />
  <br />
  <RouterLink to="/amap"><ElButton>高德地图</ElButton></RouterLink>
  <br />
  <br />
  <RouterLink to="/bmap"><ElButton>百度地图</ElButton></RouterLink>
  <br />
  <br />
  <RouterLink to="/skeleton"><ElButton>骨架屏</ElButton></RouterLink>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
</script>
