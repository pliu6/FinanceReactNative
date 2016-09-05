import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import moment from 'moment';

const NewsCell = ({title, link, publishedDate}) => (
  <TouchableHighlight
    onPress={() => Linking.openURL(
      {link}
    ).catch(err => console.error('An error occurred', err))}
    underlayColor="#202020">
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {title}
      </Text>
      <Text style={styles.timeText}>
        {moment(new Date({publishedDate}).format('D/M/YYYY')) + ' at '
          + moment(new Date({publishedDate}).format('LT'))}
      </Text>
    </View>
  </TouchableHighlight>
);

NewsCell.propTypes = {
  //title: PropTypes.string.isRequired,
  //link: PropTypes.string.isRequired,
  //publishedDate: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: '#202020',
  },
  titleText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'left',
  },
  timeText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'left',
  },
});

export default NewsCell;
