//Imports
import React from 'react'
import {Text, View,} from 'react-native'
import { useAuthToken } from '../Login.js'
import axios from 'axios'
import { factoryServiceURL } from '../../config/config.js'
import POLines from '../../Components/Intake/POLines.js'
import Loader from '../../config/Modals/Loader.js'
import I18n from '../../config/i18n/i18n.js'
import { useWarehouseId } from '../../Screens/Login.js'
import styles from '../../styles/App.style.js'


export default class SelectPoLine extends React.Component {
  constructor(props) {
    const { state } = props.navigation
    super(props)
    //Declare state - use to get barcode type and barcode data
    this.state = {
      key: state.params.poKey,
      data: this.props.items,
      purchaseOrderLines: [],
      loading: true,
    }
  }

  componentDidMount() {
    const AuthStr = useAuthToken()
    console.log(this.state.key)
    axios({
      method: 'get',
      url: factoryServiceURL + 'PurchaseOrders/' + this.state.key,
      headers: { Authorization: AuthStr },
      params: {
        id : this.state.key,
        warehouseId: useWarehouseId()
      }
    })
      .then(response => {
        // If request is good...
        this.setState({
          loading: false,
          purchaseOrder: response.data,
          purchaseOrderLines: response.data.lines.map(purchaseOrderLine => {
            return {
              id: purchaseOrderLine.id,
              Weight: purchaseOrderLine.weight,
              quantity: purchaseOrderLine.quantity,
              productsName: purchaseOrderLine.product.description,
            }
          }),
        })
        console.log(this.state.purchaseOrderLines.netWeight)
      })
      .catch(error => {
        return 'error ' + error
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        {this.state.purchaseOrderLines.length > 0 ? (
          <POLines items={this.state.purchaseOrderLines} />
        ) : (
            <Text>{I18n.t('purchaseOrders')}</Text>
          )}
      </View>
    )
  }
}