//Imports
import React, {Component} from 'react'
import {Text,View,} from 'react-native'
import POList from '../../components/intake/POList'
import I18n from '../../config/i18n/i18n.js'
import Loader from '../../config/modals/Loader.js'
import styles from '../../styles/App.style.js'
import {getPurchaseOrders} from '../../components/intake/services/purchase-order.service'

export default class SelectPo extends Component {
  //Create state array
  state = {
    items: [],
    loading: true,
  }

  //Invoked immediately after screen elements are rendered - i.e. gets Open PO's 
  componentDidMount () {
  getPurchaseOrders()
  .then(response => {
          this.setState({
            loading: false,
            items: response.data,
          }) 
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