//Imports
import React from 'react'
import {Text, View} from 'react-native'
import POList from '../../components/intake/POList'
import I18n from '../../config/i18n/i18n.js'
import Loader from '../../config/modals/Loader.js'
import styles from '../../styles/App.style.js'
import {getPurchaseOrders} from '../../components/intake/services/purchase-order.service'

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
    getPurchaseOrders()
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