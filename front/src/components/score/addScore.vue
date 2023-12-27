<script setup>
import {ref, onMounted, reactive} from 'vue';
import { useRoute } from 'vue-router';
import {getAllStuByClassName, inputMajor} from '../../api/student.js'
import {Search} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const store = useStore();
const form = ref({
  name: '',
  score: '',
})

const inputScore = ref({
  stuId: '',
  majorScore: '',
  taskId: '',
})

const pageDate = ref({
  pageNumber: 1,
  pageSize: 5,
  courseName: '',
  stuName: '',
});
const tableData = ref([])
const total = ref()
const input = ref('')
const dialogFormVisible = ref(false)
onMounted(() => {
  const route = useRoute();
  pageDate.value.courseName = route.params.id.substring(1);
  getAllStuByClass()
});

function getAllStuByClass(){
  getAllStuByClassName(pageDate.value)
      .then((response) =>{
        tableData.value = response.data.data.list
        total.value = response.data.data.total
      })
}

function getStudentByName(){
    pageDate.value.stuName = input.value
    getAllStuByClass()
}

const index1 = ref('')

function handleClick(index){
  form.value.name = tableData.value[index].name
  dialogFormVisible.value = true
  index1.value = index
}

function handleClick1(){
  InputMajorInfo(index1.value);
  dialogFormVisible.value = false
}

function InputMajorInfo(index){
  inputScore.value.stuId = tableData.value[index].id;
  inputScore.value.majorScore = String(Number(form.value.score) * 0.5);
  inputScore.value.taskId = store.getters.getInfo.taskId
  inputMajor(inputScore.value)
      .then((response) => {
        form.value.score = ''
        if(response.data.code === 500) {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
        }else {
          ElMessage({
            message: '添加成绩成功',
            type: 'success',
          })
        }
      })
      .catch(() => {
          console.log("添加失败")
      })
}

</script>



<template>

  <el-dialog v-model="dialogFormVisible" title="添加实习成绩" center>
    <el-form :model="form">
      <el-form-item label="学生姓名：" :label-width="formLabelWidth">
        <span> {{form.name}}  </span>
      </el-form-item>
      <el-form-item label="实习成绩：" :label-width="formLabelWidth">
        <el-input v-model="form.score" autocomplete="off" style="width: 15%"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleClick1()">
          录入
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-card class="box-card" style="width: 60vw">
    <template #header>
      <el-input
          v-model="input"
          class="w-50 m-2"
          placeholder="学生姓名"
          :suffix-icon="Search"
          style="width: 15%"
      />

      <el-button type="success" style="margin-left: 20px" v-model="pageDate.academicTerm" @click="getStudentByName">查询</el-button>
    </template>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="学生id" width="150" />
      <el-table-column prop="grade" label="年级" width="150" />
      <el-table-column prop="courseName" label="班级" width="150" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column fixed="right"  width="150">
        <template #default="scope">
          <el-button type="success" @click.prevent="handleClick(scope.$index)">添加成绩</el-button>
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


<style scoped>

</style>