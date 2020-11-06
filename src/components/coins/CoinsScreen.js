import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import CoinsItem from './CoinsItem';
import CoinSearch from './CoinSearch';
import Http from '../../libs/http';
import Colors from '../../res/colors';

class CoinsScreen extends Component {
  state = {
    coins: [],
    loading: false,
  };

  componentDidMount = async () => {
    this.setState({loading: true});

    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    this.getCoins();

    this.setState({
      coins: res.data,
      loading: false,
    });
  };

  getCoins = async () => {
    this.setState({loading: true});

    const res = await Http.instance.get('https://api.coinlore.net/api/tickers');

    this.setState({
      coins: res.data,
      allCoins: res.data,
      loading: false,
    });
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  handleSearch = (query) => {
    const {allCoins} = this.state;

    const coinsFiltered = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    this.setState({coins: coinsFiltered});
  };

  render() {
    const {coins, loading} = this.state;

    return (
      <View style={styles.container}>
        <CoinSearch onChange={this.handleSearch} />

        {loading ? (
          <ActivityIndicator style={styles.loader} color="#FFF" size="large" />
        ) : null}

        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
