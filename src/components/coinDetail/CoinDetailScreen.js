import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  StyleSheet,
  FlatList,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import CoinMarketItem from './CoinMarketItem';
import Http from '../../libs/http';
import Storage from '../../libs/storage';
import Colors from '../../res/colors';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    loading: false,
    isFavorite: false,
  };

  componentDidMount() {
    this.setState({loading: true});

    const {coin} = this.props.route.params;

    this.props.navigation.setOptions({title: coin.symbol});

    this.getMarkets(coin.id);

    this.setState({coin}, () => {
      this.getFavorite();
    });
  }

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    await Storage.instance.store(key, coin);
    const stored = await Storage.instance.get(key);

    if (stored) {
      this.setState({isFavorite: true});
    }
  };

  removeFavorite = () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('click');
        },
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;

          const removedKey = await Storage.instance.remove(key);

          if (removedKey) {
            this.setState({isFavorite: false});
          }
        },
        style: 'default',
      },
    ]);
  };

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;

      const favStr = await Storage.instance.get(key);

      if (favStr != null) {
        this.setState({isFavorite: true});
      }
    } catch (err) {
      console.error('Get Favorites err: ', err);
    }
  };

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();

      return;
    }

    this.addFavorite();
  };

  getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
    }
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

    const markets = await Http.instance.get(url);

    this.setState({markets, loading: false});
  };

  getSections = (coin) => {
    const data = [
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24 h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24 h',
        data: [coin.percent_change_24h],
      },
    ];

    return data;
  };

  render() {
    const {coin, markets, loading, isFavorite} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{uri: this.getSymbolIcon(coin.nameid)}}
            />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>

          <Pressable
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}
            onPress={this.toggleFavorite}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add favorite'}
            </Text>
          </Pressable>
        </View>

        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />

        <Text style={styles.marketsTitle}>Markets</Text>

        {loading ? (
          <ActivityIndicator style={styles.loader} color="#FFF" size="large" />
        ) : null}
        <FlatList
          style={styles.list}
          data={markets}
          keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
          renderItem={({item}) => <CoinMarketItem item={item} />}
          horizontal={true}
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
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 60,
  },
  list: {
    maxHeight: 80,
    paddingLeft: 16,
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
});

export default CoinDetailScreen;
