<template>
  <RouterLink to="/"><ElButton>返回</ElButton></RouterLink>
  <div>测试后端服务一</div>
  <!-- 邮箱验证码 -->
  <div style="display: flex">
    <ElInput v-model="email_info.email" placeholder="获取邮箱验证码"></ElInput>
    <ElButton type="primary" @click="sendEamil">发送邮件</ElButton>
  </div>
  <hr>
  <!-- 短信验证码 -->
  <div style="display: flex">
    <ElInput v-model="phone_info.phone" placeholder="获取短信验证码"></ElInput>
    <ElButton type="primary" @click="sendPhone">发送短信</ElButton>
  </div>
  <hr />
  <!-- 图片验证码 -->
  <div>
    <img @click="getImgCode" :src="imgcode.dataurl" alt="" />图片验证码
  </div>
  <hr />
  <!-- 文字转拼音 -->
  <div style="display: flex">
    <ElInput v-model="py" placeholder="请输入文字"></ElInput>
    <ElButton type="primary" @click="getPy">获取拼音</ElButton>
  </div>
  {{ result }}
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton, ElInput, ElMessageBox } from 'element-plus'
import { ApiService } from '../../api/ApiService'
import { TeachService } from '../../api/TeachService'

// #region 邮箱验证码
const email_info = ref({
  email: '',
  code: '',
})

const sendEamil = () => {
  ApiService.post('/tools/sendMailCode', email_info.value, (data: any) => {
    ElMessageBox.alert(data.message)
  })
}
// #endregion

// #region 短信验证码
const phone_info = ref({
  phone:'',
  code: '',
})

const sendPhone = () => {
  ApiService.post('/tools/sendPhoneCode', phone_info.value, (data: any) => {
    ElMessageBox.alert(data.message)
  })
}

// #endregion

// #region 图片验证码
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
// #endregion

// #region 文字转拼音
const py = ref('')
const result = ref('')
const getPy = () => {
  TeachService.post('/api/pinyin', { info: py.value }, (data: any) => {
    result.value = data.message
  })
}
// #endregion
</script>
<style lang="scss" scoped></style>
