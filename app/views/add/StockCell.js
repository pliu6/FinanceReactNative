import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { addStock } from '../../actions';

const StockCell = ({symbol, exchange, name, addStock}) => (
  <TouchableHighlight onPress={() => addStock(symbol, exchange, name)} underlayColor="#202020">
    <View style={styles.container}>
      <View style={styles.stock}>
        <View style={styles.symbol}>
          <Text style={styles.symbolText}>
            {symbol}
          </Text>
          <Text style={styles.marketText}>
            {exchange}
          </Text>
        </View>
        <View style={styles.name}>
          <Text style={styles.nameText}>
            {name}
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 65,
    backgroundColor: 'black',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  stock: {
    flex: 8,
    flexDirection: 'column',
  },
  symbol: {
    flex: 1,
    flexDirection: 'row',
  },
  symbolText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  marketText: {
    fontSize: 15,
    color: '#A6A6A6',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  name: {
    flex: 1,
  },
  nameText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addStock: (symbol, exchange, name) => {
      dispatch(addStock(symbol, exchange, name));
      Actions.pop();
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(StockCell);
