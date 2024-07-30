using ReactNative;
using ReactNative.Bridge;
using ReactNative.Modules.Core;
using ReactNative.Shell;
using System.Collections.Generic;

namespace Simple
{
    class MainReactNativeHost : ReactNativeHost
    {
        protected override IReadOnlyList<IReactPackage> Packages => new List<IReactPackage>
        {
            new MainReactPackage(),
            new MouseClickPackage(),
            new KeyboardSimulationPackage(),
            new NativeAsyncStorageModulePackage(),
        };
    }
}
