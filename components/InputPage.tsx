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

import MouseClickModule from '../NativeModules/MouseClickModule';
import KeyboardSimulationModule from '../NativeModules/KeyboardSimulationModule';

if (!MouseClickModule) {
  Alert.alert(
    'Keyboard Simulation',
    Platform.OS !== 'windows'
      ? 'MouseClickModule is only supported on Windows.'
      : 'MouseClickModule is returning false.',
  );
  MouseClickModule.clickLeftMouseButton();
}

if (KeyboardSimulationModule) {
  Alert.alert(
    'Keyboard Simulation',
    Platform.OS !== 'windows'
      ? 'MouseClickModule is only supported on Windows.'
      : 'MouseClickModule is returning false.',
  );
  KeyboardSimulationModule.simulateEnterKeyPress();
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
    if (Platform.OS === 'windows' && MouseClickModule) {
      MouseClickModule.clickLeftMouseButton();
    } else {
      Alert.alert(
        'Keyboard Simulation',
        Platform.OS !== 'windows'
          ? 'MouseClickModule is only supported on Windows.'
          : 'MouseClickModule is returning false.',
      );
    }
  };

  const handleKeyboardSimulation = () => {
    if (Platform.OS === 'windows' && KeyboardSimulationModule) {
      KeyboardSimulationModule.simulateEnterKeyPress();
    } else {
      Alert.alert(
        'Keyboard Simulation',
        Platform.OS !== 'windows'
          ? 'KeyboardSimulationModule is only supported on Windows.'
          : 'KeyboardSimulationModule is returning false.',
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
