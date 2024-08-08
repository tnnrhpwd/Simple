#pragma once

#include "pch.h"
#include <winrt/Windows.UI.Xaml.Controls.h>

namespace winrt::MyNamespace::implementation {

    // CustomControl is a custom control derived from the Control class
    struct CustomControl : winrt::Windows::UI::Xaml::Controls::ControlT<CustomControl>
    {
        // Constructor
        CustomControl();

        // Custom method example
        void SetText(hstring const& text);

        // Custom property example
        hstring Text() const;

    private:
        // Private member to store the text
        hstring m_text;
    };

}

namespace winrt::MyNamespace::factory_implementation {

    struct CustomControl : CustomControlT<CustomControl, implementation::CustomControl>
    {
    };

}
