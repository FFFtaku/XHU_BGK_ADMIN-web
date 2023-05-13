<script setup lang="ts">
import { reactive, ref } from 'vue'
import UploadWidget from '@components/UploadWidget/index.vue'
import { uploadInformation } from '@api/apiResource'
import { getCollegeList } from '@api/apiInstitute'
import type { UploadRequestOptions, FormInstance, FormRules } from 'element-plus'
import type { AxiosProgressEvent } from 'axios'

// 获取学院信息
let collegeList = reactive<any>([])
const initCollegeList = () => {
  getCollegeList(undefined).then(res => {
    collegeList.length = 0
    Object.assign(collegeList, res)
  }).catch()
}
initCollegeList()

/**
 * uploadWidget项
 */
const uploadWidgetRef = ref()
// 点击发送按钮触发表单验证和请求发送
const onSubmit = () => {
  formRef.value!.validate((valid) => {
    if (valid) {
      uploadWidgetRef.value.execUpload()
    }
  })
}
// 自定义文件上传请求，execUpload方法执行后会调el-upload内置方法进而调用该函数发送请求
const uploadRequest = (options: UploadRequestOptions) => {
  return uploadInformation({
    informationName: metaData.informationName,
    collegeId: metaData.collegeId,
    informationCategory: metaData.informationCategory,
    informationContent: options.file
  }, {
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      const rate = progressEvent.loaded / (progressEvent.total as number) * 100
      options.onProgress({ percent: rate } as any)
    }
  })
}
const fileStatusChanged = (file: any) => {
  if (file.status === 'fail') {
    console.log('fail')
  } else if (file.status === 'success') {
    console.log('success')
  }
}

/**
 * 表单项
 */
const metaData = reactive({
  informationName: '',
  collegeId: '' as unknown as number,
  informationCategory: '' as unknown as number
})
const formRef = ref<FormInstance>()
const checkInformationName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('需要设置资料名称'))
  }
  callback()
}
const checkCollegeId = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请选择所属学院'))
  }
  callback()
}
const checkInformationCategory = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请选择资料类型'))
  }
  callback()
}
const rules = reactive<FormRules>({
  informationName: [{ validator: checkInformationName }],
  collegeId: [{ validator: checkCollegeId }],
  informationCategory: [{ validator: checkInformationCategory }]
})
const handleResetValid = (name: string) => {
  formRef.value!.clearValidate(name)
}
</script>

<template>
  <div class="upload">
    <el-form :rules="rules" ref="formRef" :inline="true" :model="metaData">
      <el-form-item label="资料名" prop="informationName">
        <el-input v-model="metaData.informationName" :validate-event="false"
          @blur="handleResetValid('informationName')" />
      </el-form-item>
      <el-form-item label="所属学院" prop="collegeId">
        <el-select v-model="metaData.collegeId" :validate-event="false" @blur="handleResetValid('collegeId')">
          <el-option v-for="(item) in collegeList" :label="item.collegeName" :value="item.collegeId" />
        </el-select>
      </el-form-item>
      <el-form-item label="资料分类" prop="informationCategory">
        <el-select v-model="metaData.informationCategory" :validate-event="false"
          @blur="handleResetValid('informationCategory')">
          <el-option label="作业" :value="0" />
          <el-option label="背诵" :value="1" />
          <el-option label="练习题" :value="2" />
          <el-option label="期末试卷" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
      </el-form-item>
    </el-form>
    <UploadWidget ref="uploadWidgetRef" :uploadRequest="uploadRequest" :statusChanged="fileStatusChanged"></UploadWidget>

  </div>
</template>

<style scoped lang="scss"></style>