'use strict'

import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Linking,
  Text,
  View
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const _FooterPage = ({selectedStock, onSettingButtonPressed}) => (
  <View style={styles.footerBlock}>
    <TouchableHighlight
      style={styles.yahoo}
      onPress={() => Linking.openURL(
        'http://finance.yahoo.com/q?s=' + selectedStock
      ).catch(err => console.error('An error occurred', err))}
      underlayColor="#202020">
      <Text style={styles.yahooText}>
        Yahoo!
      </Text>
    </TouchableHighlight>
    <View style={styles.footerMiddle}>
      <Text style={styles.marketTimeText}>
        Market closed
      </Text>
    </View>
    <TouchableHighlight
      style={styles.settings}
      onPress={onSettingButtonPressed}
      underlayColor="#202020">
      <Icon name="menu" color="white" size={22} />
    </TouchableHighlight>
  </View>
);

_FooterPage.propTypes = {
  onSettingButtonPressed: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  footerBlock: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#202020',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  yahoo: {
    flex: 1,
  },
  yahooText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
  footerMiddle: {
    flex: 1,
  },
  marketTimeText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'center',
  },
  settings: {
    flex: 1,
    alignItems: 'flex-end',
  }
});

const mapStateToProps = (state) => {
  return {
    selectedStock: state.selectedStock,
    onSettingButtonPressed: ()=>Actions.settings
  };
};

const FooterPage = connect(
  mapStateToProps
)(_FooterPage);

export default FooterPage;
