#include "pch.h"
#include "KeyboardSimulationModule.h"
#include <winrt/Windows.UI.Core.h>

using namespace winrt;
using namespace Windows::UI::Core;

namespace NativeModules {

void KeyboardSimulationModule::Initialize(winrt::Microsoft::ReactNative::ReactContext const& reactContext) {
    m_reactContext = reactContext;
}

void KeyboardSimulationModule::TypeText(hstring const& text) {
    auto dispatcher = CoreWindow::GetForCurrentThread().Dispatcher();
    dispatcher.RunAsync(CoreDispatcherPriority::Normal, [text]() {
        // Simulate keyboard typing here, character by character
    });
}

winrt::Microsoft::ReactNative::ReactNativeHost Host() noexcept {
    return m_reactContext.Host();
}

} // namespace NativeModules
