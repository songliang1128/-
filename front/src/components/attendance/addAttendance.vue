<script setup>
import {ref, onMounted, reactive} from 'vue';
import { useRoute } from 'vue-router';
import {getAllStuByClassName} from '../../api/student.js'
import {Search} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import {getNowDayTime} from "../../api/api.js";
import {checkIn, setEndTaskTime} from '../../api/addendance.js'
import {useRouter} from "vue-router";

const router = useRouter()

const store = useStore();


const pageDate = ref({
  pageNumber: 1,
  pageSize: 5,
  className: '',
  stuName: '',
  attendanceDate: getNowDayTime(),
});

const CheckInfo = ref({
  stuId: '',
  taskId: '',
  attendanceDate: '',
  status: '',
})

const tableData = ref([])
const total = ref()
const input = ref('')
const radio = ref('')
onMounted(() => {
  const route = useRoute();
  pageDate.value.className = route.params.id;
  getAllStuByClass()
});

function getAllStuByClass(){
  getAllStuByClassName(pageDate.value)
      .then((response) =>{
        tableData.value = response.data.data.list
        total.value = response.data.data.total
        console.log(tableData.value)
      })
}

function getStudentByName(){
  pageDate.value.stuName = input.value
  getAllStuByClass()
}

const endDate = ref({
  taskId: '',
  endTime: '',
});

function endTask() {
  endDate.value.taskId = store.getters.getInfo.taskId;
  endDate.value.endTime = getNowDayTime();

  setEndTaskTime(endDate.value)
      .then(() =>{
        ElMessage({
          message: '本次实习任务结束',
          type: 'success',
        })
        router.push('/main/attendance')
      })
}


function handleClick(index){
  CheckInfo.value.stuId = tableData.value[index].id
  CheckInfo.value.taskId = store.getters.getInfo.taskId;
  CheckInfo.value.status = tableData.value[index].status
  CheckInfo.value.attendanceDate = getNowDayTime();
  if(CheckInfo.value.status === '') {
    ElMessage({
      message: '请挑选状态',
      type: 'warning',
    })
  } else {

    checkIn(CheckInfo.value)
        .then(() => {
          ElMessage({
            message: '打卡成功',
            type: 'success',
          })


          // todo
          tableData.value = []
          getAllStuByClass()
        })
  }
}

</script>



<template>


  <el-card class="box-card" style="width: 75vw">
    <template #header>
      <el-input
          v-model="input"
          class="w-50 m-2"
          placeholder="学生姓名"
          :suffix-icon="Search"
          style="width: 15%"
      />

      <el-button type="success" style="margin-left: 20px" v-model="pageDate.academicTerm" @click="getStudentByName">查询</el-button>
      <el-button type="danger" @click="endTask" plain>结束任务</el-button>
    </template>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="学生id" width="150" />
      <el-table-column prop="grade" label="年级" width="150" />
      <el-table-column prop="className" label="班级" width="150" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column fixed="right" width="380">
        <template #default="scope">
          <el-radio-group v-model="scope.row.status">
            <el-radio :label="1">已到</el-radio>
            <el-radio :label="0">未到</el-radio>
            <el-radio :label="2">迟到</el-radio>
          </el-radio-group>
          <el-button style="margin-left: 80px" type="success" @click.prevent="handleClick(scope.$index)">打卡</el-button>
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