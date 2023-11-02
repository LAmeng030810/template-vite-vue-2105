<template>
  <RouterLink to="/"><ElButton>返回</ElButton></RouterLink>

  <div>测试后端服务一</div>
  <div style="display: flex">
    <ElInput v-model="email_info.email"></ElInput>
    <ElButton @click="sendEamil">发送邮件</ElButton>X
  </div>
  <hr />
  <div>
    <img @click="getImgCode" :src="imgcode.dataurl" alt="" />
  </div>
  <hr />
  <div style="display: flex">
    <ElInput v-model="py"></ElInput>
    <ElButton @click="getPy">获取拼音</ElButton>
  </div>
  {{ result }}
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton, ElInput, ElMessageBox } from 'element-plus'
import { ApiService } from '../../api/ApiService'
import { TeachService } from '../../api/TeachService'

const email_info = ref({
  email: '',
  code: '',
})

const imgcode = ref({
  dataurl: '',
  code: '',
  token: '',
})

const getImgCode = () => {
  ApiService.get('/tools/imagecode', {}, (data: any) => {
    if (data.success) {
      imgcode.value = data.data
    } else {
      ElMessageBox.alert(data.message)
    }
  })
}

getImgCode()

const sendEamil = () => {
  ApiService.post('/tools/sendMailCode', email_info.value, (data: any) => {
    ElMessageBox.alert(data.message)
  })
}

const py = ref('')
const result = ref('')
const getPy = () => {
  TeachService.post('/api/pinyin', { info: py.value }, (data: any) => {
    result.value = data.message
  })
}
</script>
<style lang="scss" scoped></style>
