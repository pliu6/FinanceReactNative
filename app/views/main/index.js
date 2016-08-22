import React from 'react';
import {
  Linking,
  ListView,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Icon from 'react-native-vector-icons/MaterialIcons';

// View Elements
import StockPage from './StockPage';
import ChartPage from './ChartPage';
import DetailsPage from './elements/details-page';
import NewsPage from './elements/news-page';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      refreshing: false,
    }, null);
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.setState({refreshing: false});
  }

  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={3}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        { Platform.OS === 'ios' && <View style={styles.statusBar}/> }
        <StockPage/>
        <View style={styles.detailedBlock}>
          <IndicatorViewPager
            style={{flex: 1}}
            indicator={this._renderDotIndicator()}>
            <View>
              <DetailsPage stock={this.state.selectedStock} watchlistResult={this.state.watchlistResult} />
            </View>
            <View>
              <ChartPage/>
            </View>
            <View>
              <NewsPage stock={this.state.selectedStock} />
            </View>
          </IndicatorViewPager>
        </View>
        <View style={styles.footerBlock}>
          <TouchableHighlight
            style={styles.yahoo}
            onPress={() => Linking.openURL(
              'http://finance.yahoo.com/q?s=' + this.state.selectedStock.symbol
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
            onPress={Actions.settings}
            underlayColor="#202020">
            <Icon name="menu" color="white" size={22} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  statusBar: {
    height: 20,
  },
  stocksBlock: {
    flexDirection: 'column',
    flex: 9,
  },
  detailedBlock: {
    flex: 5,
    backgroundColor: '#202020',
    justifyContent: 'space-between',
  },
  footerBlock: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#202020',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  loadingText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    marginRight: 10,
    color: 'white',
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
  },
  icon: {
    width: 20,
    height: 20,
  },
});
