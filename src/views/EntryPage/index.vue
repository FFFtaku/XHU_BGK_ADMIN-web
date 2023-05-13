<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { postLogin } from '@api/apiLogin'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const loginData = reactive({
  name: '',
  password: ''
})

const handleBasicLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      postLogin({
        adminName: loginData.name,
        adminPassword: loginData.password
      }).then(res => {
        ElMessage({
          type: 'success',
          message: '登录成功'
        })
        router.push({
          name: 'dashboard'
        })
      }).catch(err => {
        ElMessage({
          type: 'error',
          message: err
        })
      })
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
    return callback(new Error('请输入密码'))
  }
  callback()
}
const rules = reactive<FormRules>({
  name: [{ validator: checkName, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }]
})

</script>

<template>
  <div class="entry-page">
    <img class="img1" src="@assets/image/login-bg.png" alt="">
    <img class="img2" src="@assets/image/login-logo.png" alt="">
    <div class="title">
      <div>欢迎使用</div>
      <div>西瓜不挂科服务管理系统</div>
    </div>
    <div class="tag">
      管理员账户需要内部申请创建
      <div>请联系管理员创建</div>
    </div>
    <div class="form">
      <el-form :label-position="'top'" label-width="100px" :rules="rules" :model="loginData" ref="formRef"
        style="width: 300px">
        <el-form-item label="您的账户" prop="name">
          <el-input v-model="loginData.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginData.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleBasicLogin(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="center">
        <span class="form-sub">
          由西瓜不挂科开发团队提供技术支持
        </span>
      </el-divider>
    </div>

  </div>
</template>

<style scoped lang="scss">
.entry-page {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  min-width: 1280px;
  font-family: Arial, Helvetica, sans-serif;

  .img1 {
    position: absolute;
    left: 50%;
    transform: translateX(-80%);
    height: 100%;

  }

  .img2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
  }

  .title {
    position: absolute;
    top: 100px;
    font-size: 40px;
    padding: 30px 100px;

  }

  .tag {
    position: absolute;
    bottom: 30%;
    padding: 30px 100px;
    font-size: 15px;

    div {
      color: #6916FF;
    }
  }

  .form {
    width: 470px;
    position: absolute;
    top: 30%;
    right: 20px;
    margin-right: 100px;

    .el-form {
      margin: auto;
    }

    .el-button {
      width: 400px;
      background-color: #6916FF;
      margin: 30px;
    }

    .form-sub {
      font-size: 10px;
      opacity: .6;
    }
  }
}
</style>