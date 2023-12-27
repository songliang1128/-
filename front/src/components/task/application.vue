<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue";
import { Search } from '@element-plus/icons-vue'
import {application, getTasksByTerm} from '../../api/application'
import {ElMessage} from "element-plus";

const tableData = ref([])


const input = ref('');


const currentPage4 = ref(4)
const pageSize4 = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const pageDate = ref({
  pageNumber: 1,
  pageSize: 5,
  academicTerm: '20232',
  courseName: '',
});

const total = ref();

onMounted(() => {
  getTasks()
})

const handleSizeChange = (val: number) => {
  pageDate.value.pageSize = val;
  getTasks()
}

const handleCurrentChange = (val: number) => {
  pageDate.value.pageNumber = val;
  getTasks()
}

/**
 * 分页查询函数
 */
function getTasks(){
  pageDate.value.courseName = input.value
    getTasksByTerm(pageDate.value)
        .then((response) => {
          tableData.value = response.data.data.list
          total.value = response.data.data.total
          console.log(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
      input.value = '';
}

/**
 * 获取当前序号并报名
 * @param index
 */
const handleClick = (index) => {
  const taskId = tableData.value[index].taskId;
  console.log(taskId)
  application(taskId)
      .then((response) => {
        ElMessage({
          message: '报名成功',
          type: 'success',
        })
        location.reload();
      })
}
</script>



<template>
  <el-card class="box-card">
    <template #header>
      <el-input
          v-model="input"
          class="w-50 m-2"
          placeholder="根据课程名称查询"
          :suffix-icon="Search"
          style="width: 15%"
      />

      <el-button type="success" style="margin-left: 20px" v-model="pageDate.academicTerm" @click="getTasks">查询</el-button>
    </template>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="academicTerm" label="开设学期" width="150" />
      <el-table-column prop="courseCode" label="课程编号" width="120" />
      <el-table-column prop="courseName" label="课程名称" width="120" />
      <el-table-column prop="courseCategory" label="课程类别" width="120" />
      <el-table-column prop="creditHours" label="学分" width="100" />
      <el-table-column prop="className" label="班级" width="120" />
      <el-table-column prop="studentCount" label="学生人数" width="120" />
      <el-table-column prop="startWeek" label="起始周" width="120" />
      <el-table-column prop="applicationDeadline" label="任务报名截至日期" width="180" />
      <el-table-column fixed="right"  width="120">
        <template #default="scope">
          <el-button type="success" @click.prevent="handleClick(scope.$index)">报名</el-button>
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
