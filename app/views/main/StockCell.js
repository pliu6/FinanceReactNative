'use strict'

import React, {PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const StockCell = ({
  stockSymbol,
  lastTradePrice,
  change,
  changeInPercent,
  marketCapitalization,
  selectedProperty,
  selected,
  onSelectStock,
  onSwitchProperty
}) => (
  <TouchableHighlight
    style={[selected ? styles.selected : null]}
    onPress={ () => onSelectStock(stockSymbol) }
    underlayColor="#808080">
    <View style={[styles.container, selected ? styles.selected : null]}>
      <View style={styles.symbol}>
        <Text style={styles.symbolText}>
          {stockSymbol}
        </Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.priceText}>
          {lastTradePrice}
        </Text>
      </View>
      <TouchableHighlight
        style={(() => {
          switch (change.startsWith('+')) {
            case true:  return styles.changeGreen;
            case false: return styles.changeRed;
            default:    return styles.changeGreen;
          }
        })()}
        onPress={ () => onSwitchProperty(selectedProperty) }
        underlayColor={(() => {
          switch (change.startsWith('+')) {
            case true:  return '#53D769';
            case false: return '#FC3D39';
            default:    return '#53D769';
          }
        })()}>
        <View>
          <Text style={styles.changeText}>
            {(() => {
              switch ({selectedProperty}) {
                case 'Change':               return change;
                case 'ChangeinPercent':      return changeinPercent;
                case 'MarketCapitalization': return marketCapitalization;
                default:                     return change;
              }
            })()}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  </TouchableHighlight>
);

StockCell.propTypes = {
  stockSymbol: PropTypes.string.isRequired,
  lastTradePrice: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  changeInPercent: PropTypes.string.isRequired,
  marketCapitalization: PropTypes.string.isRequired,
  selectedProperty: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelectStock: PropTypes.func.isRequired,
  onSwitchProperty: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#808080',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selected: {
    backgroundColor: '#808080',
  },
  symbol: {
    flex: 3,
  },
  symbolText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  price: {
    flex: 2,
  },
  priceText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  changeRed: {
    backgroundColor: '#FC3D39',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeGreen: {
    backgroundColor: '#53D769',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default StockCell;
