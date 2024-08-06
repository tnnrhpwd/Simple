#pragma once
#include "pch.h"
#include "Generated Files/winrt/Microsoft.ReactNative.h"

namespace NativeModules {

class KeyboardSimulationModule {
public:
    void Initialize(winrt::Microsoft.ReactNative::ReactContext const& reactContext);
    void TypeText(winrt::hstring const& text);

private:
    winrt::Microsoft.ReactNative::ReactContext m_reactContext{ nullptr };
};

} // namespace NativeModules
