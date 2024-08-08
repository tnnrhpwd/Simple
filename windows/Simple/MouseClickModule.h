// MouseClickModule.h
#pragma once
#include "pch.h"
#include "Generated Files/winrt/Microsoft.ReactNative.h"
#include <winrt/Microsoft.ReactNative.h>

namespace winrt::Microsoft::ReactNative {

namespace NativeModules {

class MouseClickModule {
public:
    void Initialize(IReactContext  const& reactContext);
    void Click();

private:
    IReactContext m_reactContext{ nullptr };
};

}
}