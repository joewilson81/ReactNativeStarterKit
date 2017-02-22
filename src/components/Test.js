import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Test extends Component {
  render() {
    const { containerStyle, welcomeStyle } = styles;

    return (
      <View style={containerStyle}>
        <Text style={welcomeStyle}>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcomeStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default Test;
