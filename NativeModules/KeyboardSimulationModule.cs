using System.Runtime.InteropServices;
using ReactNative.Bridge;

namespace KeyboardSimulationModule
{
    public class KeyboardSimulationModule : ReactContextNativeModuleBase
    {
        public KeyboardSimulationModule(ReactApplicationContext reactContext) : base(reactContext)
        {
        }

        public override string Name => "KeyboardSimulation";

        [DllImport("user32.dll", CharSet = CharSet.Auto, CallingConvention = CallingConvention.StdCall)]
        private static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, uint dwExtraInfo);

        private const uint KEYEVENTF_KEYUP = 0x0002;

        // Virtual key codes from https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
        private const byte VK_RETURN = 0x0D; // Enter key

        [ReactMethod]
        public void simulateEnterKeyPress()
        {
            // Simulate key down
            keybd_event(VK_RETURN, 0, 0, 0);
            // Simulate key up
            keybd_event(VK_RETURN, 0, KEYEVENTF_KEYUP, 0);
        }
    }
}
