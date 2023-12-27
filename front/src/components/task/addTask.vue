<script lang="ts" setup>

import {computed, ref} from "vue";
import {AddRelevance, addTask, getTasks} from '../../api/task.js';
import {ElMessage} from "element-plus";

/**
  任务信息
 **/
const info = ref({
  academicTerm: '',
  courseCode: '',
  courseName: '',
  courseCategory: '',
  creditHours: '',
  className: '',
  studentCount: '',
  startWeek: '',
  requirements: '',
  remarks: '',
  applicationDeadline: '',
})
/**
 报错弹出框
 **/
const dialogVisible = ref(false)
/**
 *报错信息
 */
const errorMessage = ref('');
/**
 *
 * 传输关联任务数据
 */
const data = ref({});

/**
 *关联任务函数
 */
function addRelevance(academicTerm, courseName, courseCategory){
    if(academicTerm === '') {
        dialogVisible.value = true;
        errorMessage.value = "开设学期不能为空"
    } else if(courseName === '') {
        dialogVisible.value = true;
      errorMessage.value = "课程名称不能为空"
    } else if(courseCategory === '') {
        dialogVisible.value = true;
      errorMessage.value = "课程类别不能为空"
    } else {
       data.value = {
          academicTerm: academicTerm,
          courseName: courseName,
         courseCategory: courseCategory
       }
       console.log(data.value);

       AddRelevance(data.value)
           .then(response =>{
            console.log(response.data.data)
             if(response.data.data === null) {
               ElMessage({
                 message: '没有查到相关任务',
                 type: 'warning',
               })
             } else {
               ElMessage({
                 message: '添加关联任务成功',
                 type: 'success',
               })
               info.value.creditHours = response.data.data.creditHours;
               info.value.className = response.data.data.className;
               info.value.studentCount = response.data.data.studentCount;
               info.value.startWeek = response.data.data.startWeek;
               info.value.requirements = response.data.data.requirements;
               info.value.remarks = response.data.data.remarks;
               info.value.applicationDeadline = response.data.data.applicationDeadline;
             }

           })
           .catch(error => {
            console.log("error")
       })
    }
}

/**
 * 添加任务函数（完成）
 */
function addInfo(){
    addTask(info.value)
        .then(() => {
            clearInfo();

          ElMessage({
            message: '添加成功',
            type: 'success',
          })

        }) .catch((error) => {
        ElMessage.error('添加失败')
    })
}

/**
 * 添加后清空信息
 */
function clearInfo(){
  info.value.applicationDeadline = '';
  info.value.requirements = '';
  info.value.studentCount = '';
  info.value.className = '';
  info.value.courseCode = '';
  info.value.courseCategory = '';
  info.value.remarks = '';
  info.value.academicTerm = '';
  info.value.creditHours = '';
  info.value.startWeek = '';
  info.value.courseName = '';
}

</script>

<template>

  <el-dialog
      v-model="dialogVisible"
      title="错误关联"
      width="30%"
      :before-close="handleClose"
  >
    <span style="color: red">{{ errorMessage }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false; errorMessage = ''">关闭</el-button>
      </span>
    </template>
  </el-dialog>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>发布任务</span>
          <el-button type="info" @click="addRelevance(info.academicTerm, info.courseName, info.courseCategory)">添加关联任务</el-button>
          <el-button type="success" @click="addInfo()">添加</el-button>
        </div>
      </template>
      <el-form :inline="true" :model="info"
               label-width="100px"
               class="demo-form-inline">
        <el-form-item label="开设学期">
          <el-input v-model="info.academicTerm" />
        </el-form-item>
        <el-form-item label="课程编号">
          <el-input v-model="info.courseCode" />
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="info.courseName" />
        </el-form-item>
        <el-form-item label="课程类别">
          <el-select v-model="info.courseCategory" placeholder="课程类别">
            <el-option label="普通课" value="普通课" />
            <el-option label="外语类课" value="外语类课" />
            <el-option label="体育类课程、艺术类课程" value="体育类课程、艺术类课程" />
            <el-option label="翔宇创新精英班课程" value="翔宇创新精英班课程" />
            <el-option label="翔宇竞赛实验班课程" value="翔宇竞赛实验班课程" />
          </el-select>
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="info.creditHours" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="info.className" />
        </el-form-item>
        <el-form-item label="学生人数">
          <el-input v-model="info.studentCount" />
        </el-form-item>
        <el-form-item label="起始周">
          <el-input v-model="info.startWeek" />
        </el-form-item>
        <el-form-item label="具体要求">
          <el-input v-model="info.requirements" type="textarea"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="info.remarks" type="textarea"/>
        </el-form-item>
        <el-form-item label="任务报名截至日期">
          <el-date-picker
              v-model="info.applicationDeadline"
              type="date"
              placeholder="选择时间"
              clearable
          />
        </el-form-item>
      </el-form>
    </el-card>

</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.box-card {
  width: 100vw;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
