'use strict'

import React, {PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

const Timespan = ({onPress, active, text}) => (
  <TouchableHighlight
    style={styles.timespan}
    onPress={onPress}
    underlayColor="#202020">
    <Text style={[active ? styles.timespanSelectedText : styles.timespanText]}>{text}</Text>
  </TouchableHighlight>
);

Timespan.propTypes = {
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  timespan: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timespanText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 10,
  },
  timespanSelectedText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  }
});

export default Timespan;