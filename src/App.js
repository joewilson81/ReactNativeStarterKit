import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { View, Text, StyleSheet } from 'react-native';
import reducers from './reducers';

class App extends Component {
  render() {
    const middleware = [];

    // Only apply the following middleware in development!
    if (process.env.NODE_ENV !== 'production') {
      middleware.push(require('redux-logger')());
    }

    const store = createStore(reducers, {}, applyMiddleware(...middleware));
    const { containerStyle, welcomeStyle } = styles;

    return (
      <Provider store={store}>
        <View style={containerStyle}>
          <Text style={welcomeStyle}>
            Welcome to React Native!
          </Text>
        </View>
      </Provider>
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


export default App;
