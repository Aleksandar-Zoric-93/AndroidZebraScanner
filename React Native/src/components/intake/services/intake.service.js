import axios from 'axios'
import { _retrieveData } from '../../../auth/auth'
import {factoryServiceURL} from '../../../config/config'

export function getIntakes(){
   return _retrieveData().then((user) => {
        return axios({
          method: 'get',
          url: factoryServiceURL + 'Intakes',
          headers: { Authorization: 'Bearer ' + user.idToken },
          params: { WarehouseId: user.warehouseId },
        })
      }) 
}


export function getIntakesById(id){
    return _retrieveData().then((user) => {
         return axios({
           method: 'get',
           url: factoryServiceURL + 'Intakes/' + id,
           headers: { Authorization: 'Bearer ' + user.idToken },
           params: { WarehouseId: user.warehouseId },
         })
       }) 
 }
 
