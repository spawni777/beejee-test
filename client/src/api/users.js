import axios from 'axios';

export const postLoginAPI = ({ username, password }) => {
  return axios.post(`/api/users/login`, {
    username,
    password,
  })
}
