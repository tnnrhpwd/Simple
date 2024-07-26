using ReactNative.Bridge;
using System.Collections.Generic;

namespace MouseClickModule
{
    public class MouseClickPackage : IReactPackage
    {
        public IReadOnlyList<INativeModule> CreateNativeModules(ReactApplicationContext reactContext)
        {
            return new List<INativeModule>
            {
                new MouseClickModule(reactContext),
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
