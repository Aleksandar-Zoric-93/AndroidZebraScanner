import { _retrieveData } from '../../auth/auth'
import {barcodeService} from '../../config/config'

export function getBarcodeData(barcode){
  return barcodeService.get('Barcodes/' + barcode)  
}

barcodeService.interceptors.request.use((config)=>{
return _retrieveData().then((user)=> {
    config.headers = {Authorization: 'Bearer ' + user.idToken};
    return config;
})
}, error => {
console.log(error)
})
