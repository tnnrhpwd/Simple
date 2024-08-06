import { NativeModules } from 'react-native';

const { MouseClickModule } = NativeModules;

export default {
  click: () => MouseClickModule.Click(),
};
