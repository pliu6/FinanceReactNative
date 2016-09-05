'use strict'

// A quote is an object { Change, ChangeinPercent, MarketCapitalization }
const stockNews = (stockNews={isFetching: false, news: {}}, action) => {
  switch (action.type) {
    case 'RECEIVED_NEWS': {
      return Object.assign({}, stockNews,
        {
          isFetching: false,
          news: {
            [action.symbol]: action.news
          }
       });
    }
    case 'REQUEST_NEWS': {
      return Object.assign({}, stockNews, {isFetching: true});
    }
    default:
      return stockNews;
  }
};

export default stockNews;
