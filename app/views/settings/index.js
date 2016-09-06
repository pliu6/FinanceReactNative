import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Toolbar from './Toolbar';
import StockList from './StockList';
import Footer from './Footer';

export default Setting = ({title}) => (
  <View style={styles.container}>
    <Toolbar title={title} />
    <StockList/>
    <Footer/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
});
