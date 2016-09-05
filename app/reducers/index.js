import { combineReducers } from 'redux';
import watchList from './watchList';
import stockQuotes from './stockQuotes';
import stockNews from './stockNews';
import selectedStock from './selectedStock';
import selectedProperty from './selectedProperty';
import selectedTimespan from './selectedTimespan';

const stockApp = combineReducers({
  watchList,
  stockQuotes,
  stockNews,
  selectedStock,
  selectedProperty,
  selectedTimespan
});

export default stockApp;
