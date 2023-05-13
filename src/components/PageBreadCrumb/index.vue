<script setup lang="ts">
import BREAD_CRUMB_LIST from '@constant/breadCrumb'
import { ref, watch, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const breadList: any = reactive([])
const currentIndex = ref(0)
const handleCheckPage = (index: number, routerTo: string) => {
  router.push({
    name: routerTo
  })
  currentIndex.value = index
}
watch([() => route.name], (newPath) => {
  const isRecheckBreadCrumbList = breadList.findIndex((item:any)=>{
    if(item.routerName === newPath[0]){
      return true
    }
  })
  if(isRecheckBreadCrumbList !== -1){
    return
  }
  for (const key in BREAD_CRUMB_LIST) {
    for (const index in BREAD_CRUMB_LIST[key]) {
      if (BREAD_CRUMB_LIST[key][index].routerName === newPath[0]) {
        Object.assign(breadList, BREAD_CRUMB_LIST[key])
        currentIndex.value = parseInt(index)
        return
      }
    }
  }
  breadList.length = 0
}, { immediate: true });
</script>

<template>
  <div class="page-bread-crumb" v-if="breadList.length">
    <div v-for="(item, index) in breadList" class="item">
      <span class="title" :class="{ 'active': currentIndex === index }" @click="handleCheckPage(index, item.routerName)">
        {{ item.childPageName }}
      </span>
      <span class="separator" v-if="index !== breadList.length - 1">
        |
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-bread-crumb {
  padding: 10px 30px;
  display: flex;

  .item {
    margin: 0;
    display: flex;

    .title {
      font-size: 1.2em;
      cursor: pointer;
    }

    .separator {
      padding-top: 3px;
    }

    span {
      margin-left: 15px;
    }

    .active {
      font-weight: bold;
    }
  }
}
</style>