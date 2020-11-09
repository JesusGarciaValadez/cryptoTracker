import React, {Component} from 'react';
import {View, TextInput, Platform, StyleSheet} from 'react-native';
import Colors from '../../res/colors';

class CoinSearch extends Component {
  state = {
    query: '',
  };

  handleText = (query) => {
    this.setState({query});

    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };

  render() {
    const {query} = this.state;

    return (
      <View>
        <TextInput
          style={[
            styles.textInput,
            Platform.OS === 'ios'
              ? styles.textInputIos
              : styles.textInputAndroid,
          ]}
          onChangeText={this.handleText}
          value={query}
          placeholder="Search coin"
          placeholderTextColor={Colors.zircon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.charade,
    color: Colors.white,
    height: 46,
    paddingLeft: 16,
  },
  textInputAndroid: {
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 2,
  },
  textInputIos: {
    backgroundColor: Colors.blackPearl,
    borderRadius: 8,
    margin: 8,
  },
});

export default CoinSearch;
