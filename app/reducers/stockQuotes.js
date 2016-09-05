'use strict'

// A quote is an object { Change, ChangeinPercent, MarketCapitalization }
const stockQuotes = (stockQuotes={ isFetching: false, quotes: {} }, action) => {
  switch (action.type) {
    case 'RECEIVED_QUOTES': {
      let quotes = action.quotes;
      let update = {};
      quotes.forEach(function(quote) {
        update[quote.symbol] = quote;
      });

      return Object.assign({}, stockQuotes,
        {isFetching: false,
         quotes: update});
    }
    case 'REQUEST_QUOTES': {
      return Object.assign({}, stockQuotes, {isFetching: true});
    }
    default:
      return stockQuotes;
  }
};

export default stockQuotes;
