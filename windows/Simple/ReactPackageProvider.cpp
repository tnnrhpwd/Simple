#include "pch.h"
#include "ReactPackageProvider.h"
#include "NativeModules.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::Simple::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
    AddAttributedModules(packageBuilder, true);
}
    // This code below makes the app crash, but I think it may be required for Native Module Implementation. 
    // void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
    // {
    //     packageBuilder.AddModule(L"MouseClickModule", winrt::make<MouseClickModule>());
    // }

}
