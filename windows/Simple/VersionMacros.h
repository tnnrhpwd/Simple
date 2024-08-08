#pragma once

// Define the major, minor, and patch version numbers
#define PROJECT_VERSION_MAJOR 1
#define PROJECT_VERSION_MINOR 0
#define PROJECT_VERSION_PATCH 0

// Define a macro for the full version string
#define PROJECT_VERSION_STRING "1.0.0"

// Conditional compilation based on version numbers
#if PROJECT_VERSION_MAJOR >= 1
    #define VERSION_1_OR_LATER
#endif

#if PROJECT_VERSION_MAJOR >= 2
    #define VERSION_2_OR_LATER
#endif

// Define macros for compatibility with specific features or libraries
#if defined(_WIN32) || defined(_WIN64)
    #define WINDOWS_PLATFORM
#else
    #define NON_WINDOWS_PLATFORM
#endif

#ifdef WINDOWS_PLATFORM
    #include <windows.h>
#endif

// Define macros for feature support
#if PROJECT_VERSION_MAJOR >= 1 && PROJECT_VERSION_MINOR >= 1
    #define FEATURE_X_SUPPORTED
#endif

// Example of feature-specific macros
#ifdef FEATURE_X_SUPPORTED
    #define USE_FEATURE_X
#else
    #define USE_DEFAULT_BEHAVIOR
#endif

// Compatibility with older versions of libraries
#if defined(LIBRARY_VERSION_1_0)
    #define LIBRARY_VERSION_COMPATIBLE
#else
    #define LIBRARY_VERSION_INCOMPATIBLE
#endif
