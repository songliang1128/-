<script setup lang="ts">
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {getUpdate, createCategory, getFiles, getSymbolFiles} from "../../api/update";
import {ElMessage, ElMessageBox, genFileId, UploadInstance, UploadRawFile} from 'element-plus'
import {getToken} from "../../api/token";
import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])
const gridData = ref([])
const tableData = ref([])
const value = ref()
const value2 = ref()

const value1 = ref('')
const options = ref([
  {
    value: 2,
    label: '机械工程训练实习',
  },
  {
    value: 3,
    label: '汽车修理实习',
  },
  {
    value: 4,
    label: '创新实习',
  },
  {
    value: 5,
    label: '翔宇创新精英班实习',
  },
  {
    value: 6,
    label: '其他实习（含社会实践）',
  },
])
const options3 = ref([])
const options1 = ref([])
const dialogTableVisible = ref(false)
const store = useStore();
const router = useRouter()
const input1 = ref('')
const input = ref('')
const input2 = ref('')

watch(value, () =>{

  options1.value = []

  getFiles(value.value)
      .then((response) => {
        options1.value = response.data.data
      })
})



const handleClick = (index) => {
  input2.value = index
  input1.value = tableData.value[index].taskId
  dialogTableVisible.value = true
  store.commit('setTaskId', tableData.value[index].taskId);
}

onMounted(() => {
    getUpdate()
        .then((response) => {
            tableData.value = response.data.data
        })
})

const token = computed(()=>{
  return {
    Authorization: `${getToken()}`
  };
})
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const updateData = ref({
  taskId: '',
  categoryId: '',
})

const CreateCategoryDto = ref({
  outlineId: '1',
  newCategoryName: '',
})

function createCategoryS(){
  createCategory(CreateCategoryDto.value)
      .then((response) => {
        updateData.value.categoryId = response.data.data
        updateData.value.taskId = input1.value
        upload.value!.submit()

        input.value = ''
      })
}

async function submitUpload() {

  CreateCategoryDto.value.newCategoryName = input.value
  await createCategoryS()

}
  function createHandler(supplyInfo) {
    return (response, file, fileList) => {
      handleSuccess(response, file, fileList, supplyInfo);
    }
  }
 function handleSuccess(response, file, fileList, supplyInfoItem) {
  console.log('上传成功！自定义参数：', supplyInfoItem);
  console.log(response)
  console.log(file, fileList)

}



function getSymbolFilesTask(){
  getSymbolFiles(tableData.value[input2.value].taskId)
      .then((response) => {
        if(response.data.code === 500) {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          })
        }
      })
}

</script>

<template>

  <el-dialog v-model="dialogTableVisible" title="Shipping address">


    <template #header>
      <span>大纲:</span>
        <el-select style="margin-left: 10px; width: 20%" v-model="value" class="m-2" placeholder="大纲">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-select style="margin-left: 10px; width: 20%" v-model="value1" class="m-2" placeholder="选择大纲文件">
          <el-option
              v-for="item in options1"
              :key="item.documentId"
              :label="item.documentName"
              :value="item.filePath"
          />
        </el-select>

      <el-button type="info" style="margin-left: 10px;" @click="getSymbolFilesTask" round>查看上次关联任务文档</el-button>
      <el-select style="margin-left: 10px; width: 20%" v-model="value2" class="m-2" placeholder="查看关联任务文件">
        <el-option
            v-for="item in options2"
            :key="item.documentId"
            :label="item.documentName"
            :value="item.filePath"
        />
      </el-select>

      <br/>
      <div style="margin-top: 30px;">
        <span  >创建新类别：</span>
        <el-input style="width: 20%" size="default" v-model="input" placeholder="类别" />
      </div>

      <el-upload
          style="margin-top: 30px;"
          ref="upload"
          class="upload-demo"
          action="/api/files/upload"
          :headers="token"
          :data="updateData"
          :limit="1"
          list-type="picture"
          :on-success="createHandler('upload')"
          :on-exceed="handleExceed"
          :auto-upload="false"
      >
        <template #trigger >
          <el-button type="primary">选择文档</el-button>
        </template>
        <el-button class="ml-3" style="margin-left: 10px" type="success" @click="submitUpload">
          上传文档
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            limit 1 file, new file will cover the old file
          </div>
        </template>
      </el-upload>
    </template>
  </el-dialog>

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
          <el-button type="success" @click.prevent="handleClick(scope.$index)">上传任务文档</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>

</style>