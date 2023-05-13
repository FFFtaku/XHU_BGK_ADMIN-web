<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import {
  getRoleList,
  postRole,
  putRole,
  deleteRole
} from '@api/apiRole'
import { getMenuList } from '@api/apiPrivilege'
import { timeFormat } from '@utils/formatTools'
import { ElMessage, ElMessageBox } from 'element-plus'

const roleListState = reactive<any>([])
const initRoleList = async () => {
  const res = await getRoleList(undefined).catch()
  roleListState.length = 0
  Object.assign(roleListState, res)
  console.log(res)
}
initRoleList()

const privilegeListState = reactive<any>([])
const initPrivilegeList = async () => {
  const res = await getMenuList(undefined).catch()
  privilegeListState.length = 0
  Object.assign(privilegeListState, res)
  console.log(res)
}
initPrivilegeList()

const handleDeleteRole = async (roleId: number) => {

  ElMessageBox.confirm(
    '是否要删除该角色？',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(async () => {
    await deleteRole({
      ids: [roleId]
    })
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    initRoleList()
  }).catch()
}
const handleModifyRole = (roleItem: any) => {
  currentOpTypeRef.value = 0
  isShowModifyRoleRef.value = true
  Object.assign(modifyDataState, roleItem)
  currentModifyRoleIdRef.value = roleItem.roleId
  const oldPermsValue = roleItem.perms.map((_: any) => {
    return _.menuId
  })
  oldRightValue.value = oldPermsValue
  alternativeRightValue.value = oldPermsValue
  modifyDataState.menuIds = oldPermsValue
}

const isShowModifyRoleRef = ref(false)
const currentModifyRoleIdRef = ref(0)
const modifyDataState = reactive({
  roleName: '',
  roleKey: '',
  roleStatus: 0,
  menuIds: [] as Array<number>
})


const privilegeList = computed(() => {
  const _privilegeList: any = []
  privilegeListState.forEach((item: any) => {
    _privilegeList.push({
      label: item.menuName,
      key: item.menuId
    })
  })
  return _privilegeList
})


const alternativeRightValue = ref([])
const oldRightValue = ref([])
const handleRightChange = (checkedItem: any) => {
  modifyDataState.menuIds = checkedItem
}

const handleExecModifyRole = async (currentOpType: number) => {
  if (currentOpType === 1) {
    if (!(modifyDataState.roleName && modifyDataState.roleKey)) {
      return ElMessage({
        type: 'error',
        message: '角色称（中）和角色称（英）不能为空'
      })
    }
    await postRole({
      roleName: modifyDataState.roleName,
      roleKey: modifyDataState.roleKey,
      menuIds: modifyDataState.menuIds
    }).catch()
    ElMessage({
      type: 'success',
      message: '新建成功'
    })
    initRoleList()
    isShowModifyRoleRef.value = false
    return
  }
  await putRole({
    roleId: currentModifyRoleIdRef.value,
    roleName: modifyDataState.roleName,
    roleKey: modifyDataState.roleKey,
    roleStatus: modifyDataState.roleStatus,
    menuIds: modifyDataState.menuIds
  }).catch()
  ElMessage({
    type: 'success',
    message: '修改成功'
  })
  initRoleList()
  isShowModifyRoleRef.value = false
}
const currentOpTypeRef = ref(0)
const emptyModifyData = {
  roleName: '',
  roleKey: '',
  menuIds: [],
  roleStatus: 0
}
const handleAddRole = () => {
  currentOpTypeRef.value = 1
  isShowModifyRoleRef.value = true
  alternativeRightValue.value = []
  oldRightValue.value = []
  Object.assign(modifyDataState, emptyModifyData)
}
</script>

<template>
  <div class="role-setting">
    <el-descriptions direction="vertical" style="padding: 10px;" border size="small" :column="4"
      v-for="(item) in roleListState">
      <el-descriptions-item label="角色称（中）">{{ item.roleName }}</el-descriptions-item>
      <el-descriptions-item label="角色称（英）">{{ item.roleKey }}</el-descriptions-item>
      <el-descriptions-item label="角色状态" :span="2">
        <el-text v-if="item.roleStatus === 0" type="primary">正常</el-text>
        <el-text v-else type="danger">禁用</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间" min-width="180px">
        <el-text type="warning">{{ timeFormat(item.createTime) }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="创造人">
        <el-text type="warning">{{ item.createBy }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="更新时间" min-width="180px">
        <el-text type="warning">{{ timeFormat(item.updateTime) }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="更新人" min-width="50px">
        <el-text type="warning">{{ item.updateBy }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="更新" :span="2" min-width="50px">
        <el-button size="small" type="primary" @click="handleModifyRole(item)">
          修改角色信息
        </el-button>
      </el-descriptions-item>
      <el-descriptions-item label="删除" :span="2" min-width="50px">
        <el-button size="small" type="warning" @click="handleDeleteRole(item.roleId)">
          删除{{ item.roleName }}
        </el-button>
      </el-descriptions-item>
    </el-descriptions>
    <el-button style="display: block;width: 300px;margin: auto;" class="add-btn" type="primary" plain
      @click="handleAddRole">添加角色</el-button>

    <el-dialog v-model="isShowModifyRoleRef" :title="`${currentOpTypeRef === 0 ? '修改' : '添加'}角色信息`" width="600px">
      <el-form label-position="left" label-width="100px" :model="modifyDataState" style="max-width: 460px">
        <el-form-item label="角色称">
          <el-input v-model="modifyDataState.roleName" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="modifyDataState.roleKey" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="modifyDataState.roleStatus" placeholder="Select" size="large"
            :disabled="currentOpTypeRef !== 0">
            <el-option :value="0" label="正常">
              <el-tag size="small" type="success" effect="dark">正常</el-tag>
            </el-option>
            <el-option :value="1" label="禁用">
              <el-tag size="small" type="danger" effect="dark">禁用</el-tag>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限"></el-form-item>
      </el-form>
      <div class="transfer-box">
        <el-transfer style="width: 600px;" v-model="alternativeRightValue" :data="privilegeList"
          @right-check-change="handleRightChange" :right-default-checked="oldRightValue" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShowModifyRoleRef = false">取消</el-button>
          <el-button type="primary" @click="handleExecModifyRole(currentOpTypeRef)">
            {{ currentOpTypeRef === 0 ? '修改' : '添加' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.role-setting {
  .el-descriptions {
    .el-button {
      display: block;
      margin: 4px auto;
    }
  }

  .transfer-box {
    :deep(.el-checkbox__label) {
      width: 100%;
    }

  }
}
</style>