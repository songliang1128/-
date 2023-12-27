import request from './request.js'

function getUpdate(){
    return request({
        url: '/api/task/getTodoTask',
        method: 'get',
    })
}

function getSubcategories(){
    return request({
        url: '/api/categories/subcategories',
        method: 'get',
    })
}

function createCategory(data) {
    return request({
        url: '/api/categories/create',
        method: 'post',
        data
    })
}

function getFiles(categoryId){
    return request({
        url: '/api/categories/files',
        method: 'get',
        params:{
            categoryId:categoryId
        }
    })
}

function getSymbolFiles(taskId){
    return request({
        url: '/api/categories/getSymbolFiles',
        method: 'get',
        params:{
            taskId: taskId,
        }
    })
}

function excelExport(taskId){
    return request({
        url: '/api/task/excelExport',
        method: 'get',
        params:{
            taskId: taskId,
        }
    })
}

export {getUpdate, createCategory, getFiles, getSymbolFiles, excelExport}