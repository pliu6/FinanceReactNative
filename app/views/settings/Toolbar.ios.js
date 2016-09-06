'use strict'

import React, { PropTypes } from 'react';
import {
  StyleSheet
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Actions } from 'react-native-router-flux';

const Toolbar = ({ title }) => (
  <NavigationBar
    statusBar={{tintColor: '#202020', style: 'light-content'}}
    style={styles.navigatorBarIOS}
    title={{title: title, tintColor: 'white'}}
    leftButton={<Icon style={styles.navigatorLeftButton} name="add" size={26} color="#3CABDA" onPress={Actions.add} />}
    rightButton={{
      title: 'Done',
      tintColor: '#3CABDA',
      handler: Actions.pop,
    }}
  />
);

const styles = StyleSheet.create({
  navigatorBarIOS: {
    backgroundColor: '#202020',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#424242',
  },
  navigatorLeftButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 50,
  }
});

export default Toolbar;
