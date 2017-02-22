# React Native Starter Kit

## Part I: I should have picked a better name

I found a few starter kits online, but they were almost all using an older version of React Native. I felt it was better to list the steps to get my ideal baseline React Native app up and running with the latest versions.

Although I named this project ReactNativeStarterKit, it is more of a list of steps to take rather than an actual starter kit that should be cloned.

## Part II: Requirements

If you have already set up React Native, skip to Part III.

I'm not going to recreate the steps to set up React Native, so head on over to [their site to get set up](https://facebook.github.io/react-native/docs/getting-started.html#content).

## Part III: Commands to get this app up and running

1. Initialize a new React Native project: `react-native init ReactNativeStarterKit`

2. I'm assuming we're going to use Redux, so let's install it: `npm i redux --save`

   We also need React-Redux: `npm i react-redux --save`

3. Set up the folder structure. This is entirely based on personal preference and convenience.

   Create `/src/App.js`

      Edit `index.ios.js` and `index.android.js` to register the component with `/src/App.js`

      Create a React-Redux Provider in `/src/App.js`

      Create a Redux store in `/src/App.js` and assign it to the Provider via props.

   `App.js` should look like this
   ```javascript
   import React, { Component } from 'react';
   import { Provider } from 'react-redux';
   import { createStore } from 'redux';
   import { View, Text, StyleSheet } from 'react-native';
   import reducers from './reducers';

   class App extends Component {
     render() {
       const store = createStore(reducers);
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
   ```

   Create `/src/reducers/index.js` and add a dummy reducer for now so we can get the store up and running:

   ```javascript
   import { combineReducers } from 'redux';

   export default combineReducers({
     dummy: (state = {}, action) => {
       // Our dummy reducer doesn't do anything
       return state;
     }
   });
   ```


   Test that everything is working:
   `react-native run-ios` To check in iOS
   `react-native run-android` (while the Android emulator is running) to check in Android

4. It is nice to see when Redux actions are triggered and view the state before and after each action, so let's set up `redux-logger`

   `npm i redux-logger --save-dev`

   Add the logger to the middleware for development only.

   `App.js` should look like this
   ```javascript
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
   ```

5. While we're at it, we don't want the store to be mutated. Install `redux-immutable-state-invariant`:

   `npm i redux-immutable-state-invariant --save-dev`

   And add the middleware to the redux store.

   `App.js` should look like this
   ```javascript
   class App extends Component {
     render() {
       const middleware = [];

       // Only apply the following middleware in development!
       if (process.env.NODE_ENV !== 'production') {
         middleware.push(require('redux-logger')());
         middleware.push(require('redux-immutable-state-invariant')());
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
   ```

6. We're headed down a gnarly path with App.js defining the store, middleware, and view composition. We want to add some actions and a button to test the middleware we have added, but now would be a good time to refactor. Let's break the view out into a new component called Test.

   Create `/src/components/Test.js` and move the view logic from `App.js` into `Test.js`

   `App.js` now looks like
   ```javascript
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
   ```

   `Test.js` looks like
   ```javascript
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
   ```

   Now `App.js` is much cleaner!
