//Is it Possible to Abstract this so that it just returns a string that is scanned?
//new componenet to extract and return information that is scanned from gs1 label?
//see current hh project

//Imports
import React from 'react'
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native'
import DataWedgeIntents from 'react-native-datawedge-intents'
import {DeviceEventEmitter} from 'react-native'
import {zebraIntent} from '../../config/config.js'
import {barcodeListener} from '../../config/config.js'
import I18n from '../../config/i18n/i18n.js'
import styles from '../../styles/App.style.js'

export default class IntakeScan extends React.Component {
  constructor (props) {
    super(props)
    //Declare state - use to get barcode type and barcode data
    this.state = {
      barcodeLabelType: '',
      barcodeData: '',
    }
    //Handler/Data Assignment
    this.scanHandler = deviceEvent => {
      this.state.barcodeData = deviceEvent.data
      this.state.barcodeLabelType = deviceEvent.labelType
      this.setState(this.state)
    }
    DeviceEventEmitter.addListener(barcodeListener, this.scanHandler)
    //Register scanning device - create a DataWedge profile with a 'diomacZebra' intent.
    DataWedgeIntents.registerReceiver(zebraIntent, '')
  }
  render () {
    const {navigate} = this.props.navigation
    let barcodeData = this.state.barcodeData
    let barcodeType = this.state.barcodeLabelType
    return (
      <View style={styles.container}>
        <Text>
         {I18n.t('pleaseScan')}
          {'\n'}
        </Text>
        <Text>
          This is the intake ID passed from the previous screen:{' '}
          {this.props.navigation.state.params.userKey} {'\n'}
        </Text>
        <Text>
          Scanned Data: {barcodeData} {'\n'}{' '}
        </Text>
        <Text>Barcode Type: {barcodeType}</Text>
      </View>
    )
  }
}