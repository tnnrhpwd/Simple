#pragma once

#include <winrt/Windows.UI.Xaml.Markup.h>
#include <winrt/Windows.UI.Xaml.h>

namespace winrt::Windows::UI::Xaml::Markup {

struct IXamlMarkupProvider : IInspectable
{
    IXamlMarkupProvider() noexcept {}
    virtual winrt::Windows::UI::Xaml::IUIElement LoadXaml() const noexcept = 0;
};

struct XamlParseException : winrt::Windows::Foundation::IInspectable
{
    XamlParseException() noexcept {}
    // Define properties and methods related to XAML parse exceptions
};

struct IXamlReader : IInspectable
{
    IXamlReader() noexcept {}
    virtual winrt::Windows::UI::Xaml::IUIElement Load(winrt::hstring const& xaml) const noexcept = 0;
};

struct IXamlWriter : IInspectable
{
    IXamlWriter() noexcept {}
    virtual winrt::hstring Save(winrt::Windows::UI::Xaml::IUIElement const& element) const noexcept = 0;
};

} // namespace winrt::Windows::UI::Xaml::Markup

namespace winrt::Windows::UI::Xaml {

struct XamlApplication : IInspectable
{
    XamlApplication() noexcept {}
    // Define application-related methods and properties
};

} // namespace winrt::Windows::UI::Xaml
