//Imports
import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import {Card} from '@paraboly/react-native-card'
import {withNavigation} from 'react-navigation'
import I18n from '../../config/i18n/i18n.js'
import {useTitle} from '../../screens/intake/SelectProduct.js'
import style from '../../styles/App.style'

class SelectProductComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  //Constructor and set state
  constructor (props) {
    super(props)

    this.state = {
      data: this.props.items,
    }
  }

  //Seperates list elements
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    )
  }

  render () {
    //Allows to navigate to other screens
    const {navigate} = this.props.navigation
    return (
      <View containerStyle={styles.container}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{useTitle()}</Text>
          {this.state.data.map((item, index) => {
            return (
              <FlatList
                horizontal
                key={index}
                data={[
                  {
                    ID: item.id,
                    netWeight: item.netWeight,
                    productsName: item.productsName,
                    quantity: item.quantity,
                    stockUnit: item.stockUnit,
                    purchaseKey: item.id,
                  },
                ]}
                extraData={this.state}
                renderItem={({item}) => (
                  <Card
                    style={styles.card}
                    iconName='pencil'
                    iconType='Entypo'
                    iconColor='#63c6ed'
                    iconBackgroundColor=''
                    title={item.productsName}
                    titleStyle={styles.cardTitle}
                    content={
                      'Required: ' + item.quantity + ' ' + item.stockUnit
                    }
                    contentStyle={styles.cardText}
                    onPress={() =>
                      navigate('IntakeDetails', {
                        userKey: item.ID,
                      })
                    }
                  />
                )}
                keyExtractor={item => item.key}
                ItemSeparatorComponent={this.renderSeparator}
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

export default withNavigation(SelectProductComponent)
