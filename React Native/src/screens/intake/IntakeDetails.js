//Imports
import React, {Component} from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import IntakeDetailsComponent from '../../components/intake/IntakeDetailsComponent'
import Loader from '../../config/modals/Loader.js'
import I18n from '../../config/i18n/i18n.js'
import styles from '../../styles/App.style.js'
import {getIntakesById} from '../../components/intake/services/intake.service'

export default class IntakeDetails extends Component {
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

    getIntakesById(this.state.key)
      .then(res => {
        this.setState({
          loading: false,
          intake: res.data,
          purchaseKey: res.data.purchaseOrder.id,
          intakeLines: res.data.lines.map(intakeLine => {
            return {
              id: intakeLine.id,
              netWeight: intakeLine.netWeight,
              productsName: intakeLine.product.description,
              quantity: intakeLine.purchaseOrderLine.quantity,
              stockUnit: intakeLine.product.stockUnit,
            }
          }),
        }).catch(error => {
          console.log('error ' + error)
        })
      })
      .catch(error => {
        return 'error ' + error
      })
  }
  

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        {this.state.intakeLines.length > 0 ? (
          <IntakeDetailsComponent items={this.state.intakeLines} />
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
