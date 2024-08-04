public class ReactPackageProvider : IReactPackageProvider{
    public void CreatePackage(IReactPackageBuilder packageBuilder){
        packageBuilder.AddModule("MouseClickModule", new MouseClickModule());
    }
}

// was.... using Microsoft.ReactNative.Managed;

// namespace Simple
// {
//     public partial class ReactPackageProvider : IReactPackageProvider
//     {
//         public void CreatePackage(IReactPackageBuilder packageBuilder)
//         {
//             CreatePackageImplementation(packageBuilder);
//         }
//         partial void CreatePackageImplementation(IReactPackageBuilder packageBuilder);
//     }
// }
