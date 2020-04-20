//Imports
import React, {memo, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert} from 'react-native';
import Logo from '../components/Logo.js'
import authUser from '../auth/auth.js'
import I18n from '../config/i18n/i18n.js'
import styles from '../styles/App.style.js'

const Login = ({navigation}) => {
  //State Value Declaration
  const [username, setUsername] = useState({value: ''})
  const [password, setPassword] = useState({value: ''})

  // On Login button click
  const _onLoginPressed = async () => {
    setUsername({...username})
    setPassword({...password})

    //Authenticate user 
    authUser(username.value, password.value).then(auth =>{
      switch(auth.status)
      {
        case 200:
        navigation.navigate('MainMenu');
        break;
        default:
          Alert.alert('Incorrect Login', "Please check username or password and try again");
      }
    })
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
