import React, { Component } from 'react'
import { ScrollView, View, TextInput, Text } from 'react-native'
import DataWedgeIntents from 'react-native-datawedge-intents'
import { DeviceEventEmitter } from 'react-native'
import { zebraIntent } from '../../config/config.js'
import { barcodeListener } from '../../config/config.js'
import { getBarcodeData } from '../../components/scan/barcode-service'
import styles from '../../styles/App.style.js'
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class IntakeScan extends Component {
  constructor(props) {
    super(props)
    //Declare state - use to get barcode type and barcode data
    this.state = {
      barcode: 'barcode',
      traceNumber: '',
      tradeUnitNumber: '',
      logisticUnitNumber: '',
      serialNumber: '',
      bestBefore: ''
    }
    //Handler/Data Assignment
    this.scanHandler = deviceEvent => {
      getBarcodeData(deviceEvent.data).then(res => {
        this.setState({
          barcode: deviceEvent.data,
          traceNumber: (res.data.traceNumber == null) ? this.state.traceNumber : res.data.traceNumber,
          tradeUnitNumber: (res.data.tradeUnitNumber == null) ? this.state.traceNumber : res.data.traceNumber,
          logisticUnitNumber: (res.data.logisticUnitNumber == null) ? this.state.logisticUnitNumber : res.data.logisticUnitNumber,
          serialNumber: (res.data.serialNumber == null) ? this.state.serialNumber : res.data.serialNumber,
          bestBefore: (res.data.bestBefore == null) ? this.state.bestBefore : res.data.bestBefore
        }).catch(error => {
          console.log('error ' + error)
        })
      }).catch(error => {
        console.log(error)
      })

    }
    DeviceEventEmitter.addListener(barcodeListener, this.scanHandler)
    //Register scanning device - create a DataWedge profile with a 'diomacZebra' intent.
    DataWedgeIntents.registerReceiver(zebraIntent, '')
  }
  render() {
    const { navigate } = this.props.navigation
    let barcodeData = this.state.barcodeData
    return (
      <ScrollView style={styles}>
        <Formik
          initialValues={this.state}
          enableReinitialize
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <View>
              <View style={styles.formRow}>
              <TextInput
                style={styles.formInputWeight}
                placeholder='Weight'
                onChangeText={props.handleChange('weight')}
                value={props.values.weight}
              />
              <TextInput
                style={styles.formInputWeight}
                placeholder='Units'
                onChangeText={props.handleChange('units')}
                value={props.values.units}
              />
              </View>
            <View>
              <TextInput
                style={styles.formInput}
                placeholder='Batch Code'
                onChangeText={props.handleChange('traceNumber')}
                value={props.values.traceNumber}
              />
              <TextInput
                style={styles.formInput}
                placeholder='Best Before Date'
                onChangeText={props.handleChange('bestBefore')}
                value={props.values.bestBefore}
              />
              <TextInput
                style={styles.formInput}
                placeholder='Logistic Unit Number'
                onChangeText={props.handleChange('logisticUnitNumber')}
                value={props.values.logisticUnitNumber}
              />
              <TextInput
                style={styles.formInput}
                placeholder='Serial Number'
                onChangeText={props.handleChange('serialNumber')}
                value={props.values.serialNumber}
              />
              <TouchableOpacity style={styles.submitButton} title='submit' onPress={props.handleSubmit}>
                <Text style={styles.loginText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity/>
            </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    )
  }
}