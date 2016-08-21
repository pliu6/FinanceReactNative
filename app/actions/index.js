'use strict'

export const addStock = (symbol) => {
  return {
    type: 'ADD_STOCK',
    symbol: toUpperCase(symbol)
  };
};

export const removeStock = (symbol) => {
  return {
    type: 'REMOVE_STOCK',
    symbol: symbol
  };
};

export const updateQuote = (symbol, quote) => {
  return {
    type: 'UPDATE_QUOTE',
    symbol: symbol,
    quote: quote
  };
};

export const selectStock = (symbol) => {
  return {
    type: 'SELECT_STOCK',
    symbol: symbol
  };
};

export const selectProperty = (property) => {
  return {
    type: 'SELECT_PROPERTY',
    property: property
  };
};

export const selectTimespan = (timespan) => {
  return {
    type: 'SELECT_TIMESPAN',
    timespan: timespan
  };
};