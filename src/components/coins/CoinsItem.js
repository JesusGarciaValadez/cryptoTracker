import React from 'react';
import {View, Text, Pressable, Image, StyleSheet, Platform} from 'react-native';
import Colors from '../../res/colors';

const CoinsItem = ({item, onPress}) => {
  const getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('cryptoTracker/src/assets/arrow_up.png');
    }

    return require('cryptoTracker/src/assets/arrow_down.png');
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.name}</Text>
        <Text style={styles.nameText}>{item.symbol}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.imgIcon} source={getImageArrow()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    marginLeft: (Platform.OS = 'ios' ? 0 : 16),
    paddingLeft: (Platform.OS = 'ios' ? 16 : 0),
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: Colors.white,
    fontSize: 14,
    marginRight: 16,
  },
  priceText: {
    color: Colors.white,
    fontSize: 14,
  },
  percentText: {
    color: Colors.white,
    fontSize: 12,
    marginRight: 8,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinsItem;
