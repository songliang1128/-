<script setup>
import {useRouter} from 'vue-router';
import {computed, onMounted, reactive} from "vue";
import {useStore} from 'vuex'

const menus = reactive([])
const router = useRouter()
const store = useStore();

const status = computed(() => {
  return store.state.user.status;
})

const initMenu = () =>{
  let router_roots = router.getRoutes().filter(e => e.name === 'main')
  if (router_roots.length) {
    Object.assign(menus, router_roots[0].children)
  }
}
const username = computed(() => {
  return store.state.user.username;
})

onMounted(() =>{
  initMenu()
})

</script>

<template>

  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
  >
    <el-menu-item>
    </el-menu-item>
    <div v-for="(menu,index) in menus">
      <el-menu-item :index="'/'.concat('main', '/', menu.path)" v-if="index > 0 && index < 7">
        <template #title>
          <span>
            {{
              menu.title
            }}
          </span>
        </template>
      </el-menu-item>
    </div>

    <el-sub-menu index="6" style="margin-left: auto;">
    <template #title>{{ username }}</template>
      <el-menu-item v-if="status === '1'" index='/main/task'>发布任务</el-menu-item>
      <el-menu-item v-if="status === '1'" index='/main/review'>报名审核</el-menu-item>
    <el-menu-item index='/logout'>退出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>

</style>