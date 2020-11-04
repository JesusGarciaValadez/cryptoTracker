import React, { Component } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import CoinsItem from './CoinsItem';
import Http from '../../libs/http';

class CoinsScreen extends Component
{
    state = {
        coins: [],
        loading: false,
    }

    componentDidMount = async () => {
        this.setState({ loading: true });

        const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');

        this.setState({
            coins: res.data,
            loading: false,
        });
    }

    handlePress = () => {
        console.log('Go to detail', this.props);

        this.props.navigation.navigate('CoinDetail');
    }

    render () {
        const { coins, loading } = this.state;

        return (
            <View 
                style={styles.container}
            >
                { loading 
                    ? <ActivityIndicator 
                        style={styles.loader}
                        color="#FFF" 
                        size="large" 
                    />
                    : null
                }

                <FlatList 
                    data={coins}
                    renderItem={({ item }) => <CoinsItem item={ item } />} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        marginTop: 60
    }
});

export default CoinsScreen;