import request from './request.js'


function intoTask(taskId, teaId){
    return request({
        url: '/api/task/intoTask',
        method: 'get',
        params:{
            taskId: taskId,
            teaId: teaId
        }
    })
}

function getApplyInfo(taskId){
    return request({
        url: '/api/task/getApplyInfo',
        method: 'get',
        params:{
            taskId: taskId
        }
    })
}

function applyTaskSys(teaTaskId){
    return request({
        url: '/api/task/applyTaskSys',
        method: 'get',
        params:{
            teaTaskId: teaTaskId
        }
    })
}

function getTodoTask(){
    return request({
        url: '/api/task/getTodoTask',
        method: 'get',
    })
}

function getEndTasks(){
    return request({
        url: '/api/task/getEndTasks',
        method: 'get',
    })
}

function getData(data) {
    return request({
        url: '/api/task/getUserData',
        method: 'post',
        data
    })
}

function getHistoryByName(teaId){
    return request({
        url: '/api/task/getHistoryByName',
        method: 'get',
        params: {
            teaId: teaId
        }
    })
}



export {intoTask,getApplyInfo, applyTaskSys, getTodoTask, getData, getEndTasks, getHistoryByName}
