import axios from 'axios'
import {factoryServiceURL} from '../config/config.js'

export const getAuthToken = async ({username, password}) => {
  return axios({
    method: 'post',
    url: factoryServiceURL + 'Logins',
    data: {
      userId: username,
      password: password,
    },
  }).then(
    response => {
      AuthStr = 'Bearer ' + response.data.token
      return response.data.token
    },
    error => {
      return error
    },
  )
}

export const getWarehouseId = async ({username, password}) => {
  return axios({
    method: 'post',
    url: factoryServiceURL + 'Logins',
    data: {
      userId: username,
      password: password,
    },
  }).then(
    response => {
      return response.data.warehouse.id
    },
    error => {
      return error
    },
  )
}
