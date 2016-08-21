'use strict'

import React, {PropTypes} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Timespan from './Timespan';

const ChartHeader = ({ activeTimespan, onTimespanClick }) => (
  <View style={styles.timespanGroup}>
    <Timespan
      onPress = {() => onTimespanClick('1D')}
      active = {activeTimespan === '1D'}
      text = {'1D'}/>
    <Timespan
      onPress = {() => onTimespanClick('5D')}
      active = {activeTimespan === '5D'}
      text = {'5D'}/>
    <Timespan
      onPress = {() => onTimespanClick('1M')}
      active = {activeTimespan === '1M'}
      text = {'1M'}/>
    <Timespan
      onPress = {() => onTimespanClick('3M')}
      active = {activeTimespan === '3M'}
      text = {'3M'}/>
    <Timespan
      onPress = {() => onTimespanClick('6M')}
      active = {activeTimespan === '6M'}
      text = {'6M'}/>
    <Timespan
      onPress = {() => onTimespanClick('1Y')}
      active = {activeTimespan === '1Y'}
      text = {'1Y'}/>
    <Timespan
      onPress = {() => onTimespanClick('2Y')}
      active = {activeTimespan === '2Y'}
      text = {'2Y'}/>
    <Timespan
      onPress = {() => onTimespanClick('5Y')}
      active = {activeTimespan === '5Y'}
      text = {'5Y'}/>
  </View>
);

ChartHeader.propTypes = {
  onTimespanClick: PropTypes.func.isRequired,
  activeTimespan: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  timespanGroup: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default ChartHeader;