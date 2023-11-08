<template>
  <div class="main">
    <div>
      高德地图
      <ElButton @click="openMap" type="primary">地图调起</ElButton>
    </div>
    <div>
      <div id="map-container"></div>
    </div>
    <div>{{ loadingInfo }}</div>
  </div>

  <!-- 浮动搜索功能区域 -->
  <div class="search-box">
    <ElCard>
      <template #header>
        <div style="display: flex">
          <ElInput v-model="sinfo" placeholder="输入地址搜索"></ElInput>
          <ElButton @click="search" type="primary">搜索</ElButton>
        </div>
      </template>
      <div>
        <div id="divSsr">请输入搜索词</div>
      </div>
    </ElCard>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { ElButton, ElCard, ElInput } from 'element-plus'

// 地图容器对象
let map: any
// 地图api对象
let ObjAMap: any
// 中心点标记
let marker: any
// 搜索控件
let searchControl: any
// 搜索词
let sinfo = ref('')

// 用户初始定位位置
let userLocation: any

const map_url = 'https://uri.amap.com/navigation?from='

const openMap = () => {
  console.log('定位信息：', userLocation, map.getCenter())
  let url =
    map_url +
    userLocation.lng +
    ',' +
    userLocation.lat +
    '&to=' +
    map.getCenter().lng +
    ',' +
    map.getCenter().lat +
    '&mode=walk'
  console.log('地图调起url')
  window.open(url)
}

const search = () => {
  if (sinfo.value == '') {
    document.getElementById('divSsr').innerHTML = '请输入搜索词'
    return
  }
  searchControl.search(sinfo.value)
}

// const loading = ref(false)
const loadingInfo = ref('地图加载中')

const getlocation = () => {
  loadingInfo.value = '获取定位信息'
  // 创建定位对象
  var geolocation = new ObjAMap.Geolocation({
    enableHighAccuracy: true, // 是否使用高精度定位，默认：true
    timeout: 10000, // 设置定位超时时间，默认：无穷大
    offset: [10, 20], // 定位按钮的停靠位置的偏移量
    zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    position: 'RB', //  定位按钮的排放位置,  RB表示右下
  })
  // 发起定位请求
  geolocation.getCurrentPosition((status: any, result: any) => {
    console.log('定位的结果', status, result)
    if ('complete' == status) {
      // 记录初始定位位置
      if (!userLocation) {
        userLocation = result.position
      }
      // 把定位的结果设置成地图的中心点
      map.setCenter(result.position)
      // 添加标记点
      marker = new ObjAMap.Marker({
        position: result.position,
      })

      map.add(marker)
      map.addControl(geolocation)
      // 逆地理编码
      let geocoder = new ObjAMap.Geocoder({
        city: '010',
      })

      geocoder.getAddress(result.position, (cs: any, cr: any) => {
        console.log('逆地理编码的结果', cs, cr)
        if (cs != 'complete' || cr.info != 'OK') {
          loadingInfo.value = '逆地理编码失败！'
          return
        }
        let citycode = cr.regeocode.addressComponent.adcode
        // 初始化搜索控件
        searchControl = new ObjAMap.PlaceSearch({
          city: citycode,
          citylimit: true,
          pageSize: 5,
          pageIndex: 1,
          map: map,
          panel: 'divSsr',
          autoFitView: true,
        })
      })

      // 地图事件处理
      map.on('moveend', (ev: any) => {
        console.log('地图移动结束:', ev)
        // 将标记移动到地图中心点
        marker.setPosition(map.getCenter())
      })

      map.on('mapmove', () => {
        marker.setPosition(map.getCenter())
      })

      loadingInfo.value = '定位成功'
    } else {
      loadingInfo.value = '定位失败'
    }
  })
}

const initMap = () => {
  // 加载高德地图
  AMapLoader.load({
    key: '7e551514a777954fd1b634b7076afc79',
    version: '2.0',
    plugins: [
      'AMap.PlaceSearch',
      'AMap.Geocoder',
      'AMap.Geolocation',
      'AMap.Marker',
      'AMap.ToolBar',
      'AMap.Scale',
    ],
  })
    .then((AMap) => {
      ObjAMap = AMap
      map = new AMap.Map('map-container', {
        zoom: 15, // 初始化地图级别
      })
      map.addControl(
        new AMap.ToolBar({
          position: 'RT', //  定位按钮的排放位置
        })
      )
      map.addControl(
        new AMap.Scale({
          position: 'LB', //  定位按钮的排放位置
        })
      )
      loadingInfo.value = '地图加载成功'
      getlocation()
    })
    .catch((err) => {
      loadingInfo.value = '地图加载失败!'
      console.error('地图加载失败:', err)
    })
}

onMounted(initMap)

onUnmounted(() => {
  map?.destroy()
})
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  height: 100vh;
  flex-direction: column;
  > div:nth-of-type(1) {
    padding: 1rem;
  }
  > div:nth-of-type(2) {
    flex: 1;
  }
  > div:nth-of-type(3) {
    padding: 1rem;
  }
  #map-container {
    width: 100%;
    height: 100%;
  }
}
.search-box {
  display: flex;
  position: fixed;
  top: 1rem;
  right: 1rem;
}
</style>
