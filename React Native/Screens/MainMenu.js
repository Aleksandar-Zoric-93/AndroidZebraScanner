import React, { Component } from 'react';
import {View, Text, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import I18n from '../config/i18n/i18n.js';
import Logo from '../Components/Logo.js'
import styles from '../styles/App.style.js';

export default class MainMenu extends Component {
    render() {
        const { navigate } = this.props.navigation
        const items = [
            { name:  I18n.t("intake"), screen: "IntakeDashboard", img: require('../Assets/img/intake.png')},
            { name: I18n.t("delivery"), screen: "MainMenu", img: require('../Assets/img/delivery.png')},
            { name: I18n.t("stock"), screen: "MainMenu", img: require('../Assets/img/stock.png')},
            { name: I18n.t("locations"), screen: "MainMenu",img: require('../Assets/img/locations.png')},
            { name: I18n.t("transfers"), screen: "MainMenu",img: require('../Assets/img/transfers.png')},
            { name: I18n.t("settings"), screen: "MainMenu",img: require('../Assets/img/settings.png')},
        ];

        return (
            <View style={styles.mainMenuContainer}>
                <Logo/>    
            <FlatGrid
                    itemDimension={130}
                    items={items}
                    style={styles.gridView}
                    renderItem={({item}) => (
                        <TouchableOpacity
                        activeOpacity ={0.8}
                            onPress={() =>
                                navigate(item.screen)
                            }>
                            <View style={styles.itemContainer}>
                                <Image source={item.img}
                                        style={styles.mainMenuIcon}/> 
                                <Text style={styles.itemName}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    >
                </FlatGrid>
                </View>
        );
    }
}