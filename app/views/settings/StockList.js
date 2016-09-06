import React from 'react';
import {
  ListView,
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import { removeStock } from '../../actions';
import StockCell from './StockCell';

class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };
    this.state.dataSource = this.state.dataSource.cloneWithRows(this.props.stockList);

    this.deleteStock = this.deleteStock.bind(this);
  }

  deleteStock (symbol) {
    const { dispatch } = this.props;
    dispatch(removeStock(symbol));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stockList !== this.props.stockList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.stockList)
      });
    }
  }

  render() {
    return (
      <View style={styles.stockList}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(stock) =>
            <StockCell
              stockSymbol={stock.symbol}
              stockExchange={stock.exchange}
              name={stock.name}
              deleteStock={this.deleteStock}/>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stockList: {
    flex: 1
  }
});

const mapStateToProps = (state) => {
  return {
    stockList: state.watchList,
  };
};

export default connect(
  mapStateToProps
)(StockList);
