import request from './request.js'

/**
 * 报名
 * @returns {Promise<AxiosResponse<any>> | *}
 * @param taskId
 */
function application(taskId){
    return request({
        url: '/api/task/applyTaskTea',
        method: 'get',
        params:{
            taskId: taskId
        }
    })
}

/**
 * 分页查询可报名实习任务信息
 * @param params
 * @returns {Promise<AxiosResponse<any>> | *}
 */
function getTasksByTerm(params){
    return request({
        url: '/api/task/getTasksByTerm',
        method: 'get',
        params
    })
}



export {application, getTasksByTerm}