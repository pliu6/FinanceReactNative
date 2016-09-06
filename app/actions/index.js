'use strict'

import { getStock, rss } from '../utils/finance';

export const addStock = (symbol, exchange, name) => {
  return {
    type: 'ADD_STOCK',
    symbol: toUpperCase(symbol),
    exchange: toUpperCase(exchange),
    name: name
  };
};

export const removeStock = (symbol) => {
  return {
    type: 'REMOVE_STOCK',
    symbol: symbol
  };
};

export const updateQuote = (symbol, quote, updatedAt) => {
  return {
    type: 'UPDATE_QUOTE',
    symbol: symbol,
    quote: quote,
    updatedAt: updatedAt
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

const requestQuotes = (stockSymbols) => {
  return {
    type: 'REQUEST_QUOTES',
    symbols: stockSymbols
  };
};

const receiveQuotes = (quotes) => {
  return {
    type: 'RECEIVED_QUOTES',
    quotes: quotes
  };
};

const requestNews = (stockSymbol) => {
  return {
    type: 'REQUEST_NEWS',
    symbol: stockSymbol
  };
};

const receiveNews = (stockSymbol, response) => {
  return {
    type: 'RECEIVED_NEWS',
    symbol: stockSymbol,
    news: response
  }
};

const fetchQuotes = (stockSymbols) => {
  return dispatch => {
    dispatch(requestQuotes(stockSymbols));
    return getStock({stock: stockSymbols}, 'quotes')
      .then(
        response => response.json(),
        (err) => {
          console.log(err);
        }
      )
      .then(json => {
        var quotes = json.query.results.quote;
        quotes = Array.isArray(quotes) ? quotes : [quotes];
        //console.log(quotes);
        dispatch(receiveQuotes(quotes));
      });
  };
};

const shouldFetchQuotes = (state) => {
  //console.log(!state.stockQuotes.isFetching);
  return !state.stockQuotes.isFetching;
};

export const fetchQuotesIfNeeded = (stockSymbols) => {
  return (dispatch, getState) => {
    if (shouldFetchQuotes(getState())) {
      return dispatch(fetchQuotes(stockSymbols));
    }
  };
};

const fetchNews = (stockSymbol) => {
  return dispatch => {
    dispatch(requestNews(stockSymbol));
    return rss(stockSymbol)
      .then(response => dispatch(receiveNews(stockSymbol, response)));
  };
};

const shouldFetchNews = (state) => {
  return !state.stockNews.isFetching;
};

export const fetchNewsIfNeeded = (stockSymbol) => {
  return (dispatch, getState) => {
    if (shouldFetchNews(getState())) {
      return dispatch(fetchNews(stockSymbol));
    }
  };
};
