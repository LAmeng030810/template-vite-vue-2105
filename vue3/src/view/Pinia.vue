<template>
  <RouterLink to="/"><ElButton>返回</ElButton></RouterLink>
  <div>
    计数器的值：{{ count }}
  <ElButton round @click="increment">修改计数器的值</ElButton>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { storeToRefs } from 'pinia'
import store from '../store/index'
// 获取pinia状态管理中的count值
const { count } = storeToRefs(store())
// 获取pinia状态管理中的increment方法
const { increment } = store()
</script>
