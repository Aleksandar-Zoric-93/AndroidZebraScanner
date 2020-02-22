//Imports
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native'
import {useAuthToken, useWarehouseId} from '../Login.js'
import axios from 'axios'
import {factoryServiceURL} from '../../config/config.js'
import PropTypes from 'prop-types'
import {Card, SearchBar} from 'react-native-elements'
import SelectProductComponent from '../../Components/Intake/SelectProductComponent'
import Loader from '../../config/Modals/Loader.js'
import I18n from '../../config/i18n/i18n.js'

//Export Functions
export const setTitle = title => {
  return title
}

let purchaseNumber = ''

export const useTitle = () => {
  return purchaseNumber
}

export default class SelectProduct extends React.Component {
  constructor (props) {
    const {state} = props.navigation
    super(props)
    this.state = {
      key: state.params.intakeId,
      productsOnPurchase: [],
      loading: true,
      purchaseNumber: 0,
    }
  }

  //Fetch products from related purchase order
  componentDidMount () {
    const AuthStr = useAuthToken()
    axios({
      method: 'get',
      url: factoryServiceURL + 'PurchaseOrders/' + this.state.key,
      headers: {Authorization: AuthStr},
      params: {
        id: this.state.key,
        warehouseId: useWarehouseId(),
      },
    })
      .then(response => {
        this.setState({
          loading: false,
          intake: response.data,
          purchaseNumber: response.data.number,
          productsOnPurchase: response.data.lines.map(intakeLine => {
            return {
              id: intakeLine.id,
              netWeight: intakeLine.weight,
              productsName: intakeLine.product.description,
              quantity: intakeLine.quantity,
              stockUnit: intakeLine.product.stockUnit,
            }
          }),
        })
      })
      .catch(error => {
        return 'error ' + error
      })
  }

  render () {
    const {navigate} = this.props.navigation
    purchaseNumber = setTitle('Order ' + this.state.purchaseNumber)
    return (
      <View style={styles.container}>
        {this.state.productsOnPurchase.length > 0 ? (
          <SelectProductComponent items={this.state.productsOnPurchase} />
        ) : (
          <Text>{I18n.t('selectProduct')}</Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
