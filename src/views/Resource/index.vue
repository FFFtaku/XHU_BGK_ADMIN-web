<script setup lang="ts">
import { reactive, ref } from 'vue'
import { postInformationList, deleteInformation, putInformation } from '@api/apiResource'
import { ElMessage, ElMessageBox } from 'element-plus'
import { timeFormat } from '@utils/formatTools'
const informationListState = reactive<any>([])
const activeInformationTypeRef = ref(0)
const activeInformationStatusRef = ref(0)
const currentPage = ref(1)
const totalPage = ref(0)

const initInformation = async (informationType: number = 0, informationStatus: number = 0) => {
  const res = await postInformationList({
    pageNum: currentPage.value,
    pageSize: 10,
    informationType,
    informationStatus
  })
  informationListState.length = 0
  Object.assign(informationListState, res.rows)
  totalPage.value = res.total
  console.log(res)
}

initInformation(activeInformationTypeRef.value, activeInformationStatusRef.value)

const handleModifyResource = (resource: any) => {
  isShowModifyDialogRef.value = true
  modifyDataState.informationStatus = resource.informationStatus
  currentModifyingResourceIdRef.value = resource.informationId
}
const handleDeleteResource = (id: number) => {
  ElMessageBox.confirm(
    '是否要删除该资源？',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(async () => {
    const res = await deleteInformation({
      ids: [id]
    })
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    initInformation(activeInformationTypeRef.value, activeInformationStatusRef.value)
  }).catch()
}
const isShowModifyDialogRef = ref(false)
const modifyDataState = reactive({
  informationStatus: 0
})
const currentModifyingResourceIdRef = ref(0)
const handleExecModify = async () => {
  await putInformation({
    informationId: currentModifyingResourceIdRef.value,
    informationStatus: modifyDataState.informationStatus + ''
  }).catch()
  ElMessage({
    type: 'success',
    message: '修改状态成功'
  })
  isShowModifyDialogRef.value = false
  initInformation(activeInformationTypeRef.value, activeInformationStatusRef.value)
}

const handleCheckInformationType = (typeId: number) => {
  activeInformationTypeRef.value = typeId
  initInformation(activeInformationTypeRef.value, activeInformationStatusRef.value)
  currentPage.value = 1
}
const handleCheckInformationStatus = (statusId: number) => {
  activeInformationStatusRef.value = statusId
  initInformation(activeInformationTypeRef.value, activeInformationStatusRef.value)
  currentPage.value = 1
}

const handleSizeChange = (page: number) => {
  if (currentPage.value === page) {
    return
  } else {
    currentPage.value = page
    initInformation(activeInformationTypeRef.value, activeInformationStatusRef.value)

  }
}
</script>

<template>
  <div class="resource">
    <div class="tab-bar">
      <span :class="{ 'active-type': activeInformationTypeRef === 0 }" @click="handleCheckInformationType(0)">
        <h3>非官方库</h3>
      </span>
      <span class="separator"></span>
      <span :class="{ 'active-type': activeInformationTypeRef === 1 }" @click="handleCheckInformationType(1)">
        <h3>官方库</h3>
      </span>
    </div>
    <div class="side-bar">
      <span :class="{ 'active-status': activeInformationStatusRef === 0 }" @click="handleCheckInformationStatus(0)">
        <h4>待审核</h4>
      </span>
      <span :class="{ 'active-status': activeInformationStatusRef === 1 }" @click="handleCheckInformationStatus(1)">
        <h4>审核未通过</h4>
      </span>
      <span :class="{ 'active-status': activeInformationStatusRef === 2 }" @click="handleCheckInformationStatus(2)">
        <h4>审核通过</h4>
      </span>
    </div>
    <el-card style="margin-left: 45px;" shadow="hover" v-for="(item) in informationListState">
      <el-descriptions :column="4">
        <template #title>
          <el-tooltip placement="right" effect="light">
            <template #content>
              <el-card :body-style="{ padding: '0px' }">
                <img :src="item.informationCover" style="width: 150px; margin: auto; display: block;" fit="cover" />
                <div style="padding: 14px;text-align: center;">
                  <a :href="item.informationContent" target="block">查看资源</a>
                </div>
              </el-card>
            </template>
            <el-button link>
              <h2 style="font-weight: bold;">
                {{ item.informationName }}
              </h2>
            </el-button>
          </el-tooltip>
        </template>
        <el-descriptions-item label="所属学院">{{ item.collegeName }}</el-descriptions-item>
        <el-descriptions-item label="资源分类">
          <el-text type="primary">{{ item.informationCategory }}</el-text>
        </el-descriptions-item>
        <el-descriptions-item label="唯一编号">
          <el-text type="warning">{{ item.informationId }}</el-text>
        </el-descriptions-item>
        <el-descriptions-item label="操作">
          <el-button-group style="">
            <el-button @click="handleModifyResource(item)" size="small" type="info">
              <el-icon class="el-icon--right">
                <ArrowLeft />
              </el-icon>
              修改状态
            </el-button>
            <el-button @click="handleDeleteResource(item.informationId)" size="small" type="danger">
              删除
              <el-icon class="el-icon--right">
                <ArrowRight />
              </el-icon>
            </el-button>
          </el-button-group>
        </el-descriptions-item>
        <el-descriptions-item label="上传时间">
          <el-tag size="small">{{ timeFormat(item.createTime) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="上传用户" min-width="200px">
          <el-tag size="small">{{ item.createBy ? item.createBy : '非官方账户上传' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
          <el-tag size="small">{{ timeFormat(item.updateTime) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="更新用户" min-width="200px">
          <el-tag size="small">{{ item.updateBy ? item.updateBy : '非官方账户上传' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="资料类型" :span="2">
          <el-tag size="small" effect="dark">{{ item.informationType }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="审核状态" :span="2">
          <el-tag size="small" effect="dark">{{ item.informationStatus }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="pagination-block">
      <el-pagination :current-page="currentPage" layout="prev, pager, next" :total="totalPage"
        v-if="informationListState.length !== 0" @current-change="handleSizeChange" />
      <el-empty v-else description="没有数据喔" />
    </div>
    <el-dialog v-model="isShowModifyDialogRef" title="修改资源" width="30%" destroy-on-close center>
      <el-form :inline="true" :model="modifyDataState" class="demo-form-inline">
        <el-form-item label="状态">
          <el-select v-model="modifyDataState.informationStatus" placeholder="Select" size="large">
            <el-option :value="0" label="待审核">
              <el-tag size="small" type="warning" effect="dark">待审核</el-tag>
            </el-option>
            <el-option :value="1" label="审核未通过">
              <el-tag size="small" type="danger" effect="dark">审核未通过</el-tag>
            </el-option>
            <el-option :value="2" label="审核通过">
              <el-tag size="small" type="success" effect="dark">审核通过</el-tag>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShowModifyDialogRef = false">
            取消
          </el-button>
          <el-button type="primary" @click="handleExecModify">
            修改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.resource {
  .el-card {
    margin: 10px 0;
  }


  .pagination-block {
    display: flex;
    justify-content: center;
    margin-left: 45px;
  }

  .tab-bar {
    display: flex;
    padding: 2px 0 8px 45px;

    .active-type {
      color: black !important;
    }

    span {
      padding: 0 10px;
      cursor: pointer;
      align-self: center;
      color: gray;
      font-size: 1.2em;
    }


    .separator {
      border-left: 1px solid black;
      padding: 0;
      height: 25px;
      margin: 0 10px;
    }
  }

  .side-bar {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;

    .active-status {
      color: black !important;
      background-color: rgba(128, 128, 128, 0.423);
    }

    span {
      writing-mode: tb-rl;
      padding: 10px 0;
      color: grey;
      border: 0.5px solid black;
      cursor: pointer;
    }
  }
}
</style>