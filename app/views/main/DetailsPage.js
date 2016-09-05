import React, {PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux';

const _DetailsPage = ({
  stockName,
  openPrice,
  marketCapitalization,
  dayHigh,
  yearHigh,
  dayLow,
  yearLow,
  volume,
  averageDailyVolume,
  peRatio,
  dividendYield
}) => (
  <View style={styles.container}>
    <View style={styles.nameBlock}>
      <Text style={styles.nameText}>
        {stockName}
      </Text>
    </View>
    <View style={styles.details}>
      <View style={styles.detailsRow}>
        <View style={styles.detailsRowColumn}>
          <Text style={styles.propertyText}>
            OPEN
          </Text>
          <Text style={styles.valueText}>
            {openPrice}
          </Text>
        </View>
        <View style={styles.detailsRowColumn}>
          <Text style={styles.propertyText}>
            MKT CAP
          </Text>
          <Text style={styles.valueText}>
            {marketCapitalization}
          </Text>
        </View>
      </View>
      <View style={styles.separatorThin}/>

      <View style={styles.detailsRow}>
        <View style={styles.detailsRowColumn}>
          <Text style={styles.propertyText}>
            HIGH
          </Text>
          <Text style={styles.valueText}>
            {dayHigh}
          </Text>
        </View>
        <View style={styles.detailsRowColumn}>
          <Text style={styles.propertyText}>
            52W HIGH
          </Text>
          <Text style={styles.valueText}>
            {yearHigh}
          </Text>
        </View>
      </View>
      <View style={styles.separatorThin}/>

      <View style={styles.detailsRow}>
        <View style={styles.detailsRowColumn}>
          <Text style={styles.propertyText}>
            LOW
          </Text>
          <Text style={styles.valueText}>
            {dayLow}
          </Text>
        </View>
        <View style={styles.detailsRowColumn}>
          <Text style={styles.propertyText}>
            52W LOW
          </Text>
          <Text style={styles.valueText}>
            {yearLow}
          </Text>
        </View>
      </View>
      <View style={styles.separatorThin}/>

      <View style={styles.detailsRow}>
        <View style={styles.detailsRowColumn}>
          <Text style={styles.propertyText}>
            VOL
          </Text>
          <Text style={styles.valueText}>
            {volume}
          </Text>
        </View>
        <View style={styles.detailsRowColumn}>
          <Text style={styles.propertyText}>
            AVG VOL
          </Text>
          <Text style={styles.valueText}>
            {averageDailyVolume}
          </Text>
        </View>
      </View>
      <View style={styles.separatorThin}/>

      <View style={styles.detailsRow}>
        <View style={styles.detailsRowColumn}>
          <Text style={styles.propertyText}>
            P/E
          </Text>
          <Text style={styles.valueText}>
            {peRatio}
          </Text>
        </View>
        <View style={styles.detailsRowColumn}>
          <Text style={styles.propertyText}>
            YIELD
          </Text>
          <Text style={styles.valueText}>
            {dividendYield}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

_DetailsPage.propTypes = {
  stockName: PropTypes.string.isRequired,
  openPrice: PropTypes.string.isRequired,
  marketCapitalization: PropTypes.string.isRequired,
  dayHigh: PropTypes.string.isRequired,
  yearHigh: PropTypes.string.isRequired,
  dayLow: PropTypes.string.isRequired,
  yearLow: PropTypes.string.isRequired,
  volume: PropTypes.string.isRequired,
  averageDailyVolume: PropTypes.string.isRequired,
  peRatio: PropTypes.string.isRequired,
  dividendYield: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameBlock: {
    flex: 1,
    paddingTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
  details: {
    flex: 5,
    flexDirection: 'column',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsRowColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  separatorThin: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A6A6A6',
  },
  propertyText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'left',
  },
  valueText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
  },
});

const mapStateToProps = (state) => {
  //console.log(state);
  let quotes = state.stockQuotes.quotes && state.stockQuotes.quotes[state.selectedStock];

  return {
    stockName: quotes && quotes.Name || '--',
    openPrice: quotes && quotes.Open || '--',
    marketCapitalization: quotes && quotes.MarketCapitalization || '--',
    dayHigh: quotes && quotes.DaysHigh || '--',
    yearHigh: quotes && quotes.YearHigh || '--',
    dayLow: quotes && quotes.DaysLow || '--',
    yearLow: quotes && quotes.YearLow || '--',
    volume: quotes && quotes.Volume || '--',
    averageDailyVolume: quotes && quotes.AverageDailyVolume || '--',
    peRatio: quotes && quotes.PERatio || '--',
    dividendYield: quotes && quotes.DividendYield && quotes.DividendYield + '%' || '--'
  };
};

const DetailsPage = connect(
  mapStateToProps
)(_DetailsPage);

export default DetailsPage;
