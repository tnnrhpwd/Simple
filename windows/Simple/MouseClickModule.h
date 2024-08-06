#pragma once
#include "pch.h"
#include "Generated Files/winrt/Microsoft.ReactNative.h"

namespace NativeModules {

class MouseClickModule {
public:
    void Initialize(winrt::Microsoft.ReactNative::ReactContext const& reactContext);
    void Click();

private:
    winrt::Microsoft.ReactNative::ReactContext m_reactContext{ nullptr };
};

} // namespace NativeModules
