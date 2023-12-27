<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import {getTodoTask, getData, intoTask} from '../../api/teacher.js'
import {ElMessage} from "element-plus";

const index1 = ref()

const handleClick = (index) => {
  index1.value = tableData.value[index].taskId
  pageDate.value.taskId = index1.value
  pageDate.value.term = tableData.value[index].academicTerm

  dialogTableVisible.value = true;
  getUserData();
}

const tableData = ref([]);

const gridData = ref([])


const handleClick1 = (index) => {
  const taskId = index1.value
  const teaId = gridData.value[index].id
  intoTask(taskId, teaId)
      .then(() => {
        ElMessage({
          message: '添加关联任务成功',
          type: 'success',
        })
      })
}

const pageDate = ref({
  pageNumber: 1,
  pageSize: 5,
  username: '',
  taskId: '',
  term: '',
})

const total = ref(0)

const input = ref('');
const dialogTableVisible = ref(false);
const currentPage4 = ref(4)
const pageSize4 = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  pageDate.value.pageSize = val;
}

const handleCurrentChange = (val: number) => {
  pageDate.value.pageNumber = val;
}

function getUserData(){
    getData(pageDate.value)
        .then((response) => {
          console.log(response.data)
          gridData.value = response.data.data.list
          total.value = response.data.data.total
          console.log(gridData.value)
        })
}

function getTodo(){
    getTodoTask()
        .then((response) => {
          tableData.value = response.data.data
        }).catch(() => {
          console.log(123)
    })
}

onMounted(() => {
    getTodo()
})

function GetInfo(){
    pageDate.value.username = input.value;
  getUserData();
}

</script>


<template>

  <el-dialog v-model="dialogTableVisible" title="选择老师" >
    <template #header>
      <el-input
          v-model="input"
          class="w-50 m-2"
          placeholder="教师姓名查询"
          :suffix-icon="Search"
          style="width: 20%"
      />

      <el-button type="success" style="margin-left: 20px" @click="GetInfo">查询</el-button>
    </template>
    <el-table :data="gridData">
      <el-table-column property="id" label="编号" width="150" />
      <el-table-column property="collegeName" label="学院" width="200" />
      <el-table-column property="username" label="姓名" />
      <el-table-column fixed="right"  width="120">
        <template #default="scope">
          <el-button type="success" @click.prevent="handleClick1(scope.$index)">添加</el-button>
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
  </el-dialog>

  <el-card class="box-card" style="width: 70vw;">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="academicTerm" label="开设学期" width="150" />
      <el-table-column prop="courseCode" label="课程编号" width="120" />
      <el-table-column prop="courseName" label="课程名称" width="120" />
      <el-table-column prop="courseCategory" label="课程类别" width="120" />
      <el-table-column prop="creditHours" label="学分" width="100" />
      <el-table-column prop="className" label="班级" width="120" />
      <el-table-column prop="studentCount" label="学生人数" width="120" />
      <el-table-column prop="startWeek" label="起始周" width="120" />
      <el-table-column fixed="right"  width="120">
        <template #default="scope">
          <el-button type="success" @click.prevent="handleClick(scope.$index)">选择参与老师</el-button>
        </template>
      </el-table-column>
    </el-table>
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


</style>
