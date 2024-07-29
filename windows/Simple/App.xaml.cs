using Microsoft.ReactNative;
using NativeModules;

namespace Simple
{
    sealed partial class App : ReactApplication
    {
        public App()
        {
            PackageProviders.Add(new Microsoft.ReactNative.Managed.ReactPackageProvider()); 
            PackageProviders.Add(new NativeModules.ReactPackageProvider());
        }
    }
}
