import axios from 'axios'

export const production =  false
export const factoryService = axios.create({baseURL: 'https://factory.dev.diomac.cloud/api/'})
export const authService= axios.create({baseURL: 'https://auth.dev.diomac.cloud/api/'})
export const barcodeService= axios.create({baseURL:'https://barcode.dev.diomac.cloud/api/'})
export const scaleServiceURL = 'wss://ohaus.dev.diomac.cloud/'
export const zebraIntent = 'diomacZebra'
export const barcodeListener = 'barcode_scan'