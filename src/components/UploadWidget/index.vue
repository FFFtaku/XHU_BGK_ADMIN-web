<script setup lang="ts">
import { ref } from 'vue'
import type { UploadRequestOptions, UploadInstance, UploadFile } from 'element-plus'

const props = withDefaults(defineProps<{
  uploadRequest: (options: UploadRequestOptions) => Promise<any>,
  statusChanged?: (uploadFile: UploadFile) => void
}>(), {})

const uploadRef = ref<UploadInstance>()

const handleExecUpload = (options: UploadRequestOptions) => {
  return props.uploadRequest(options)
}
const handleStatusChanged = (uploadFile: UploadFile) => {
  props.statusChanged?.(uploadFile)
}
const execUpload =()=>{
  uploadRef.value!.submit()
}
defineExpose({
  execUpload
})
</script>

<template>
  <div class="upload-widget">
    <el-upload class="upload-demo" drag :auto-upload="false" :multiple="true" :http-request="handleExecUpload"
      @change="handleStatusChanged" action="/" ref="uploadRef">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽文件以上传 <em>或点击此处选择文件</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          单体文件需小于10MB
        </div>
      </template>
    </el-upload>
  </div>
</template>

<style scoped lang="scss"></style>