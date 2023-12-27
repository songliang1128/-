import { createRouter, createWebHistory } from 'vue-router'
import {getToken} from "../api/token.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/',
      redirect:'/main'
    },
      {
          path: '/logout',
          title: '退出',
          component: () => import('../components/logout.vue')
      },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/index.vue'),
      children:[
        {
            path: '',
            redirect:'/main/home',
        },
        {
            path: 'home',
            title:'实习任务报名',
            component: () => import('../components/task/application.vue')
        },
        {
            path: 'documentation',
            title: '文档',
            component:()=>import('../components/documentation/upload.vue')
        },
        {
            path: 'teacher',
            title: '选择教师',
            component:() => import('../components/teacher/change.vue')
        },
        {
            path: 'attendance',
            title: '考勤管理',
            component:() => import('../components/attendance/attendance.vue')
        },
        {
            path: 'score',
            title: '学生成绩管理',
            component:() => import('../components/score/score.vue')
        },
          {
              path: 'excel',
              title: '打印工作量表',
              component:() => import('../components/excelScore/excelSCore.vue')
          },
        {
            path: 'task',
            title: '发布任务',
            component:()=>import('../components/task/addTask.vue')
        },
        {
            path: 'review',
            title: '报名审核',
            component:()=>import('../components/task/manage.vue')
        },
          {
            path: 'review/:id',
              title: '老师历史任教情况',
              component:() => import('../components/teacher/PassTeacher.vue')
          },
          {
              path: 'attendance/:id',
              title: '录入考勤情况',
              component:() => import('../components/attendance/addAttendance.vue')
          },
          {
              path: 'score/:id',
              title: '录入学习成绩',
              component:() => import('../components/score/addScore.vue')
          },

      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  // 获取用户身份
  let token = getToken()
  if( token || to.path === '/login'){
    next()
  }
  next('/login')
})

export default router
