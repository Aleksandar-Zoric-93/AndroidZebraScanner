import { authService } from '../config/config'
import AsyncStorage from '@react-native-community/async-storage'

export default function authUser(username, password) {
  AsyncStorage.clear()
  return authService.post('Authentication/SignIn', { username, password, })
    .then(response => {
      _storeData(JSON.stringify(response.data))
      return response
    },
      error => {
        return error
      },
    )
}

export async function _retrieveData() {
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

