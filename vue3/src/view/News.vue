<template>
  <!-- 新闻显示的部分(含骨架屏) -->
  <ElSpace direction="vertical" alignment="flex-start">
    <!-- ElSkeleton:骨架屏
    animated:显示加载动画
    count="N" 渲染多少个假UI数据，N表示渲染数量
    : 表示一个语法糖，用于绑定属性和样式，效果等价于v-bind:
    v-bind: 用于动态绑定HTML属性和Vue.js组件的数据 -->
    <ElSkeleton class="news" :loading="loading" animated :count="9">
      <!-- 动画加载 -->
      <template #template>
        <div>
          <div>
            <ElCard>
              <template #header>
                <!-- 头部 -->
                <div>
                  <ElSkeletonItem class="skeleton-top"></ElSkeletonItem>
                </div>
              </template>
              <!-- title显示部分 -->
              <div>
                <div>
                  <ElSkeletonItem class="skeleton"></ElSkeletonItem>
                </div>
                <div>
                  <ElSkeletonItem class="skeleton"></ElSkeletonItem>
                </div>
                <div>
                  <ElSkeletonItem class="skeleton-dwn"></ElSkeletonItem>
                </div>
              </div>
            </ElCard>
          </div>
        </div>
      </template>
      <!-- 新闻显示部分 -->
      <template #default>
        <div class="news">
          <div v-for="d in list">
            <ElCard>
              <template #header>
                <div class="header">
                  <div>{{ d.source }}</div>
                  <!-- 图标 -->
                  <div>
                    <!-- 修改图标 -->
                    <svg
                      t="1699580102111"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="6069"
                      id="mx_n_1699580102113"
                      width="200"
                      height="200"
                    >
                      <path
                        d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
                        fill="#2c2c2c"
                        p-id="6070"
                      ></path>
                    </svg>
                    <!-- 删除图标 -->
                    <svg
                      t="1699857620768"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="1810"
                      width="200"
                      height="200"
                    >
                      <path
                        d="M788.2752 275.26144H618.60864a106.496 106.496 0 0 0-212.75648 0H235.73504a26.2144 26.2144 0 0 0 0 52.4288H788.2752a26.2144 26.2144 0 0 0 0-52.4288z m-276.03968-49.152a54.12864 54.12864 0 0 1 53.83168 49.152H458.3936a54.12864 54.12864 0 0 1 53.84192-49.152zM722.7392 379.98592a26.2144 26.2144 0 0 0-26.2144 26.2144v391.72096h-366.592V406.20032a26.22464 26.22464 0 0 0-52.43904 0v417.92512a26.22464 26.22464 0 0 0 26.22464 26.22464h419.0208a26.2144 26.2144 0 0 0 26.20416-26.22464V406.20032a26.2144 26.2144 0 0 0-26.20416-26.2144z m0 0"
                        p-id="1811"
                      ></path>
                      <path
                        d="M461.8752 692.11136V458.96704a26.22464 26.22464 0 0 0-52.43904 0v233.14432a26.22464 26.22464 0 0 0 52.43904 0z m156.89728 0V458.96704a26.2144 26.2144 0 0 0-52.4288 0v233.14432a26.2144 26.2144 0 0 0 52.4288 0z m0 0"
                        p-id="1812"
                      ></path>
                    </svg>
                  </div>
                </div>
              </template>
              <div>
                <div>
                  <span class="title" @click="showNews(d.nid)">
                    {{ d.title }}
                  </span>
                </div>
                <div class="footer">
                  {{ d.hits }}
                  {{ tools.formatDate(d.lastupdate) }}
                </div>
              </div>
            </ElCard>
          </div>
        </div>
      </template>
    </ElSkeleton>
  </ElSpace>

  <!-- 新闻详情查看的对话框 -->
  <ElDialog title="新闻详情" v-model="news_info_visible">
    <div>
      <div class="detail" v-html="news_info.info"></div>
    </div>
  </ElDialog>

  <!-- 添加新闻的对话框 -->
  <ElDialog title="添加新闻" v-model="add_visible" @close="query">
    <div>
      <ElForm>
        <ElFormItem>
          <ElInput v-model="addInfo.title" placeholder="请输入标题"></ElInput>
        </ElFormItem>

        <ElFormItem>
          <ElInput v-model="addInfo.source" placeholder="请输入来源"></ElInput>
        </ElFormItem>

        <ElFormItem>
          <WangEditorComp @value-change="change_edit_value"></WangEditorComp>
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="add">发布</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </ElDialog>

  <!-- 分页信息 -->
  <div style="display: flex; justify-content: center; padding: 1rem">
    <div>
      <ElButton type="primary" @click="showAdd">
        <span>发布新闻</span>
      </ElButton>
    </div>
    <el-button @click="setLoading">刷新</el-button>
    <RouterLink to="/"><ElButton>返回</ElButton></RouterLink>
    <PageComp :page="page" @page-change="query"></PageComp>
  </div>
</template>

<script lang="ts" setup>
// 导入的包以及组件
import { ref } from 'vue'
import { ApiService } from '../api/ApiService'
import { tools } from '../api/Tools'
import {
  ElButton,
  ElCard,
  ElDialog,
  ElMessageBox,
  ElSpace,
  ElSkeleton,
  ElSkeletonItem,
  ElForm,
  ElFormItem,
  ElInput,
} from 'element-plus'
import PageComp from '../components/PageComp.vue'
import WangEditorComp from '../components/WangEditorComp.vue'

// #region 骨架屏
const loading = ref(true)

const setLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
// #endregion

// #region 查询的部分
const list = ref([])

const page = ref({
  pageSize: 9,
  pageNumber: 1,
})

const queryInfo = ref({
  title: '',
  info: '',
  hits: '',
})

const query = () => {
  ApiService.get(
    '/crud/news',
    tools.concatJson(page.value, queryInfo.value),
    (data: any) => {
      if (data.success) {
        list.value = data.data
        page.value = data.pageBean
      } else {
        ElMessageBox.alert(data.message, '任沐铭的网站')
      }
    }
  )
}

query()
// #endregion

// #region 显示新闻详情的部分
const news_info = ref({})
const news_info_visible = ref(false)

const showNews = (id: any) => {
  ApiService.get(`/crud/news/${id}`, {}, (data: any) => {
    if (data.success) {
      news_info.value = data.data
      news_info_visible.value = true
    } else {
      ElMessageBox.alert(data.message, '任沐铭的网站')
    }
  })
}

// #endregion

// #region 添加新闻的部分
const change_edit_value = (value: any) => {
  addInfo.value.info = value
}

const add_visible = ref(false)

const addInfo = ref({
  title: '',
  info: '',
  source: '',
})

const showAdd = () => {
  addInfo.value = {
    title: '',
    info: '',
    source: '',
  }
  add_visible.value = true
}

const add = () => {
  ApiService.post('/crud/news', addInfo.value, (data: any) => {
    ElMessageBox.alert(data.message, '任沐铭的网站')
  })
}

// #endregion

// #region 修改新闻的部分

// #endregion

// #region 删除新闻的部分

// #endregion
</script>
<style lang="scss" scoped>
.news {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  > div {
    margin: 1rem;
    width: 30rem;
  }
  .footer {
    padding: 1rem;
    text-align: end;
  }
  .title {
    line-height: 1.5;
    display: inline-block;
    width: 49vh;
    height: 4.8vh;
    padding: 1rem 0px;
    cursor: pointer;
    &:hover {
      color: #1890ff;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    svg {
      margin-right: 0.5rem;
      &:hover {
        cursor: pointer;
        transform: scale(1.4);
      }
    }
  }
}
.detail {
  max-height: 60vh;
  width: 100%;
  overflow-y: auto;
}
svg.icon {
  width: 1rem;
  height: auto;
  display: inline-block;
  margin: 0px 0.2rem;
}

.skeleton-top {
  width: 8rem;
  height: 1.9vh;
}
.skeleton {
  width: 49vh;
  height: 2vh;
  margin-top: 1rem;
}
.skeleton-dwn {
  width: 20vh;
  height: 2vh;
  margin-top: 1rem;
  margin-bottom: 0.9rem;
  margin-left: 29vh;
}
</style>
