import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { buttonPush } from '../actions';

export class Test extends Component {
  render() {
    const { containerStyle, welcomeStyle } = styles;

    return (
      <View style={containerStyle}>
        <Text style={welcomeStyle}>
          Welcome to React Native!
        </Text>

        <Button
          title="Trigger the buttonPush action!"
          color="#841584"
          onPress={() => this.props.buttonPush()}
        />
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

export default connect(null, { buttonPush })(Test);
