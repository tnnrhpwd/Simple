import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';

export interface NativeAsyncStorageModule extends TurboModule {
  // simulateEnterKeyPress: () => void;
}

const NativeAsyncStorageModule =
  TurboModuleRegistry.get<NativeAsyncStorageModule>('NativeAsyncStorageModule');

export default NativeAsyncStorageModule;
