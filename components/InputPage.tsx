import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#333333',
  },
  header: {
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 16,
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#333333',
  },
});

const requestAndroidCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const InputPage: React.FC = () => {
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const granted = await requestAndroidCameraPermission();
        console.log('Android camera permission:', granted);
        setHasCameraPermission(granted);
      } else if (Platform.OS === 'windows') {
        console.log('Windows platform detected, assuming camera permission');
        setHasCameraPermission(true);
      } else {
        // For iOS or other platforms, you may need to handle permissions separately
        console.log(
          'Non-Android/Windows platform detected, assuming camera permission',
        );
        setHasCameraPermission(true); // Assuming permission is granted for demonstration purposes
      }
    };

    requestPermissions();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Input Page</Text>
      {isCameraEnabled ? (
        <View style={styles.cameraContainer}>
          <RNCamera style={{flex: 1}} type={RNCamera.Constants.Type.back}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setIsCameraEnabled(false);
                }}>
                <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </RNCamera>
        </View>
      ) : (
        <TouchableOpacity
          style={{
            width: '80%',
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 8,
            backgroundColor: '#007700',
          }}
          onPress={() => {
            setIsCameraEnabled(true);
          }}>
          <Text style={{color: '#ffffff'}}>Turn on Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputPage;
