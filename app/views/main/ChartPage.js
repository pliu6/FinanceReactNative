'use strict'

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { selectTimespan } from '../../actions';

import ChartHeader from './ChartHeader';

const _ChartPage = ({selectedStock, selectedTimespan, onTimespanClick}) => (
  <View style={styles.container}>
    <ChartHeader
      activeTimespan={selectedTimespan}
      onTimespanClick={onTimespanClick}/>

    <View style={styles.chart}>
      <Image
        style={styles.image}
        source={{uri:'https://chart.finance.yahoo.com/z?s=' + selectedStock.toLowerCase()
                     + '&t=' + selectedTimespan.toLowerCase()
                     + '&haha=' + Math.random()}}/>
    </View>
  </View>
);

_ChartPage.propTypes = {
  selectedStock: PropTypes.string.isRequired,
  selectedTimespan: PropTypes.string.isRequired,
  onTimespanClick: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  chart: {
    flex: 4,
  },
  image: {
    flex: 1,
  }
});

const mapStateToProps = (state) => {
  return {
    selectedStock: state.selectedStock,
    selectedTimespan: state.selectedTimespan
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTimespanClick: (timespan) => {
      dispatch(selectTimespan(timespan));
    }
  }
};

const ChartPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ChartPage);

export default ChartPage;
