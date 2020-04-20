import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {authServiceURL} from '../config/config.js'


export default function authUser(username, password) {
 return axios({
    method: 'post',
    url: authServiceURL + 'Authentication/SignIn',
    data: {
      username,
      password,
    },
  }).then(
    response => {
      _storeData(JSON.stringify(response.data))
      return response
    },
    error => {
      return error
    },
  )
}

export async function _retrieveData () {
  let value = '';
  try {
   value = await AsyncStorage.getItem('User');
  } catch (error) { // Error retrieving data
    console.log(error)
  }
  return JSON.parse(value)
};

_storeData = async (user) => {
  try { await AsyncStorage.setItem('User', user); } catch (error) {
    // Error saving data 
    console.log(error)
  }
};
