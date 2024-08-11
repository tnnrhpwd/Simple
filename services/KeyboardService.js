import { NativeModules } from 'react-native';

const { KeyboardSimulationModule } = NativeModules;

const KeyboardService = {
  simulateTyping: (text) => {
    try {
      KeyboardSimulationModule.SimulateTyping(text);
    } catch (error) {
      console.error('Keyboard typing simulation failed:', error);
    }
  },
  // Add other keyboard simulation-related methods as needed
};

export default KeyboardService;
