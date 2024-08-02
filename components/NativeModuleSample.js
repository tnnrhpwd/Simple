import React, { Component } from 'react';
import { AppRegistry, Alert, Text, View, Button } from 'react-native';

import FancyMath from '../NativeFancyMath';
import { NativeEventEmitter } from 'react-native';

const FancyMathEventEmitter = new NativeEventEmitter(FancyMath);

class NativeModuleSample extends Component {
  componentDidMount() {
    // Subscribing to FancyMath.AddEvent
    FancyMathEventEmitter.addListener('AddEvent', eventHandler, this);
  }

  componentWillUnmount() {
    // Unsubscribing from FancyMath.AddEvent
    FancyMathEventEmitter.removeListener('AddEvent', eventHandler, this);
  }

  eventHandler(result) {
    console.log('Event was fired with: ' + result);
  }

  _onPressHandler() {
    // Calling FancyMath.add method
    FancyMath.add(
      /* arg a */ FancyMath.getConstants().Pi,
      /* arg b */ FancyMath.E,
      /* callback */ function (result) {
        Alert.alert(
          'FancyMath',
          `FancyMath says ${FancyMath.getConstants().Pi} + ${
            FancyMath.getConstants().E
          } = ${result}`,
          [{ text: 'OK' }],
          { cancelable: false },
        );
      });
  }

  render() {
    return (
      <View>
        {/* <Text>FancyMath says PI = {FancyMath.getConstants().Pi}</Text> */}
        {/* <Text>FancyMath says E = {FancyMath.getConstants().E}</Text> */}
        <Button onPress={this._onPressHandler} title="Click me!" />
      </View>
    );
  }
}

export default NativeModuleSample;
