using ReactNative.Bridge;
using System.Collections.Generic;

namespace NativeAsyncStorageModule
{
    public class NativeAsyncStorageModulePackage : IReactPackage
    {
        public IReadOnlyList<INativeModule> CreateNativeModules(ReactApplicationContext reactContext)
        {
            return new List<INativeModule>
            {
                new NativeAsyncStorageModule(reactContext),
            };
        }

        public IReadOnlyList<Type> CreateJavaScriptModulesConfig()
        {
            return new List<Type>(0);
        }

        public IReadOnlyList<IViewManager> CreateViewManagers(ReactApplicationContext reactContext)
        {
            return new List<IViewManager>(0);
        }
    }
}
