<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, Action, FormRules } from 'element-plus'
import { getRoleList } from '@api/apiRole'
import { postAdmin } from '@api/apiAdmin'
import {
  checkTelLegal,
  checkEmailLegal
} from '@utils/regCheck'

const formData = reactive({
  name: '',
  password: '',
  confirmPass: '',
  role: '',
  tel: '',
  email: ''
})
const formRef = ref<FormInstance>()

const openConfirm = () => {
  ElMessageBox.alert('请确认是否要创建新账户', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    showCancelButton: true,
    callback: (action: Action) => {
      if (action === 'confirm') {
        doRegister()
      }
    }
  })
}

const doRegister = () => {
  postAdmin({
    adminName: formData.name,
    adminPassword: formData.password,
    adminEmail: formData.email,
    adminTel: formData.tel,
    roleId: formData.role
  }).then(res => {
    ElMessage({
      type: 'success',
      message: '创建成功！'
    })
  }).catch((err) => {
    ElMessage({
      type: 'error',
      message: err
    })
  })
}

const handleRegister = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      openConfirm()
    } else {
      return false
    }
  })
}

const checkName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入用户名'))
  }
  callback()
}
const checkPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请设置密码'))
  }
  if (value.length < 6){
    return callback(new Error('请输入合法密码'))
  }
  callback()
}
const checkConfirmPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请确认密码'))
  }
  if (value !== formData.password) {
    return callback(new Error('请输入正确的密码'))
  }
  callback()
}
const checkTel = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请绑定手机号'))
  }
  if (!checkTelLegal(value)){
    return callback(new Error('请输入合法手机号'))
  }
  callback()
}
const checkRole = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请设置角色身份'))
  }
  callback()
}
const checkEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请绑定邮箱'))
  }
  if (!checkEmailLegal(value)){
    return callback(new Error('请输入合法邮箱号'))
  }
  callback()
}
const rules = reactive<FormRules>({
  name: [{ validator: checkName, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }],
  confirmPass: [{ validator: checkConfirmPass, trigger: 'blur' }],
  tel: [{ validator: checkTel, trigger: 'blur' }],
  role: [{ validator: checkRole, trigger: 'blur' }],
  email: [{ validator: checkEmail, trigger: 'blur' }]
})

const roleList = reactive([{
  roleId: 0,
  roleName: ''
}])
getRoleList(undefined).then(res => {
  Object.assign(roleList, res)
})

</script>

<template>
  <div class="account-create">
    <el-form ref="formRef" :label-position="'top'" label-width="100px" :model="formData" :rules="rules"
      style="max-width: 460px">
      <el-form-item label="账户名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-tag style="margin-bottom: 10px;" type="danger">密码大于等于6位</el-tag>
      <el-form-item label="确认密码" prop="confirmPass">
        <el-input v-model="formData.confirmPass" />
      </el-form-item>
      <el-form-item label="权限" prop="role">
        <el-select :disabled="roleList.length === 0" v-model="formData.role" placeholder="选择创建账户的角色">
          <el-option v-for="item in roleList" :label="item.roleName" :value="item.roleId" />
        </el-select>
        <el-tag v-if="roleList.length === 0" type="danger">必须获得角色身份信息后允许创建账户，请检查网络</el-tag>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="formData.tel" />
      </el-form-item>
      <el-form-item label="绑定邮箱" prop="email">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister(formRef)">创建账户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.account-create {
  padding: 30px;
  padding-top: 10px;

  .page-header-box {
    margin-bottom: 20px;


  }

  .el-button {
    margin-top: 20px;
    display: block;
    width: 100%;
    height: 40px;
  }
}
</style>