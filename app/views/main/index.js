import React from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';

import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

// View Elements
import StockPage from './StockPage';
import ChartPage from './ChartPage';
import FooterPage from './FooterPage';
import DetailsPage from './DetailsPage';
import NewsPage from './NewsPage';

const Main = () => (
  <View style={styles.container}>
    { Platform.OS === 'ios' && <View style={styles.statusBar}/> }
    <StockPage/>
    <View style={styles.detailedBlock}>
      <IndicatorViewPager
        style={{flex: 1}}
        indicator={(
          <PagerDotIndicator
            pageCount={3}
          />)}>
        <View>
          <DetailsPage/>
        </View>
        <View>
          <ChartPage/>
        </View>
        <View>
          <NewsPage/>
        </View>
      </IndicatorViewPager>
    </View>
    <FooterPage/>
  </View>
);

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
  }
});

export default Main;
