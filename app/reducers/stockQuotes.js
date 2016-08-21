'use strict'

// A quote is an object { Change, ChangeinPercent, MarketCapitalization }
const stockQuotes = (stockQuotes={}, action) => {
  switch (action.type) {
    case 'UPDATE_QUOTE':
      return Object.assign({}, stockQuotes, {
        [action.symbol]: action.quote
      });
    default:
      return stockQuotes;
  }
};

export default stockQuotes;