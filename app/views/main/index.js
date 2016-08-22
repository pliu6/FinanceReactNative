import React from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

// View Elements
import StockPage from './StockPage';
import ChartPage from './ChartPage';
import FooterPage from './FooterPage';
import DetailsPage from './elements/details-page';
import NewsPage from './elements/news-page';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
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
        <FooterPage/>
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
  detailedBlock: {
    flex: 5,
    backgroundColor: '#202020',
    justifyContent: 'space-between',
  },
  loadingText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    marginRight: 10,
    color: 'white',
  },
  marketTimeText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'center',
  }
});
