import {_retrieveData} from '../../../auth/auth'
import {factoryService} from '../../../config/config'

export function getIntakes() {
  return factoryService.get('Intakes')
}

export function getIntakesById(id) {
  return factoryService.get('Intakes/' + id)
}

factoryService.interceptors.request.use((config)=>{
return _retrieveData().then((user)=> {
    config.headers = {Authorization: 'Bearer ' + user.idToken};
    config.params = {WarehouseId: user.warehouseId}
    return config;
})
}, error => {
console.log(error)
})

