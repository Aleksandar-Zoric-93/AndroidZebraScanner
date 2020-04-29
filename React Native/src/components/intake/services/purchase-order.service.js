import {factoryService} from '../../../config/config'
import { _retrieveData } from '../../../auth/auth'

export function getPurchaseOrders() {
  factoryService.get('PurchaseOrders')

}
export function getPurchaseOrderById(id) {
  return factoryService.get('PurchaseOrders/' + id)
}

