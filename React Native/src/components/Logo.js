import React, { memo } from 'react';
import {Image}from 'react-native';
import styles from '../styles/App.style'

const Logo = () => (
  <Image source={require('../assets/Logo.png')} style={styles.diomacLogo} />
);

export default memo(Logo);