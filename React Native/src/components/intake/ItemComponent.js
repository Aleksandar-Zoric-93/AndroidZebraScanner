//Imports
import React, { Component } from 'react'
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native'
import PropTypes from 'prop-types'
import { Card } from '@paraboly/react-native-card'
import { withNavigation } from 'react-navigation'
import I18n from '../../config/i18n/i18n.js'

class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  //Constructor and set state
  constructor(props) {
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

  render() {
    //Allows to navigate to other screens
    const { navigate } = this.props.navigation
    return (
      <View containerStyle={styles.container}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{I18n.t("openIntakes")}</Text>
          {this.state.data.map((item, index) => {
            return (
              <FlatList
                horizontal
                key={index}
                data={[
                  {
                    ID: item.id,
                    key: item.number,
                    date: item.date,
                    supplier: item.supplier.name,
                    POref: item.purchaseOrder.number,
                    date: item.date,
                  },
                ]}
                extraData={this.state}
                renderItem={({ item }) => (
                  <Card
                    style={styles.card}
                    iconName="pencil"
                    iconType="Entypo"
                    iconColor="#63c6ed"
                    iconBackgroundColor=""
                    title={item.key}
                    titleStyle={styles.cardTitle}
                    content={item.POref + '\n' + item.supplier}
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
    height: 90,
    width: 300,

  },
  title: {
    flex: 1,
    fontSize: 26,
    color: '#0b536a',
    fontWeight: 'bold',
    paddingVertical: 2,
    textAlign: 'center',
    marginTop: 10
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    paddingTop: 5
  },
  cardTitle: {
    fontSize: 20,
    color: '#fff',
  },
  lineSubtitle: {
    fontSize: 12,
    color: '#fff',
  },
  scroll: {
    marginBottom: 10,
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
  },
})

export default withNavigation(ItemComponent)
