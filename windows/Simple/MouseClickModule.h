#pragma once

#include "winrt/Microsoft.ReactNative.h"

namespace winrt::Simple::implementation {
    struct MouseClickModule : winrt::implements<MouseClickModule, winrt::Microsoft::ReactNative::IReactContext>
    {
        MouseClickModule();
        void clickLeftMouseButton();

        // Update to correct type
        winrt::Microsoft::ReactNative::LoadingState LoadingState();
    };
}
