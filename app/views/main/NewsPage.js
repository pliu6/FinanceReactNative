import React from 'react';
import {
  ListView,
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import NewsCell from './NewsCell';
import { fetchNewsIfNeeded } from '../../actions';

class _NewsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchNewsIfNeeded(this.props.selectedStock));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.news && nextProps.news !== this.props.news ) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.news)
      });
    }

    if (nextProps.selectedStock !== this.props.selectedStock) {
      const { dispatch } = this.props;
      dispatch(fetchNewsIfNeeded(this.props.selectedStock));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={ (news) =>
            <NewsCell
              title={news.title}
              link={news.link}
              publishedDate={news.publishedDate}
            />
          }
        />
      </View>
    );
  }
}

_NewsPage.defaultProps = {
  news: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    selectedStock: state.selectedStock,
    news: state.stockNews.news && state.stockNews.news[state.selectedStock]
  };
};

const NewsPage = connect(
  mapStateToProps
)(_NewsPage);

export default NewsPage;
