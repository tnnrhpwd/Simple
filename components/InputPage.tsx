import React, { useState, useEffect, useRef } from 'react';
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
import { Camera, useCameraDevices } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as tfReactNative from '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { decodeJpeg, fetch } from '@tensorflow/tfjs-react-native';
// import modelJson from './path_to_your_model/model.json';
// import modelWeights from './path_to_your_model/group1-shard1of1.bin';

// import MouseClickModule from '../NativeModules/MouseClickModule'; // pulls native modules with errors
const { MouseClickModule } = NativeModules; // This does not pull from native modules for some reason
// import KeyboardSimulationModule from '../NativeModules/KeyboardSimulationModule'; // pulls native modules with errors
const { KeyboardSimulationModule } = NativeModules; // This does not pull from native modules for some reason

if (MouseClickModule) {
  Alert.alert(
    'Keyboard Simulation',
    Platform.OS !== 'windows'
      ? 'MouseClickModule is only supported on Windows.'
      : 'MouseClickModule is returning false.',
  );
  MouseClickModule.click();
}

if (KeyboardSimulationModule) {
  Alert.alert(
    'Keyboard Simulation',
    Platform.OS !== 'windows'
      ? 'MouseClickModule is only supported on Windows.'
      : 'MouseClickModule is returning false.',
  );
  KeyboardSimulationModule.typeText('hi');
}
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
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [device, setDevice] = useState<unknown>(null);
  const cameraRef = useRef(null);
  const [model, setModel] = useState(null);

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

    // const getDevices = async () => {
    //   const devices = await useCameraDevices();
    //   setDevice(devices.back);
    // };
    // getDevices();

    // const loadTfModel = async () => {
    //   await tf.ready();
    //   const loadedModel = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));
    //   setModel(loadedModel);
    // };
    // loadTfModel();
  }, []);

  const handleMouseClick = () => {
    if (Platform.OS === 'windows') {
      if (
        MouseClickModule &&
        typeof MouseClickModule.clickLeftMouseButton === 'function'
      ) {
        try {
          MouseClickModule.clickLeftMouseButton();
          Alert.alert('Mouse Click', 'Mouse click simulated successfully.');
        } catch (error) {
          console.error('Error invoking MouseClickModule:', error);
          Alert.alert(
            'Error',
            'Failed to invoke MouseClickModule. See console for details.',
          );
        }
      } else {
        console.warn(
          'MouseClickModule is not properly defined or is missing required methods.',
        );
        Alert.alert(
          'Error',
          'MouseClickModule is not properly defined or missing methods.',
        );
      }
    } else {
      Alert.alert(
        'Mouse Click Simulation',
        'MouseClickModule is only supported on Windows.',
      );
    }
  };

  const handleKeyboardSimulation = () => {
    if (Platform.OS === 'windows') {
      if (
        KeyboardSimulationModule &&
        typeof KeyboardSimulationModule.simulateEnterKeyPress === 'function'
      ) {
        try {
          KeyboardSimulationModule.simulateEnterKeyPress();
          Alert.alert(
            'Keyboard Simulation',
            'Enter key simulated successfully.',
          );
        } catch (error) {
          console.error('Error invoking KeyboardSimulationModule:', error);
          Alert.alert(
            'Error',
            'Failed to invoke KeyboardSimulationModule. See console for details.',
          );
        }
      } else {
        console.warn(
          'KeyboardSimulationModule is not properly defined or is missing required methods.',
        );
        Alert.alert(
          'Error',
          'KeyboardSimulationModule is not properly defined or missing methods.',
        );
      }
    } else {
      Alert.alert(
        'Keyboard Simulation',
        'KeyboardSimulationModule is only supported on Windows.',
      );
    }
  };

  // const analyzeImage = async (uri) => {
  //   if (model) {
  //     const response = await fetch(uri, {}, { isBinary: true });
  //     const imageDataArrayBuffer = await response.arrayBuffer();
  //     const imageTensor = decodeJpeg(new Uint8Array(imageDataArrayBuffer));

  //     const prediction = await model.predict(imageTensor);
  //     const result = await prediction.data();

  //     if (result[0] === 'desiredLabel') {
  //       handleKeyboardSimulation();
  //     }
  //   }
  // };

  // const takePicture = async () => {
  //   if (cameraRef.current) {
  //     const picture = await cameraRef.current.takePictureAsync();
  //     analyzeImage(picture.uri);
  //   }
  // };

  // if (hasCameraPermission === null) {
  //   return <View />;
  // }
  // if (hasCameraPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Input Page</Text>
      <View style={styles.cameraContainer}>
        {/* {isCameraEnabled && device ? (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isCameraEnabled}
          />
        ) : null} */}
        <TouchableOpacity
          style={styles.button}
          // onPress={() => setIsCameraEnabled((prev) => !prev)}
        >
          <Text style={styles.buttonText}>
            {isCameraEnabled ? 'Turn off Camera' : 'Turn on Camera'}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Capture and Analyze Image</Text>
        </TouchableOpacity> */}
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
