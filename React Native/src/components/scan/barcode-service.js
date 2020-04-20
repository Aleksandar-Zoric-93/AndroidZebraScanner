import axios from 'axios'
import { _retrieveData } from '../../auth/auth'
import {barcodeServiceUrl} from '../../config/config'

export function getBarcodeData(barcode){
   return _retrieveData().then((user) => {
        return axios({
          method: 'get',
          url: barcodeServiceUrl + 'Barcodes/' + barcode, 
          headers: { Authorization: 'Bearer ' + user.idToken },
        })
      }) 
}

 
