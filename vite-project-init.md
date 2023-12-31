# vite创建vue3 + typescript带路由和element-plus ui框架项目的简易流程

## 先决条件

- 安装[nodejs](https://nodejs.org)
  - 验证安装的nodejs版本的控制台指令：`node -v`
  - 如果版本过低可以卸载后重新安装
- 确保脚本执行权限
  - 以管理员身份运行`PowerShell`
  - 执行`get-ExecutionPolicy`查看执行脚本的权限
    - 如果显示不是`RemoteSigned`就执行下一步
  - 执行`set-ExecutionPolicy RemoteSigned`修改执行权限

## 创建基本的vite + vue + ts的项目

- `vscode`的必要的插件
  - `Vue Language Features (Volar)`
  - `TypeScript Vue Plugin (Volar)`
  - `Prettier - Code formatter`
  - `SCSS IntelliSense`
  - 如果有`Vetur`插件需要禁用或者卸载
- 执行指令：`npm create vite@latest 项目名称`创建项目
  - 界面是上下方向键选择选项，回车确认
  - 第一个选`Vue`
  - 第二个选`TypeScript`
  - 完成后用`vscode`单独打开创建的项目目录然后继续后面的步骤

## 项目配置和扩展

- 确保是打开的项目所在文件夹
- 执行`npm install`初始化项目（仅需要执行一次）
  - 如果项目莫名的异常也可以删除`node_modules`之后执行`npm install`
- 执行`npm run dev`启动项目开发服务（每次启动开发都需要执行）
- 添加项目其它依赖的功能模块
  - 路由模块：`npm install vue-router@4`
  - pinia状态管理：`npm install pinia`
  - prettier代码格式化：`npm install --save-dev --save-exact prettier`
  - 饿了么ui框架：`npm install element-plus --save`
  - 饿了么ui按需导入：`npm install -D unplugin-vue-components unplugin-auto-import`
  - axios网络请求：`npm install axios`
  - qs工具：`npm install qs`
  - qs工具类型定义：`npm i --save--dev @types/qs`
  - spark-md5密码库：`npm install spark-md5`
  - spark-md5密码库类型定义：`npm i --save-dev @types/spark-md5`
  - sass样式：`npm install -D sass`
- 模块的安装可以在`package.json`中验证
- 项目统一格式化配置（非必须）
  - `vscode`工作区配置是在`.vscode/settings.json`文件中
  - 项目的配置是在项目目录中的`.prettierrc.json`文件中
- 项目文件精简和个性化
  - `index.html`修改
    - 去掉`link`标记，也就是拿掉默认的网站图标，或者修改成自己的图标
    - 修改`title`的内容为自己网站标题
  - 删除`public`文件夹
  - 删除`src/assets`文件夹
  - 删除`src/components`文件夹
  - 删除`style.css`文件
  - 修改`main.ts`文件
    - 删除`import './style.css'`导入
  - 替换`src/App.vue`的内容为一行：`<template>网站建设中。。。</template>`
  - 格式化所有文件
  - 控制台执行`npm run dev`启动项目查看效果
- 路由配置
  - 在`src`中创建`view`目录
  - 在`view`目录创建`Home.vue`文件
    - 内容为一行：`<template>网站建设中。。。</template>`
  - 在`view`目录创建`About.vue`文件
    - 内容为一行：`<template>关于黑暗骑士的网站</template>`
  - 在`src`中创建`router`目录
  - 在`router`中创建`index.ts`文件
    - 内容点击[链接](#基本路由)查看
  - 修改`src/main.ts`加入路由配置
    - 添加`import { router } from './router/index'`
    - 修改`createApp(App).mount('#app')`这一行为下面的多行
      - `let app = createApp(App)`
      - `app.use(router)`
      - `app.mount('#app')`
  - 修改`src/App.vue`，替换内容为下面的多行来启用路由视图
    - `<template>`
    - `<RouterView></RouterView>`
    - `</template>`
  - 控制的执行`npm run dev`启动项目
    - 默认看到的是`Home.vue`的内容
    - 地址栏加上`/about`看到的是`About.vue`的内容
    - 路由功能到此就配置成功
- `element-plus`ui框架配置
  - 修改`src/main.ts`添加`import 'element-plus/dist/index.css'`
  - 修改`src/App.vue`的内容，内容点击[连接](#element-plus)查看
  - 在`src`中添加`types.d.ts`
    - 内容为：`declare module 'element-plus/dist/locale/zh-cn.mjs'`
  - 修改`src/About`内容，内容点击[连接](#ui-about)查看
  - 启动项目，打开`/about`页面可以看到饿了么plus的按钮就完成了导入流程
- `pinia`状态管理库配置
  - 修改`src/main.ts`添加`import { createPinia } from 'pinia'`
  - 修改`src/main.ts`添加`app.use(createPinia())`
  - 创建`src/store`目录并添加`index.ts`
  - 修改`src/store/index.ts`，内容点击[连接](#pinia)查看
  - 添加视图文件调用`pinia`，内容点击[连接](#pinia-view)查看

## 代码部分

### 基本路由

```ts
import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    // path就是地址栏访问的路径
    path: '/',
    // component就是对于地址的页面文件
    component: () => import('../view/Home.vue'),
  },
  {
    path: '/about',
    component: () => import('../view/About.vue'),
  },
]

// 创建router
const router = createRouter({
  // 配置为Hash模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 配置toures
  routes,
  // 路由跳转时返回顶部
  scrollBehavior() {
    return { top: 0 }
  },
})

// 设置前置路由守卫
router.beforeEach((to, from, next) => {
  console.log('路由前置：', to, from)
  next()
})

// 设置后置路由守卫
router.afterEach((to, from, failure) => {
  console.log('路由后置：', to, from, failure)
})

export { router }

```

### element-plus

```vue
<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
```

### ui-about

```vue
<template>
  <ElButton type="primary">关于黑暗骑士的网站</ElButton>
</template>

<script lang="ts" setup>
  import { ElButton } from "element-plus";
</script>
```

### pinia

```ts
import { defineStore } from 'pinia'

export const store = defineStore('main', {
  // state的方法就是用来定义状态管理的变量
  state: () => {
    return {
      count: 0,
    }
  },
  // actions是用来定义状态管理要使用方法
  // 这里面声明的方法可以直接操控state中声明的变量
  actions: {
    increment() {
      this.count++
    }
  },
})

export default store
```

### pinia-view

```vue
<template>
  计数器的值：{{ count }}
  <button @click="increment">修改计数器的值</button>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import store from '../../store/index'
// 获取pinia状态管理中的count值
const { count, loginUser } = storeToRefs(store())
// 获取pinia状态管理中的increment方法
const { increment } = store()
</script>
```
