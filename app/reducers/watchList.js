'use strict'

const watchList = (list = [{symbol: 'FB'}], action) => {
  switch (action.type) {
    case 'ADD_STOCK':
      return [...list, {
        symbol: action.symbol
      }];

    case 'REMOVE_STOCK':
      var index = list.indexOf(action.symbol);
      return [
        ...list.slice(0, index),
        ...list.slice(index+1)
      ];

    default:
      return list;
  }
};

export default watchList;