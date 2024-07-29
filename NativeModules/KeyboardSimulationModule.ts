import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';

export interface KeyboardSimulationModule extends TurboModule {
  simulateEnterKeyPress: () => void;
}

const KeyboardSimulationModule =
  TurboModuleRegistry.get<KeyboardSimulationModule>('KeyboardSimulationModule');

export default KeyboardSimulationModule;
