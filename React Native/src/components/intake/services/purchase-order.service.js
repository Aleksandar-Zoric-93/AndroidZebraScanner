import axios from 'axios'
import { _retrieveData } from '../../../auth/auth'
import {factoryServiceURL} from '../../../config/config'

export function getPurchaseOrders(){
   return _retrieveData().then((user) => {
        return axios({
          method: 'get',
          url: factoryServiceURL + 'PurchaseOrders',
          headers: { Authorization: 'Bearer ' + user.idToken },
          params: { WarehouseId: user.warehouseId },
        })
      }) 
}


export function getPurchaseOrderById(id){
    return _retrieveData().then((user) => {
         return axios({
           method: 'get',
           url: factoryServiceURL + 'PurchaseOrders/' + id,
           headers: { Authorization: 'Bearer ' + user.idToken },
           params: { WarehouseId: user.warehouseId },
         })
       }) 
 }
 
