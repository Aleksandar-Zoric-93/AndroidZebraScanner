//Imports
import React, {Component} from 'react'
import {View } from 'react-native'
import ItemComponent from '../../components/intake/ItemComponent'
import ActionButton from 'react-native-action-button'
import Loader from '../../config/modals/Loader.js'
import styles from '../../styles/App.style.js'
import {getIntakes} from '../../components/intake/services/intake.service'


export default class   extends Component {
  //Create state arrayListOpenIntakes
  constructor(props){
    super(props)
    this.state = {
      items: null,
      loading: true,
    }
  }
  
  //Invoked immediately after screen elements are rendered - i.e. Fetches intake
  componentDidMount() {
    getIntakes().then(res => {
      this.setState({items:res.data, loading:false})
    }).catch(error => {
      console.log('error ' + error)
    })
  }

  //Using ItemComponent to display data in a card type list.
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>   
          {this.state.items ? <ItemComponent items={this.state.items} /> : <Loader loading={this.state.loading} />}
        <ActionButton buttonColor='#63c6ed'
          onPress={() =>
            navigate('SelectPo')
          }></ActionButton>
      </View>
    )
  }
}