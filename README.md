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

7. Add a button, action creator, and update the reducer so we can check that our logger and immutable store are working.

   Create `/src/actions/index.js`:
   ```javascript
   export const buttonPush = () => {
     return { type: 'button_push' };
   }
   ```

   Connect our Test component to the Redux store with `connect` and add a button to the Test component that triggers the `buttonPush` action:

   `Test.js` now looks like
   ```javascript
   import React, { Component } from 'react';
   import { View, Text, Button, StyleSheet } from 'react-native';
   import { connect } from 'react-redux';
   import { buttonPush } from '../actions';

   class Test extends Component {
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
   ```

8. We now have a button that triggers an action defined by our action creator. Let's open the debugger to see what happens!

   In the iOS simulator, press CMD + D to open the debug menu and select "Debug JS Remotely".

   OR

   In the Android emulator, press CMD + M to open the debug menu and select "Debug JS Remotely".

   Open the developer console in your browser (starting the remote debugger should have opened a new tab in your default browser).

   Press the button we created in the app and you should see the previous state, action, and next state. Note that the state isn't modified yet since our reducer doesn't do anything.

9. Test the reducer!

   We will need to tell our dummy reducer to listen for the `"button_push"` action. We don't want to type this everywhere, so let's first refactor this into a constant that lives in a separate file with the rest of our action types.

   Create `/src/actions/types.js` and add a constant for our action type:
   ```javacript
   export const BUTTON_PUSH = 'button_push';
   ```

   Update our action creator to use this constant instead of the string.

   `/src/actions/index.js` now looks like
   ```javascript
   import { BUTTON_PUSH } from './types';

   export const buttonPush = () => {
     return { type: BUTTON_PUSH };
   }
   ```

   Update the store when the BUTTON_PUSH action is triggered.

   `/src/reducers/index.js` now looks like
   ```javascript
   import { combineReducers } from 'redux';
   import { BUTTON_PUSH } from '../actions/types';

   const INITIAL_STATE = { buttonPressed: false };

   export default combineReducers({
     dummy: (state = INITIAL_STATE, action) => {
       switch (action.type) {
         case BUTTON_PUSH:
           state.buttonPressed = true;
           return state;

         default:
           return state;
       }
     }
   });
   ```

   Reload the app (CMD + R on iOS or R, R on Android - or open the debug menu like we did before and click Reload).

   Press the button. Woops, we get an error!
   ```
   A state mutation was detected inside a dispatch, in the path: `dummy.buttonPressed`. Take a look at the reducer(s) handling the action {"type":"button_push"}.`
   ```

   It looks like `redux-immutable-state-invariant` is working! We should never mutate the state in React. Let's fix our reducer:

   ```javascript
   import { combineReducers } from 'redux';
   import { BUTTON_PUSH } from '../actions/types';

   const INITIAL_STATE = { buttonPressed: false };

   export default combineReducers({
     dummy: (state = INITIAL_STATE, action) => {
       switch (action.type) {
         case BUTTON_PUSH:
           return { ...state, buttonPressed: true };

         default:
           return state;
       }
     }
   });
   ```

   Now when we reload the app and click the button, we should see the following in the debugger (your timestamp will be different ;)

   ```
   action @ 14:51:13.834 button_push
     prev state     Object
                        dummy: Object
                            buttonPressed: false
     action         Object
                        type: "button_push"
     next state     Object
                        dummy: Object
                            buttonPressed: true
   ```

10. Let's write some tests! Starting with our action creator...

   Create `/__tests__/actions/index-test.js` to test our action creator.

   ```javascript
   import * as actions from '../../src/actions';
   import * as types from '../../src/actions/types';

   describe('actions', () => {
     it('should create an action to push a button', () => {
       const expectedAction = { type: types.BUTTON_PUSH };

       expect(actions.buttonPush()).toEqual(expectedAction);
     });
   });
   ```

   Go ahead and remove `__tests__/index.android.js` and `__tests__/index.ios.js` since those files are now just boilerplate.

   Run `npm test` and our action creator test should pass.

11. We can't really test our reducer as it is simply an anonymous function. Let's refactor it!

   Create `/src/reducers/DummyReducer.js` and move our reducer logic there:
   ```javascript
   import { BUTTON_PUSH } from '../actions/types';

   const INITIAL_STATE = { buttonPressed: false };

   export default (state = INITIAL_STATE, action) => {
     switch (action.type) {
       case BUTTON_PUSH:
         return { ...state, buttonPressed: true };

       default:
         return state;
     }
   }
   ```

   Next, we need to update `/src/reducers/index.js` to pull in the DummyReducer:
   ```javascript
   import { combineReducers } from 'redux';
   import DummyReducer from './DummyReducer';

   export default combineReducers({
     dummy: DummyReducer
   });
   ```

12. Test our reducer.

   Create `/__tests__/reducers/DummyReducer-test.js` to test our reducer:
   ```javascript
   import reducer from '../../src/reducers/DummyReducer';
   import * as types from '../../src/actions/types';

   describe('DummyReducer', () => {
     const INITIAL_STATE = { buttonPressed: false };

     it('should return the initial state', () => {
       // When the app first mounts, the state is undefined
       // Simulate this with an empty action object and we should get
       // a response that looks exactly like our INITIAL_STATE object.
       const previousState = undefined;
       const action = {};
       const expectedState = INITIAL_STATE;

       expect(reducer(previousState, action))
         .toEqual(expectedState);
     });

     it('Should handle BUTTON_PUSH', () => {
       const previousState = INITIAL_STATE;
       const action = { type: types.BUTTON_PUSH };
       const expectedState = { buttonPressed: true };

       expect(reducer(previousState, action))
         .toEqual(expectedState);
     });
   });
   ```

13. We deleted the default index tests, so let's write a test for our App component.

   Create `/__tests__/App-test.js` with the following code:
   ```javascript
   import 'react-native';
   import React from 'react';
   import App from '../src/App';

   // Note: test renderer must be required after react-native.
   import renderer from 'react-test-renderer';

   it('renders correctly', () => {
     const tree = renderer.create(
       <App />
     );
   });
   ```

   It's not doing much since our app component is just an entry point and we don't want to test third party libraries.

14. Before we can test our Test component, we need to also export the undecorated component - otherwise we're testing the `connect` higher order component.

   Export the Test class in `/src/components/Test.js`:
   ```javascript
   export class Test extends Component ...
   ```
