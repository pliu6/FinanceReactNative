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
    this.state.dataSource = this.state.dataSource.cloneWithRows(this.props.watchList);
    this.state.key = Math.random();

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { dispatch, watchList } = this.props;
    dispatch(fetchQuotesIfNeeded(watchList.map((item)=>item.symbol)));
    this.state.key = Math.random();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.watchList !== this.props.watchList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.watchList)
      });
      const { dispatch } = this.props;
      dispatch(fetchQuotesIfNeeded(nextProps.watchList.map((item)=>item.symbol)));
      this.state.key = Math.random();
    }
  }

  onRefresh() {
    const { dispatch, watchList} = this.props;
    dispatch(fetchQuotesIfNeeded(watchList.map((item)=>item.symbol)));
    this.state.key = Math.random();
  }

  render() {
    const { isFetching, quotes, selectedStock, selectedProperty, onSelectStock, onSwitchProperty } = this.props;
    return (
      <View style={styles.stocksBlock}>
        <ListView
          key={this.state.key}
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              refreshing={isFetching}/>
          }
          dataSource={this.state.dataSource}
          renderRow={ (stock) =>
            <StockCell
              stockSymbol={stock.symbol}
              lastTradePrice={quotes && quotes[stock.symbol] && quotes[stock.symbol].LastTradePriceOnly || '--'}
              change={quotes && quotes[stock.symbol] && quotes[stock.symbol].Change || '--'}
              changeInPercent={quotes && quotes[stock.symbol] && quotes[stock.symbol].ChangeinPercent || '--'}
              marketCapitalization={quotes && quotes[stock.symbol] && quotes[stock.symbol].MarketCapitalization || '--'}
              selectedProperty={selectedProperty}
              selected={selectedStock === stock.symbol}
              onSelectStock={onSelectStock}
              onSwitchProperty={onSwitchProperty}/> }/>
      </View>
    )
  }
}

StockPage.propTypes = {
  watchList: PropTypes.arrayOf(PropTypes.object),
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
  return {
    watchList: state.watchList,
    isFetching: state.stockQuotes.isFetching,
    selectedStock: state.selectedStock,
    selectedProperty: state.selectedProperty,
    quotes: state.stockQuotes.quotes
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
