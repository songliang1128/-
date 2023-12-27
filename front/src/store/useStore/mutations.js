const mutations = {
    setUsername:(state, username) =>{
        state.username = username
    },
    setStatus:(state, status) => {
        state.status = status
    },
    setTaskId:(state, taskId) => {
        state.taskId = taskId
    }
}

export default mutations;