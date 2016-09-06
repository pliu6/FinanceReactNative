import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Toolbar from './Toolbar';
import StockList from './StockList';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      key: Math.random(),
    }, null);
  }

  onStockStoreChange(state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.watchlist),
      watchlistResult: state.watchlistResult,
      selectedProperty: state.selectedProperty,
      key: Math.random(),
    });
  }

  onActionSelected(position) {
    if (position === 0) {  // index of 'Add'
      Actions.add();
    } else if (position === 1) {  // index of 'Done'
      Actions.pop();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar title={this.props.title} />
        <StockList />
        <View style={styles.bottomBlock}>
          <TouchableHighlight style={[styles.buttonLeft, this.state.selectedProperty === 'ChangeinPercent' ? styles.buttonSelected : null]}
              underlayColor="#66CCFF"
              onPress={() => StockActions.selectProperty('ChangeinPercent')}>
            <Text style={[styles.buttonText, this.state.selectedProperty === 'ChangeinPercent' ? styles.buttonTextSelected : null]}>
              percentage
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonMiddle, this.state.selectedProperty === 'Change' ? styles.buttonSelected : null]}
              underlayColor="#66CCFF"
              onPress={() => StockActions.selectProperty('Change')}>
            <Text style={[styles.buttonText, this.state.selectedProperty === 'Change' ? styles.buttonTextSelected : null]}>
              price
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonRight, this.state.selectedProperty === 'MarketCapitalization' ? styles.buttonSelected : null]}
              underlayColor="#66CCFF"
              onPress={() => StockActions.selectProperty('MarketCapitalization')}>
            <Text style={[styles.buttonText, this.state.selectedProperty === 'MarketCapitalization' ? styles.buttonTextSelected : null]}>
              market cap
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  bottomBlock: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonLeft: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center'
  },
  buttonMiddle: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center'
  },
  buttonRight: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center'
  },
  buttonSelected: {
    backgroundColor: '#3CABDA',
  },
  buttonText: {
    fontSize: 14,
    color: '#3CABDA',
    alignSelf: 'center'
  },
  buttonTextSelected: {
    color: 'black',
  },
});
