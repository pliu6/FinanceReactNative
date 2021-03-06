'use strict'

import React, { PropTypes } from 'react';
import {
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Actions } from 'react-native-router-flux';

const Toolbar = ({ title }) => (
  <Icon.ToolbarAndroid
    style={styles.toolbar}
    title={title}
    titleColor="white"
    actions={[
      {title: 'Add', iconName: 'add', iconSize: 26, show: 'always'},
      {title: 'Done', iconName: 'check', iconSize: 26, show: 'always'},
    ]}
    onActionSelected={(position) => {
      if (position === 0) {  // index of 'Add'
        Actions.add();
      } else if (position === 1) {  // index of 'Done'
        Actions.pop();
      }
    }}
  />
);

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: '#202020'
  }
});

export default Toolbar;
