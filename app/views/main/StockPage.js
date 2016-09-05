'use strict'

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl
} from 'react-native';

import { connect } from 'react-redux';
import { selectStock, selectProperty, fetchQuotesIfNeeded } from '../../actions';

import StockCell from './StockCell';

class StockPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };
    this.state.dataSource = this.state.dataSource.cloneWithRows(this.props.stockList);

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { dispatch, stockList } = this.props;
    dispatch(fetchQuotesIfNeeded(stockList.map((item)=>item.symbol)));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stockList !== this.props.stockList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.stockList)
      });

      var newSymbols = nextProps.stockList.map((stock) => stock.symbol);
      var oldSymbols = this.props.stockList.map((stock) => stock.symbol);
      newSymbols.sort();
      oldSymbols.sort();
      if (newSymbols.length !== oldSymbols.length ||
          !newSymbols.every((element, index) =>
            (element === oldSymbols[index]))) {
        const { dispatch } = this.props;
        dispatch(fetchQuotesIfNeeded(newSymbols));
      }
    }
  }

  onRefresh() {
    const { dispatch, stockList} = this.props;
    dispatch(fetchQuotesIfNeeded(stockList.map((item)=>item.symbol)));
  }

  render() {
    const { isFetching, quotes, selectedStock, selectedProperty, onSelectStock, onSwitchProperty } = this.props;
    return (
      <View style={styles.stocksBlock}>
        <ListView
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              refreshing={isFetching}/>
          }
          dataSource={this.state.dataSource}
          renderRow={ (stock) =>
            <StockCell
              stockSymbol={stock.symbol}
              lastTradePrice={stock.lastTradePrice}
              change={stock.change}
              changeInPercent={stock.changeInPercent}
              marketCapitalization={stock.marketCapitalization}
              selectedProperty={selectedProperty}
              selected={selectedStock === stock.symbol}
              onSelectStock={onSelectStock}
              onSwitchProperty={onSwitchProperty}/> }/>
      </View>
    )
  }
}

StockPage.propTypes = {
  stockList: PropTypes.arrayOf(PropTypes.object),
  selectedStock: PropTypes.string,
  selectedProperty: PropTypes.string,
  isFetching: PropTypes.bool,
  quotes: PropTypes.object,
  onSelectStock: PropTypes.func.isRequired,
  onSwitchProperty: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  stocksBlock: {
    flexDirection: 'column',
    flex: 9,
  }
});

const mapStateToProps = (state) => {
  let quotes = state.stockQuotes.quotes;
  let stockList = state.watchList.map((stock) => {
    let symbol = stock.symbol;
    return {
      symbol: symbol,
      lastTradePrice: quotes && quotes[symbol] && quotes[symbol].LastTradePriceOnly || '--',
      change: quotes && quotes[symbol] && quotes[symbol].Change || '--',
      changeInPercent: quotes && quotes[symbol] && quotes[symbol].ChangeinPercent || '--',
      marketCapitalization: quotes && quotes[symbol] && quotes[symbol].MarketCapitalization || '--'
    }
  });

  return {
    stockList: stockList,
    isFetching: state.stockQuotes.isFetching,
    selectedStock: state.selectedStock,
    selectedProperty: state.selectedProperty
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
    },
    dispatch: dispatch
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockPage);
