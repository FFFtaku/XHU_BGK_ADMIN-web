<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

</script>

<template>
  <div class="app">
    <ElConfigProvider :locale="zhCn">
      <RouterView></RouterView>
    </ElConfigProvider>
  </div>
</template>

<style scoped lang="scss">
.app{
  min-width: 1280px;
}
</style>
