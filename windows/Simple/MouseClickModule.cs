using System;
using System.Runtime.InteropServices;
using Microsoft.ReactNative.Managed;

namespace NativeModules
{
    [ReactModule("MouseClickModule")]
    public class MouseClickModule
    {
        [DllImport("user32.dll", CharSet = CharSet.Auto, CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint cButtons, uint dwExtraInfo);

        private const uint MOUSEEVENTF_LEFTDOWN = 0x02;
        private const uint MOUSEEVENTF_LEFTUP = 0x04;

        [ReactMethod("clickLeftMouseButton")]
        public void ClickLeftMouseButton()
        {
            Console.WriteLine("MouseClickModule: clickLeftMouseButton called");
            mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
            mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0);
        }
    }
}
