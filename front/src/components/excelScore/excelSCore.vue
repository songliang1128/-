<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getEndTasks } from '../../api/teacher.js'
import { useStore } from "vuex";
import { excelExport } from '../../api/update'
import XLSX from 'xlsx';

const tableData = ref([]);
const store = useStore();

const handleClick = async (index) => {
  try {
    const response = await excelExport(tableData.value[index].taskId);
    const byteCode = response.data;

    // 创建 Blob 对象
    const blob = new Blob([byteCode], { type: 'application/octet-stream' });

    // 创建下载链接
    const url = URL.createObjectURL(blob);

    // 创建虚拟的链接元素并触发点击事件
    const link = document.createElement('a');
    link.href = url;

    // 设置下载文件的名称，可以根据实际情况修改
    link.download = 'word.xlsx';

    // 将链接添加到 DOM 中
    document.body.appendChild(link);

    // 触发点击事件
    link.click();

    // 移除链接元素
    document.body.removeChild(link);

    // 释放 URL 对象
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error exporting Excel file:', error);
  }
};

function getTodo() {
  getEndTasks()
      .then((response) => {
        console.log(response.data.data);
        tableData.value = response.data.data;
      }).catch((error) => {
    console.error('Error fetching tasks:', error);
  });
}

onMounted(() => {
  getTodo();
});
</script>


<template>
  <el-card class="box-card" style="width: 70vw;">

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
          <el-button type="success" @click.prevent="handleClick(scope.$index)">导出工作量表</el-button>
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
