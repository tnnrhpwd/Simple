#pragma once

#include "pch.h"
#include <winrt/Windows.UI.Xaml.Controls.h>
#include <winrt/Windows.UI.Xaml.Navigation.h>

namespace winrt::MyApp::implementation {

    class MainPage : public winrt::Windows::UI::Xaml::Controls::Page
    {
    public:
        MainPage();

    private:
        void OnNavigatedTo(winrt::Windows::UI::Xaml::Navigation::NavigationEventArgs const& e);
        void OnNavigatedFrom(winrt::Windows::UI::Xaml::Navigation::NavigationEventArgs const& e);
    };

}

namespace winrt::MyApp::factory_implementation {

    struct MainPage : MainPageT<MainPage, implementation::MainPage>
    {
    };

}
