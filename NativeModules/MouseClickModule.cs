using System.Runtime.InteropServices;
using ReactNative.Bridge;

namespace MouseClickModule
{
    public class MouseClickModule : ReactContextNativeModuleBase
    {
        public MouseClickModule(ReactApplicationContext reactContext) : base(reactContext)
        {
        }

        public override string Name => "MouseClick";

        [DllImport("user32.dll", CharSet = CharSet.Auto, CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint cButtons, uint dwExtraInfo);

        private const uint MOUSEEVENTF_LEFTDOWN = 0x02;
        private const uint MOUSEEVENTF_LEFTUP = 0x04;

        [ReactMethod]
        public void clickLeftMouseButton()
        {
            mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
            mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0);
        }
    }
}
