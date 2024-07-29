using System;
using System.Runtime.InteropServices;
using Microsoft.ReactNative.Managed;

namespace NativeModules
{
    [ReactModule("KeyboardSimulationModule")]
    public class KeyboardSimulationModule
    {
        [DllImport("user32.dll", CharSet = CharSet.Auto, CallingConvention = CallingConvention.StdCall)]
        public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, uint dwExtraInfo);

        private const int VK_RETURN = 0x0D;
        private const int KEYEVENTF_KEYUP = 0x02;

        [ReactMethod("simulateEnterKeyPress")]
        public void SimulateEnterKeyPress()
        {
            Console.WriteLine("KeyboardSimulationModule: SimulateEnterKeyPress called");
            keybd_event((byte)VK_RETURN, 0, 0, 0);
            keybd_event((byte)VK_RETURN, 0, KEYEVENTF_KEYUP, 0);
        }
    }
}
