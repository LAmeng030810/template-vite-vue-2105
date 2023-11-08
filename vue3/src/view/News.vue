<template>
  <ElSpace direction="vertical" alignment="flex-start">

    <ElSkeleton class="news" :loading="loading" animated :count="9">
      <template #template>
        <div class="news">
          <div>
            <ElCard>
              <template #header>
                <ElSkeletonItem>
                  <div class="header">
                    <div></div>
                  </div>
                </ElSkeletonItem>
              </template>
              <div>
                <ElSkeletonItem>
                  <div>
                    <span class="title"> </span>
                  </div>
                </ElSkeletonItem>
                <div>
                  <ElSkeletonItem>
                    <div class="footer"> </div>
                  </ElSkeletonItem>
                </div>
              </div>
            </ElCard>
          </div>
        </div>
      </template>
      <template #default>
        <!-- 新闻显示部分 -->
        <div class="news">
          <div v-for="d in list" :key="d.source">
            <ElCard>
              <template #header>
                <div class="header">
                  <div>{{ d.source }}</div>
                </div>
              </template>
              <div>
                <div>
                  <span class="title" @click="showNews(d.nid)">
                    {{ d.title }}
                  </span>
                </div>
                <div class="footer">
                  <!-- {{ d.hits }} -->
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

  <!-- 分页信息 -->
  <div style="display: flex; justify-content: center; padding: 1rem">
    <el-button @click="setLoading">刷新</el-button>
    <RouterLink to="/"><ElButton>返回</ElButton></RouterLink>
    <PageComp :page="page" @page-change="query"></PageComp>
  </div>
</template>

<script lang="ts" setup>
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
} from 'element-plus'
import PageComp from '../components/PageComp.vue'
import WangEditorComp from '../components/WangEditorComp.vue'

const loading = ref(true)

const setLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

// #region 查询的部分
const list = ref([])

const page = ref({
  pageSize: 9,
  pageNumber: 1,
})

const queryInfo = ref({
  title: '',
  info: '',
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
    display: inline-block;
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
      margin: 0.5rem;
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
</style>
