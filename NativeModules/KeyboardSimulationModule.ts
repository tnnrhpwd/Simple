import { NativeModules } from 'react-native';

const { KeyboardSimulationModule } = NativeModules;

export default {
  typeText: (text: string) => KeyboardSimulationModule.TypeText(text), //cannot read property of TypeText of null
};
