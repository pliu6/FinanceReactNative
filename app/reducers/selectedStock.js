'use strict'

const selectedStock = (state = 'FB', action) => {
  switch (action.type) {
    case 'SELECT_STOCK':
      return action.symbol;
    default:
      return state;
  }
};

export default selectedStock;