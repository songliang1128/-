import request from './request.js'

/**
 * 添加关联任务
 * @param params
 * @returns {*}
 * @constructor
 */
function AddRelevance(params) {
    return request({
        url: '/api/task/getsymble',
        method: 'get',
        params,
    })
}

/**
 * 添加任务
 * @param data
 * @returns {*}
 */
function addTask(data){
    return request({
        url: '/api/task/addTask',
        method: 'post',
        data,
    })
}

/**
 * 分页获取任务
 * @param params
 * @returns {*}
 */
function getTasks(params) {
    return request({
        url: '/api/task/getTasks',
        method: 'get',
        params,
    })
}

function getTimeOutTask(params) {
    return request({
        url: '/api/task/getTimeOutTask',
        method: "get",
        params
    })
}

export {AddRelevance, addTask, getTasks, getTimeOutTask}