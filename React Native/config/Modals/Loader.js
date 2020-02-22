//Imports
import React, {Component} from 'react'
import {StyleSheet, View, Modal, ActivityIndicator, Text} from 'react-native'
import I18n from '../../config/i18n/i18n.js'

const Loader = props => {
  //Prop Declaration
  const {loading, ...attributes} = props

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal')
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} />
        </View>
        <Text style={styles.loadingText}> {I18n.t('loading')} </Text>
      </View>
    </Modal>
  )
}

//Styling
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#fff',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loadingText: {
    fontSize: 16,
  },
})

export default Loader
