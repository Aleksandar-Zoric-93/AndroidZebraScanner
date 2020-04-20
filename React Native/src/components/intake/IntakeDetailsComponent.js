//Imports
import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native'
import PropTypes from 'prop-types'
import {Card} from '@paraboly/react-native-card'
import {withNavigation} from 'react-navigation'
import I18n from '../../config/i18n/i18n.js'

  let intakeId = '';

class IntakeDetailsComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  //Constructor and set state
  constructor (props) {
    super(props)

    this.state = {
      data: this.props.items
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
          <Text style={styles.title}>{I18n.t('intakeDetails')}</Text>
          {this.state.data.map((item, index) => { 
            intakeId = this.state.data.map(item => item.id)          
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
                      'Required: ' +
                      item.quantity +
                      ' ' +
                      item.stockUnit +
                      '\n' +
                      'Scanned: ' +
                      item.netWeight +
                      ' ' +
                      item.stockUnit
                    }
                    contentStyle={styles.cardText}
                    //This is for testing - change to 'Scan' screen upon completion
                    onPress={() =>
                      navigate('IntakeScan', {
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

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    marginBottom: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45,
    backgroundColor: '#FFF',
    width: '100%',
  },
  card: {
    backgroundColor: '#0b536a',
    marginVertical: 10,
    borderRadius: 10,
    height: 120,
    width: 300,
  },
  title: {
    flex: 1,
    fontSize: 26,
    color: '#0b536a',
    fontWeight: 'bold',
    paddingVertical: 2,
    textAlign: 'center',
    marginTop: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    paddingTop: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
  },
  lineSubtitle: {
    fontSize: 12,
    color: '#fff',
  },
  scroll: {
    marginBottom: 40,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1,
  },
  icon: {
    width: 30,
    height: 30,
  }
})

export default withNavigation(IntakeDetailsComponent)
