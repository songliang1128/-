<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getHistoryByName} from '../../api/teacher.js';
const route = useRoute();
const tableData = ref([])
const id = route.params.id;

onMounted(() => {
    getHistoryByName(id)
        .then((response) => {
          tableData.value = response.data.data
          console.log(response.data.data)
        })
})

</script>

<template>
  <el-card class="box-card">
    <el-table :data="tableData" style="width: 50vw">
      <el-table-column prop="academicTerm" label="学期" width="120" />
      <el-table-column prop="collegeName" label="学院" width="120" />
      <el-table-column prop="courseCategory" label="实习任务" width="120"/>
      <el-table-column prop="courseCode" label="课程编号" width="120"/>
      <el-table-column prop="courseName" label="课程名称" width="120"/>
      <el-table-column prop="username" label="教师姓名" width="120"/>
    </el-table>
  </el-card>
</template>

<style scoped>

</style>