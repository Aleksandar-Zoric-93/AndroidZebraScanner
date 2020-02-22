//Imports
import React from 'react'
import {Text, View} from 'react-native'
import { useAuthToken, useWarehouseId } from '../Login.js'
import axios from 'axios'
import { factoryServiceURL } from '../../config/config.js'
import POList from '../../Components/Intake/POList'
import I18n from '../../config/i18n/i18n.js'
import Loader from '../../config/Modals/Loader.js'
import styles from '../../styles/App.style.js'

export default class IntakeDashboard extends React.Component {
  constructor(props) {
    const { state } = props.navigation
    super(props)
    //Declare state - use to get barcode type and barcode data
    this.state = {
      items: [],
      loading: true,
      key: state.params.purcahseOrderKey
    }
  }
  //Invoked immediately after screen elements are rendered - i.e. Fetches intakes
  componentDidMount() {
    const AuthStr = useAuthToken()
    axios({
      method: 'get',
      url: factoryServiceURL + 'PurchaseOrders',
      headers: { Authorization: AuthStr },
      params: { id: this.state.key, 
                warehouseId:useWarehouseId()},
    })
      .then(response => {
        // If request is good...
        setTimeout(() => {
          this.setState({
            loading: false,
            items: response.data,
          })
        }, 2500)
        console.log
      })
      .catch(error => {
        return 'error ' + error
      })
  }

  //Using ItemComponent to display data in a card type list.
  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        {this.state.items.length > 0 ? (
          <POList items={this.state.items} />
        ) : (
            <Text>{I18n.t('intakes')}</Text>

          )}
      </View>
    )
  }
}