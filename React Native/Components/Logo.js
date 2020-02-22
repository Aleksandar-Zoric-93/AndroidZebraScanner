import React, { memo } from 'react';
import {Image}from 'react-native';
import styles from '../styles/App.style.js'

const Logo = () => (
  <Image source={require('../Assets/Logo.png')} style={styles.diomacLogo} />
);

export default memo(Logo);