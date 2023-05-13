<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getCollegeList, putCollege, deleteCollege, postCollege } from '@api/apiInstitute'
import { ElMessage, ElMessageBox } from 'element-plus'

let collegeList = reactive([])
const initCollegeList = () => {
  getCollegeList(undefined).then(res => {
    collegeList.length = 0
    Object.assign(collegeList, res)
  }).catch()
}
initCollegeList()


const isShowOpDialog = ref(false)
// currentOp 0修改学院 | 1删除学院
const currentOp = ref(0)
const currentOpTag = ref('')
const currentOpId = ref(0)
const fixValue = ref('')
const fixValueError = ref('')
const handleEdit = (opType: number, row: any) => {
  currentOp.value = opType
  currentOpTag.value = row.collegeName
  currentOpId.value = row.collegeId
  isShowOpDialog.value = true
}

const handleDelete = (opType: number, row: any) => {
  currentOp.value = opType
  currentOpTag.value = row.collegeName
  currentOpId.value = row.collegeId
  isShowOpDialog.value = true
}
const handleExecOp = () => {
  if (currentOp.value === 0) {
    if (fixValue.value === '') {
      fixValueError.value = '学院名不能为空'
      return
    }
    putCollege({
      collegeId: currentOpId.value,
      collegeName: fixValue.value
    }).then(res => {
      initCollegeList()
      ElMessage({
        type: 'success',
        message: '修改成功！'
      })
    }).catch()
  } else {
    console.log([currentOpId.value])
    deleteCollege({
      ids: [currentOpId.value]
    }).then(res => {
      initCollegeList()
      ElMessage({
        type: 'success',
        message: '删除成功！'
      })
    }).catch()
  }
  isShowOpDialog.value = false
}
const handleFixBlur = () => {
  if (fixValue.value === '') {
    return fixValueError.value = '学院名不能为空'
  }
  fixValueError.value = ''
}
const handleAddCollege = () => {
  ElMessageBox.prompt(
    '学院名称', '添加新的学院', {
    confirmButtonText: '添加',
    cancelButtonText: '取消',
    inputErrorMessage: '学院名不能为空',
    inputPattern: /^.+$/
  }
  ).then(res => postCollege({
    collegeName: res.value
  })
  ).then(res => {
    initCollegeList()
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
  }).catch()
}

</script>

<template>
  <div class="institute-info">
    <el-table :data="collegeList" height="100%" stripe style="width: 100%">
      <el-table-column prop="collegeName" label="学院名称" />
      <el-table-column prop="createBy" label="创建者" width="100px" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateBy" label="更新者" width="100px" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作">
        <template #default="scope" width="200px">
          <el-button size="small" @click="handleEdit(0, scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(1, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <template #append>
        <el-button class="add-btn" type="primary" plain @click="handleAddCollege">添加学院</el-button>
      </template>
    </el-table>

    <!-- 修改或删除模板 -->
    <el-dialog v-model="isShowOpDialog" :title="currentOp === 0 ? '修改学院信息' : '确认删除学院'">
      <div v-if="currentOp === 0">
        <h3 style="padding: 15px 0;">{{ currentOpTag }}：</h3>
        <el-form-item label="学院名称" :error="fixValueError">
          <el-input @blur="handleFixBlur" v-model="fixValue" placeholder="输入要修改的名称" />
        </el-form-item>
      </div>
      <h3 v-else>确定是否需要删除<span style="color: red;">{{ currentOpTag }}</span>及其所属信息</h3>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShowOpDialog = false">取消</el-button>
          <el-button type="primary" @click="handleExecOp">
            {{ currentOp === 0 ? '修改' : '删除' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.institute-info {
  height: calc(100vh - $header-height - ($el-main-default-padding * 2));

  .add-btn {
    width: 400px;
    margin: 15px auto;
    display: block;

  }
}
</style>