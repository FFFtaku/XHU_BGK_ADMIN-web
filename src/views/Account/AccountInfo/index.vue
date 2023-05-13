<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getAdminList, getAdmin } from '@api/apiAdmin'
import { timeFormat } from '@utils/formatTools'

getAdminList({
  pageNum: 1,
  pageSize: 10
}).then(res => {
  Object.assign(adminList, res.rows.map((item: any) => {
    item.createTime = timeFormat(item.createTime)
    item.updateTime = timeFormat(item.updateTime)
    return item
  }))
})
const adminList = reactive([
  {
    adminAvatar: '',
    adminEmail: '123123',
    adminName: '12132132',
    createTime: '123123',
    updateTime: '12312',
    adminTel: '10000000000',
    adminStatus: '正常',
    adminId: ''
  }
])

const isDetailInfoShow = ref(false)
const adminDetail = reactive({
  adminAvatar: '',
  adminEmail: '123123',
  adminName: '12132132',
  createTime: '123123',
  updateTime: '12312',
  adminTel: '10000000000',
  adminStatus: '正常',
  adminId: '',
  createBy: '',
  updateBy: '',
  adminSex: '',
  perms: [],
  role: '',
  uploadInformation: {}
})
const handleOpenAdminDetail = (adminId: string) => {
  isDetailInfoShow.value = true
  getAdmin({
    adminId
  }).then(res => {
    res.createTime = timeFormat(res.createTime)
    res.updateTime = timeFormat(res.updateTime)
    Object.assign(adminDetail, res)
  })
}

</script>

<template>
  <div class="account-info">
    <div class="card" v-for="(item) in adminList">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-avatar :size="30" :src="item.adminAvatar" />
            <span class="account-name">账户：{{ item.adminName }}</span>
            <el-button class="button" type="primary" @click="handleOpenAdminDetail(item.adminId)" plain>详细信息</el-button>
          </div>
        </template>
        <el-descriptions :column="4" direction="vertical" border>
          <el-descriptions-item label="账户邮箱" width="250px">{{ item.adminEmail }}</el-descriptions-item>
          <el-descriptions-item label="账户状态" width="250px">
            <el-tag size="small">{{ item.adminStatus }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="绑定手机号" :span="2">{{ item.adminTel }}</el-descriptions-item>
          <el-descriptions-item label="创建时间" :span="2">
            <el-tag size="small">{{ item.createTime }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="更新时间" :span="2">
            <el-tag size="small">{{ item.updateTime }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

    </div>


    <el-drawer v-model="isDetailInfoShow" size="800">
      <template #header>
        <h2>详细信息</h2>
      </template>
      <div class="detail-content">
        <div class="detail-avatar">
          <el-avatar :size="50" :src="adminDetail.adminAvatar" />
          <span class="account-name">账户：{{ adminDetail.adminName }}</span>
        </div>
        <el-descriptions :column="4" direction="vertical" border>

          <!-- 第一排展示 -->
          <el-descriptions-item label="账户邮箱" :span="2" width="200px">{{ adminDetail.adminEmail }}</el-descriptions-item>
          <el-descriptions-item label="绑定手机号" :span="2">{{ adminDetail.adminTel }}</el-descriptions-item>
          <!-- 第二排展示 -->
          <el-descriptions-item label="创建时间" width="200px">
            <el-tag size="small" type="info">{{ adminDetail.createTime }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建人" width="200px">
            <el-tag size="small">{{ adminDetail.createBy }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="更新时间" width="200px">
            <el-tag size="small" type="info">{{ adminDetail.updateTime }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="操作人" width="200px">
            <el-tag size="small">{{ adminDetail.updateBy }}</el-tag>
          </el-descriptions-item>

          <!-- 第三排展示 -->

          <el-descriptions-item label="账号角色" :span="2">
            <el-tag size="small">{{ adminDetail.role }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="账号状态" :span="2">
            <el-tag size="small" type="success">{{ adminDetail.adminStatus }}</el-tag>
          </el-descriptions-item>

          <!-- 账号权限展示 -->
          <el-descriptions-item label="权限" :span="2">
            <div>
              <div v-for="(item) in adminDetail.perms" style="color: #097109;">
                {{ item }}
              </div>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="资源上传记录" :span="2">
            <el-button type="primary" plain style="display: block; margin: auto;">跳转至资料详情页</el-button>
          </el-descriptions-item>
        </el-descriptions>

      </div>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.account-info {
  padding: 10px;

  .card {
    margin-bottom: 15px;

    .card-header {
      font-weight: bold;
      display: flex;
      align-items: center;

      .account-name {
        margin-left: 10px;
      }

      .button {
        position: absolute;
        right: 10px;
      }
    }
  }

  .detail-content {

    .detail-avatar {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 1.2em;
      transform: translateY(-20px);

      .el-avatar {
        margin-right: 20px;
      }
    }
  }
}
</style>