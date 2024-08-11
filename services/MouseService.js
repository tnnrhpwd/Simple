import { NativeModules } from 'react-native';

const { MouseClickModule } = NativeModules;

const MouseService = {
  simulateClick: (x, y) => {
    try {
      MouseClickModule.SimulateClick(x, y);
    } catch (error) {
      console.error('Mouse click simulation failed:', error);
    }
  },
  // Add other mouse simulation-related methods as needed
};

export default MouseService;
