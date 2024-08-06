#include "pch.h"
#include "MouseClickModule.h"
#include <winrt/Windows.UI.Input.h>
#include <winrt/Windows.UI.Core.h>

using namespace winrt;
using namespace Windows::UI::Input;
using namespace Windows::UI::Core;

namespace NativeModules {

void MouseClickModule::Initialize(winrt::Microsoft::ReactNative::ReactContext const& reactContext) {
    m_reactContext = reactContext;
}

void MouseClickModule::Click() {
    auto dispatcher = CoreWindow::GetForCurrentThread().Dispatcher();
    dispatcher.RunAsync(CoreDispatcherPriority::Normal, []() {
        PointerPointProperties properties = PointerPointProperties();
        properties.IsLeftButtonPressed(true);
        // Simulate a mouse click event here
    });
}

winrt::Microsoft::ReactNative::ReactNativeHost Host() noexcept {
    return m_reactContext.Host();
}

} // namespace NativeModules
