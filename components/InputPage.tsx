import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  NativeModules,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { WebView } from 'react-native-webview';

const { MouseClick, KeyboardSimulation } = NativeModules;
console.log(NativeModules);

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
  webviewContainer: {
    flex: 1,
    width: '100%',
  },
  button: {
    width: '80%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#007700',
  },
  buttonText: {
    color: '#ffffff',
  },
  closeButtonText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});

const requestAndroidPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    return (
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
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
        const permissionsGranted = await requestAndroidPermissions();
        setHasCameraPermission(permissionsGranted);
      } else {
        setHasCameraPermission(true);
      }
    };
    requestPermissions();
  }, []);

  const handleMouseClick = () => {
    if (Platform.OS === 'windows' && MouseClick) {
      MouseClick.clickLeftMouseButton();
    } else {
      if (!(Platform.OS === 'windows')) {
        Alert.alert(
          'Mouse Click',
          'Mouse click simulation is only supported on Windows.',
        );
      }
      if (!MouseClick) {
        Alert.alert(
          'Mouse Click',
          'Mouse click simulation is not correctly implemented.',
        );
      }
    }
  };

  const handleKeyboardSimulation = () => {
    if (Platform.OS === 'windows' && KeyboardSimulation) {
      KeyboardSimulation.simulateEnterKeyPress();
    } else {
      if (!(Platform.OS === 'windows')) {
        Alert.alert(
          'Keyboard Simulation',
          'Keyboard simulation is only supported on Windows.',
        );
      }
      if (!KeyboardSimulation) {
        Alert.alert(
          'Keyboard Simulation',
          'Keyboard simulation is not correctly implemented.',
        );
      }
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Input Page</Text>
      <View style={styles.cameraContainer}>
        {/* {isCameraEnabled && device ? (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isCameraEnabled}
          />
        ) : null} */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsCameraEnabled((prev) => !prev)}
        >
          <Text style={styles.buttonText}>
            {isCameraEnabled ? 'Turn off Camera' : 'Turn on Camera'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMouseClick}>
          <Text style={styles.buttonText}>Simulate Mouse Click</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleKeyboardSimulation}
        >
          <Text style={styles.buttonText}>Simulate Keyboard Input</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputPage;
