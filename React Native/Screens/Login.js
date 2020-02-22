//Imports
import React, {memo, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
import Logo from '../Components/Logo.js'
import {getAuthToken} from '../auth/auth.js'
import {getWarehouseId} from '../auth/auth.js'
import I18n from '../config/i18n/i18n.js'
import styles from '../styles/App.style.js'

//Export Functions
export const useAuthToken = () => {
  return 'Bearer ' + authTokenResponse
}

export const useWarehouseId = () => {
  return warehouseIdResponse
}

//Block scope variables
let authTokenResponse = ''
let warehouseIdResponse = ''

const Login = ({navigation}) => {
  //State Value Declaration
  const [username, setUsername] = useState({value: ''})
  const [password, setPassword] = useState({value: ''})
  const [authToken, setAuthToken] = useState({value: ''})
  const [warehouseId, setWarehouseId] = useState({value: ''})

  // On Login button click
  const _onLoginPressed = async () => {
    setUsername({...username})
    setPassword({...password})

    //Get Auth Token
    authTokenResponse = await getAuthToken({
      username: username.value,
      password: password.value,
    })

    //Get Warehouse Id
    warehouseIdResponse = await getWarehouseId({
      username: username.value,
      password: password.value,
    })

    //Assign auth token and warehouse to state value
    setAuthToken({value: 'Bearer ' + authTokenResponse})
    setWarehouseId({value: warehouseIdResponse})

    //TODO - Add check for 404 exception
    if (
      authToken.value == 'Bearer Error: Request failed with status code 404'
    ) {
      ToastAndroid.show(I18n.t('err1'), ToastAndroid.SHORT)
    } else {
      navigation.navigate('MainMenu')
    }
  }
  
  return(
 <View style={styles.container}>
      <Logo />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder= {I18n.t('username')}
          placeholderTextColor='#000'
          onChangeText={text => setUsername({value: text})}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder={I18n.t('password')}
          placeholderTextColor='#000'
          onChangeText={text => setPassword({value: text})}
        />
      </View>
      <TouchableOpacity onPress={_onLoginPressed} style={styles.loginBtn}>
        <Text style={styles.loginText}>{I18n.t('login')}</Text>
      </TouchableOpacity>
    </View>
  )
}
export default memo(Login)
