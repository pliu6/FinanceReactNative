'use strict'

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl
} from 'react-native';

import { connect } from 'react-redux';
import { selectStock, selectProperty } from '../../actions';

import StockCell from './StockCell';

const _StockPage = ({dataSource, selectedStock, selectedProperty, quotes, onSelectStock, onSwitchProperty}) => (
  <View style={styles.stocksBlock}>
    <ListView
      refreshControl={
        <RefreshControl
          refreshing={false}/>
      }
      dataSource={dataSource}
      renderRow={ (stock) =>
        <StockCell
          stockSymbol={stock.symbol}
          lastTradePrice={quotes[stock.symbol] && quotes[stock.symbol].lastTradePrice || '--'}
          change={quotes[stock.symbol] && quotes[stock.symbol].change || '--'}
          changeInPercent={quotes[stock.symbol] && quotes[stock.symbol].changeInPercent || '--'}
          marketCapitalization={quotes[stock.symbol] && quotes[stock.symbol].marketCapitalization || '--'}
          selectedProperty={selectedProperty}
          selected={selectedStock === stock.symbol}
          onSelectStock={onSelectStock}
          onSwitchProperty={onSwitchProperty}/> }/>
  </View>
);

_StockPage.propTypes = {
  dataSource: PropTypes.object.isRequired,
  selectedStock: PropTypes.string.isRequired,
  quotes: PropTypes.object.isRequired,
  onSelectStock: PropTypes.func.isRequired,
  onSwitchProperty: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  stocksBlock: {
    flexDirection: 'column',
    flex: 9,
  }
});

let dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    dataSource: dataSource.cloneWithRows(state.watchList),
    selectedStock: state.selectedStock,
    selectedProperty: state.selectedProperty,
    quotes: state.stockQuotes
  };
};

const ROTATE_PROPERTIES = {
  Change: 'MarketCapitalization',
  ChangeinPercent: 'Change',
  MarketCapitalization: 'ChangeinPercent',
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectStock: (symbol) => {
      dispatch(selectStock(symbol));
    },
    onSwitchProperty: (currentProperty) => {
      dispatch(selectProperty(ROTATE_PROPERTIES[currentProperty]));
    }
  }
};

const StockPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StockPage);

export default StockPage;