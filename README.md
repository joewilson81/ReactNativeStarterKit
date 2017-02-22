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

   Create `/src/reducers/index.js` and add a dummy reducer for now so we can get the store up and running.

   Create a Redux store in `/src/App.js` and assign it to the Provider via props.

   Test that everything is working:
   `react-native run-ios` To check in iOS
   `react-native run-android` (while the Android emulator is running) to check in Android

4. It is nice to see when Redux actions are triggered and view the state before and after each action, so let's set up `redux-logger`

   `npm i redux-logger --save-dev`

   Add the logger to the middleware for development only.

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
