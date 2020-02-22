//Imports
import React from 'react'
import {Text,View,} from 'react-native'
import {useAuthToken, useWarehouseId} from '../Login.js'
import axios from 'axios'
import {factoryServiceURL} from '../../config/config.js'
import POList from '../../Components/Intake/POList'
import I18n from '../../config/i18n/i18n.js'
import Loader from '../../config/Modals/Loader.js'
import styles from '../../styles/App.style.js'

export default class IntakeDashboard extends React.Component {
  //Create state array
  state = {
    items: [],
    loading: true,
  }

  //Invoked immediately after screen elements are rendered - i.e. gets Open PO's 
  componentDidMount () {
    const AuthStr = useAuthToken()
    axios({
      method: 'get',
      url: factoryServiceURL + 'PurchaseOrders',
      headers: {Authorization: AuthStr},
      params: {warehouseid: useWarehouseId()},
    })
      .then(response => {
        // If request is good...
        setTimeout(() => {
          this.setState({
            loading: false,
            items: response.data,
          })
        }, 2500)
      })
      .catch(error => {
        return 'error ' + error
      })
  }

  render () {
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