import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Test from './components/Test';

class App extends Component {
  render() {
    const middleware = [];

    // Only apply the following middleware in development!
    if (process.env.NODE_ENV !== 'production') {
      middleware.push(require('redux-logger')());
      middleware.push(require('redux-immutable-state-invariant')());
    }

    const store = createStore(reducers, {}, applyMiddleware(...middleware));


    return (
      <Provider store={store}>
        <Test />
      </Provider>
    );
  }
}

export default App;
