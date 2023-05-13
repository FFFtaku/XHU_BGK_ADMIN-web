<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MENU_LIST from '@constant/menuList'

const router = useRouter()
const route = useRoute()
// 根据权限显示菜单列表
const fixMenuList = computed(() => {
  console.log(activedMenu)
  return MENU_LIST
})

const activedMenu = ref('dashboard')

watch(() => route.path, (newPath, oldPath) => {
  const basePath = route.matched[0].path
  const item = fixMenuList.value.find((item) => {
    if (item.basePath === basePath) {
      return true
    }
  })
  activedMenu.value = item!.uniqueTag
}, { immediate: true });

// 控制菜单选中时高亮以及跳转对应router
const handleSelectMenu = (routerTo: string, mainTag: string, secondTag?: string) => {
  router.push({
    name: routerTo
  })
}
</script>

<template>
  <el-menu background-color="#fff" text-color="#000" :default-active="activedMenu" :unique-opened="true">
    <template v-for="(mainItem, mainIndex) in fixMenuList">

      <el-menu-item @click="handleSelectMenu(mainItem.routerName, mainItem.uniqueTag)" :index="mainItem.uniqueTag">
        <el-icon>
          <component :is="mainItem.icon" />
        </el-icon>
        <span>{{ mainItem.title }}</span>
      </el-menu-item>
    </template>

  </el-menu>
</template>

<style scoped lang="scss">
.el-menu {
  --bg-color: #1D242E !important;
  --active-color: #1D242E !important;
}
</style>