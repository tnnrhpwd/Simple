// #include "FileSystemModule.h"
// #include <fstream>
// #include <sstream>

// namespace MyReactNativeWindowsApp {
//   std::string FileSystemModule::ReadFile(std::string filePath) noexcept {
//     std::ifstream file(filePath);
//     if (!file.is_open()) {
//       return "Error: Unable to open file.";
//     }
//     std::stringstream buffer;
//     buffer << file.rdbuf();
//     return buffer.str();
//   }
// }
