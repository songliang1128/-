import request from './request.js'

/**
 * 获取某班所有学生
 * @param params
 * @returns {Promise<AxiosResponse<any>> | *}
 */
function getAllStuByClassName(data){
    return request({
        url: '/api/student/getNoCheckInStudents',
        method: 'post',
        data
    })
}

function inputMajor(data){
    return request({
        url: '/api/student/inputMajor',
        method: 'post',
        data
    })
}

export {getAllStuByClassName, inputMajor}

