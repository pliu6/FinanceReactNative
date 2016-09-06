import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import { selectProperty } from '../../actions';

const Footer = ({selectProperty, selectedProperty}) => (
  <View style={styles.bottomBlock}>
    <TouchableHighlight style={[styles.buttonLeft, selectedProperty === 'ChangeinPercent' ? styles.buttonSelected : null]}
        underlayColor="#66CCFF"
        onPress={() => selectProperty('ChangeinPercent')}>
      <Text style={[styles.buttonText, selectedProperty === 'ChangeinPercent' ? styles.buttonTextSelected : null]}>
        percentage
      </Text>
    </TouchableHighlight>
    <TouchableHighlight style={[styles.buttonMiddle, selectedProperty === 'Change' ? styles.buttonSelected : null]}
        underlayColor="#66CCFF"
        onPress={() => selectProperty('Change')}>
      <Text style={[styles.buttonText, selectedProperty === 'Change' ? styles.buttonTextSelected : null]}>
        price
      </Text>
    </TouchableHighlight>
    <TouchableHighlight style={[styles.buttonRight, selectedProperty === 'MarketCapitalization' ? styles.buttonSelected : null]}
        underlayColor="#66CCFF"
        onPress={() => selectProperty('MarketCapitalization')}>
      <Text style={[styles.buttonText, selectedProperty === 'MarketCapitalization' ? styles.buttonTextSelected : null]}>
        market cap
      </Text>
    </TouchableHighlight>
  </View>
);

const styles = StyleSheet.create({
  bottomBlock: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonLeft: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center'
  },
  buttonMiddle: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center'
  },
  buttonRight: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center'
  },
  buttonSelected: {
    backgroundColor: '#3CABDA',
  },
  buttonText: {
    fontSize: 14,
    color: '#3CABDA',
    alignSelf: 'center'
  },
  buttonTextSelected: {
    color: 'black',
  }
});

const mapStateToProps = (state) => {
  return {
    selectedProperty: state.selectedProperty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectProperty: (property) => {
      dispatch(selectProperty(property));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
