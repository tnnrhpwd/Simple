// MouseClickModule.cpp
#include "pch.h"
#include "MouseClickModule.h"
#include <winrt/Windows.UI.Input.h>
#include <winrt/Windows.UI.Core.h>
#include <Windows.h>

using namespace winrt;
using namespace Windows::UI::Input;
using namespace Windows::UI::Core;
using namespace winrt::Microsoft::ReactNative::NativeModules;

void MouseClickModule::Initialize(winrt::Microsoft::ReactNative::IReactContext const& reactContext) {
    m_reactContext = reactContext;
}

void MouseClickModule::Click() {
    auto dispatcher = CoreWindow::GetForCurrentThread().Dispatcher();
    dispatcher.RunAsync(CoreDispatcherPriority::Normal, []() {
        // INPUT input = {};
        // input.type = INPUT_MOUSE;
        // input.mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
        // SendInput(1, &input, sizeof(INPUT));
        // input.mi.dwFlags = MOUSEEVENTF_LEFTUP;
        // SendInput(1, &input, sizeof(INPUT));
    });
}
