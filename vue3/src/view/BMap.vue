<template>
  <div class="mian">
    <div>百度地图</div>
    <div>
      <div id="map-container"></div>
    </div>
    <div>加载</div>
  </div>
</template>

<script lang="ts" setup>


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
</style>
