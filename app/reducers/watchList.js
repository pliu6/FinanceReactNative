'use strict'

const watchList = (list = [{ symbol: 'FB', exchange: 'NASDAQ', name: 'Facebook, Inc.' }], action) => {
  switch (action.type) {
    case 'ADD_STOCK':
      return [...list, {
        symbol: action.symbol,
        exchange: action.exchange,
        name: action.name
      }];

    case 'REMOVE_STOCK':
      var index = list.map((stock)=>stock.symbol).indexOf(action.symbol);
      return [
        ...list.slice(0, index),
        ...list.slice(index+1)
      ];

    default:
      return list;
  }
};

export default watchList;
