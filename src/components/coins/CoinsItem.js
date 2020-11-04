import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CoinItem = ({ item }) => {
    return (
        <View>
            <Text>{item.name}</Text>
            <Text>{item.symbol}</Text>
        </View>
    );
}

export default CoinItem;