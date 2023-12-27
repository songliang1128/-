<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getTodoTask} from '../../api/teacher.js'
import {useStore} from "vuex";


const tableData = ref([])
const store = useStore();

const input = ref('');
const router = useRouter()
const currentPage4 = ref(4)
const pageSize4 = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleClick = (index) => {
  store.commit('setTaskId', tableData.value[index].taskId);
  router.push('/main/attendance/' + tableData.value[index].className)

}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

function getTodo(){
  getTodoTask()
      .then((response) => {
        tableData.value = response.data.data
      }).catch(() => {
  })
}

onMounted(() => {
  getTodo()
})



</script>



<template>
  <el-card class="box-card" style="width: 70vw">


    <el-table :data="tableData">
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
          <el-button type="success" @click.prevent="handleClick(scope.$index)">填写考勤情况</el-button>
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

.box-card {
  width: 100vw;
}
</style>
