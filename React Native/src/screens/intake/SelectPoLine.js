//Imports
import React, {Component} from 'react'
import {Text, View,} from 'react-native'
import POLines from '../../components/intake/POLines.js'
import Loader from '../../config/modals/Loader.js'
import I18n from '../../config/i18n/i18n.js'
import styles from '../../styles/App.style.js'
import {getPurchaseOrderById} from '../../components/intake/services/purchase-order.service'


export default class SelectPoLine extends Component {
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
    getPurchaseOrderById(this.state.key)
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