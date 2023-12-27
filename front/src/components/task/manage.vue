<script lang="ts" setup>
import {onMounted, ref} from "vue";

import {getTimeOutTask} from '../../api/task'
import {ElMessage} from "element-plus";
import {getApplyInfo, applyTaskSys} from '../../api/teacher'
import {useRouter} from "vue-router";
import {Search} from "@element-plus/icons-vue";

const router = useRouter()
const taskId = ref('')
const handleClick = (index) => {
  dialogTableVisible.value = true;
  taskId.value = tableData.value[index].taskId
  getApplyInfo(taskId.value)
      .then((response) => {
        gridData.value = response.data.data
        console.log(gridData.value)
      })
      .catch(() => {

      })
}

const handleClick2 = (index) => {
  const teaId = gridData.value[index].teaId
  console.log(gridData.value)
  router.push('/main/review/' + teaId)
}
const handleClick1 = (index) => {
  dialogTableVisible.value = true;
  const teaTaskId = gridData.value[index].teaTaskId
  applyTaskSys(teaTaskId)
      .then(() => {
        ElMessage({
          message: '成功',
          type: 'success',
        })
        getApplyInfo(taskId.value)
            .then((response) => {
              gridData.value = response.data.data
            })
      })
      .catch(() => {

      })
}

const tableData = ref([]);

const gridData = ref([])

const pageDate = ref({
  pageNumber: 1,
  pageSize: 5,
  academicTerm: '',
});

const total = ref(5);

const dialogTableVisible = ref(false);

const currentPage4 = ref(4)
const pageSize4 = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const input = ref('');


onMounted(() => {
  pageDate.value.academicTerm = '20232';
  getTimeOut()
})

function getTimeOut(){
  if(input.value !== '') {
    pageDate.value.academicTerm = input.value
  }
    getTimeOutTask(pageDate.value)
        .then((response) => {

          tableData.value = response.data.data.list
          total.value = response.data.data.total
        })
        .catch((error) => {
          console.log(error.data.data)
        })
}

function handleSizeChange(val: number) {
  pageDate.value.pageSize = val
  getApplyInfo(taskId.value)
      .then((response) => {
        gridData.value = response.data.data
      })
      .catch(() => {

      })
}

function handleCurrentChange(val: number) {
  pageDate.value.pageNumber = val
  getApplyInfo(taskId.value)
      .then((response) => {
        gridData.value = response.data.data
      })
      .catch(() => {

      })
}

</script>


<template>

  <el-dialog v-model="dialogTableVisible" title="选择老师">

    <template #header>
      <span>选择任务负责教师</span>
    </template>

    <el-table :data="gridData">
      <el-table-column property="courseCode" label="课程编号" width="100"/>
      <el-table-column property="collegeName" label="学院" width="100"/>
      <el-table-column property="username" label="姓名" width="100"/>
      <el-table-column property="courseName" label="课程" width="100"/>
      <el-table-column fixed="right" width="400">
        <template #default="scope">
          <el-button v-if="gridData[scope.$index].mark === 0" type="success" @click.prevent="handleClick1(scope.$index)">
            添加
          </el-button>
          <el-button v-if="gridData[scope.$index].mark === 1" type="info">
            已添加
          </el-button>
          <el-button type="info" @click.prevent="handleClick2(scope.$index)">历史实习任务任教情况</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  <el-card class="box-card">
    <template #header>
      <el-input
          v-model="input"
          class="w-50 m-2"
          placeholder="学期查询（20231"
          :suffix-icon="Search"
          style="width: 15%"
      />

      <el-button type="success" style="margin-left: 20px" @click="getTimeOut">查询</el-button>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="academicTerm" label="开设学期" width="150"/>
      <el-table-column prop="courseCode" label="课程编号" width="120"/>
      <el-table-column prop="courseName" label="课程名称" width="120"/>
      <el-table-column prop="courseCategory" label="课程类别" width="120"/>
      <el-table-column prop="creditHours" label="学分" width="100"/>
      <el-table-column prop="className" label="班级" width="120"/>
      <el-table-column prop="studentCount" label="学生人数" width="120"/>
      <el-table-column prop="startWeek" label="起始周" width="120"/>
      <el-table-column fixed="right" width="180">
        <template #default="scope">
          <el-button type="success" @click="handleClick(scope.$index)">选择任务负责老师</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    分页查询-->
    <template #footer>
      <div class="demo-pagination-block">
        <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[5, 10, 15, 20]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total=total
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </template>
  </el-card>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100vw;
}
</style>
