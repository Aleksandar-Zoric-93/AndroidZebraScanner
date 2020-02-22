//Imports
import React from 'react'
import {Text,View} from 'react-native'
import {useAuthToken} from '../Login.js'
import axios from 'axios'
import {factoryServiceURL} from '../../config/config.js'
import IntakeLinesComponent from '../../Components/Intake/IntakeLinesComponent'
import Loader from '../../config/Modals/Loader.js'
import I18n from '../../config/i18n/i18n.js'
import styles from '../../styles/App.style.js'

export default class IntakeLines extends React.Component {
  constructor (props) {
    const {state} = props.navigation
    super(props)
    //Declare state - use to get barcode type and barcode data
    this.state = {
      key: state.params.userKey,
      intakeLines: [],
      loading: true,
      purchaseKey: 0,
    }
  }

  //Fetch existing intakes on load
  componentDidMount () {
    const AuthStr = useAuthToken()
    axios({
      method: 'get',
      url: factoryServiceURL + 'Intakes/' + this.state.key,
      headers: {Authorization: AuthStr},
      params: {Id: this.state.key},
    })
      .then(response => {
        this.setState({
          loading: false,
          intake: response.data,
          purchaseKey: response.data.purchaseOrder.id,
          intakeLines: response.data.lines.map(intakeLine => {
            return {
              id: intakeLine.id,
              netWeight: intakeLine.netWeight,
              productsName: intakeLine.product.description,
              quantity: intakeLine.purchaseOrderLine.quantity,
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
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        {this.state.intakeLines.length > 0 ? (
          <IntakeLinesComponent items={this.state.intakeLines} />
        ) : (
          <Text>{I18n.t('intakeLines')}</Text>
        )}
        <TouchableOpacity
          style={styles.selectProductButton}
          onPress={() =>
            navigate('SelectProduct', {
              intakeId: this.state.purchaseKey,
            })
          }>
          <Text style={styles.buttonTitle}> Select Product </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
