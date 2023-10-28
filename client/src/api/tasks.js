import axios from 'axios';

export const getTasksAPI = (pageSize = 3, page = 0, sortBy = 'username', sortDirection = 'ASC') => {
  return axios.get(`/api/tasks?pageSize=${ pageSize }&page=${ page }&sortBy=${ sortBy }&sortDirection=${ sortDirection }`);
}

export const createTaskAPI = (username, email, text) => {
  return axios.post(`/api/tasks`, {
    username,
    email,
    text
  })
}

export const editTaskAPI = (taskId, text, completed) => {
  return axios.put(`/api/admin/tasks/${taskId}`, {
    text,
    completed,
  })
}
