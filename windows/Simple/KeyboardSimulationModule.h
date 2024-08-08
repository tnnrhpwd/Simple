// KeyboardSimulationModule.h
#pragma once;
#include "pch.h"
#include "Generated Files/winrt/Microsoft.ReactNative.h"
#include <winrt/Windows.UI.Core.h>
#include <winrt/Microsoft.ReactNative.h>

namespace winrt::Microsoft::ReactNative {

namespace NativeModules {

class KeyboardSimulationModule {
public:
    void Initialize(IReactContext const& reactContext);
    void TypeText(hstring const& text);
    // IReactHost Host() const noexcept;

private:
    IReactContext m_reactContext{ nullptr };
};

}
}
