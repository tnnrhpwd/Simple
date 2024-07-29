import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';

export interface MouseClickModule extends TurboModule {
  clickLeftMouseButton: () => void;
}

const MouseClickModule =
  TurboModuleRegistry.get<MouseClickModule>('MouseClickModule');

export default MouseClickModule;
