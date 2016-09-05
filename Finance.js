import React from 'react';

import {
  Actions,
  Router,
  Scene,
} from 'react-native-router-flux';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';

import stockApp from './app/reducers';

const loggerMiddleware = createLogger();

let store = createStore(stockApp,
  {
    watchList: [{symbol: 'FB'}, {symbol: 'AAPL'}],
    stockQuotes: {
      isFetching: false,
      quotes: null
    },
    stockNews: {
      isFetching: false,
      news: null
    },
    selectedStock: 'FB',
    selectedProperty: 'ChangeinPercent',
    selectedTimespan: '1D'
  },
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ));

// Views
import MainView from './app/views/main';
import SettingsView from './app/views/settings';
import AddView from './app/views/add';

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = [
  'Warning: In next release empty section headers will be rendered.',
  'Warning: setState(...): Can only update a mounted or mounting component.',
];

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Scene key="main" title="Main" component={MainView} initial={true} />
    <Scene key="settings" direction="vertical" title="Stocks" component={SettingsView} />
    <Scene key="add" direction="vertical" title="Add" component={AddView} />
  </Scene>
);

export default class Periods extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router scenes={scenes} />
      </Provider>
    );
  }
}
