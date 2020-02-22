//Imports
import React from 'react'
import {StyleSheet,Text,View,} from 'react-native'
import {useAuthToken, useWarehouseId} from '../Login.js'
import axios from 'axios'
import {factoryServiceURL} from '../../config/config.js'
import ItemComponent from '../../Components/Intake/ItemComponent'
import I18n from '../../config/i18n/i18n.js'
import ActionButton from 'react-native-action-button'
import Loader from '../../config/Modals/Loader.js'
import styles from '../../styles/App.style.js'

export default class IntakeDashboard extends React.Component {
  //Create state array
  state = {
    items: [],
    loading: true,
  }

  //Invoked immediately after screen elements are rendered - i.e. Fetches intakes
  componentDidMount () {
    const AuthStr = useAuthToken()
    axios({
      method: 'get',
      url: factoryServiceURL + 'Intakes',
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

  //Using ItemComponent to display data in a card type list.
  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} />
        ) : (
          <Text>{I18n.t('intakes')}</Text>

        )}

        <ActionButton buttonColor='#63c6ed' 
        onPress={() =>
          navigate('SelectPo', {
            warehouseid: useWarehouseId()
          })
        }></ActionButton>
      </View>
    )
  }
}
