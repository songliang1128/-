import request from './request.js'

function getData(data) {
    return request({
        url: '/api/task/getUserData',
        method: 'post',
        data
    })
}

function setEndTaskTime(data){
    return request({
        url: '/api/task/setEndTaskTime',
        method: 'post',
        data
    })
}

function checkIn(data){
    return request({
        url: '/api/student/checkIn',
        method: 'post',
        data
    })
}

export {checkIn, setEndTaskTime}