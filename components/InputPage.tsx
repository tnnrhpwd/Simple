import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { RNCamera } from 'react-native-vision-camera';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';
import RNFFmpeg from 'react-native-ffmpeg';

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

const requestAndroidStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to save videos',
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
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const cameraGranted = await requestAndroidCameraPermission();
        const storageGranted = await requestAndroidStoragePermission();
        console.log('Android camera permission:', cameraGranted);
        console.log('Android storage permission:', storageGranted);
        setHasCameraPermission(cameraGranted && storageGranted);
      } else if (Platform.OS === 'windows') {
        console.log(
          'Windows platform detected, assuming camera and storage permission',
        );
        setHasCameraPermission(true);
      } else {
        console.log(
          'Non-Android/Windows platform detected, assuming camera and storage permission',
        );
        setHasCameraPermission(true); // Assuming permission is granted for demonstration purposes
      }
    };

    requestPermissions();
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    const outputPath = `${RNFS.ExternalDirectoryPath}/screen_recording.mp4`;
    const command = `-y -f gdigrab -framerate 30 -i desktop ${outputPath}`;
    RNFFmpeg.execute(command)
      .then((result: { rc: unknown }) => {
        console.log(`FFmpeg process exited with rc=${result.rc}`);
        setIsRecording(false);
        Alert.alert('Screen Recording', `Recording saved to ${outputPath}`);
      })
      .catch((err: unknown) => {
        console.error('FFmpeg process failed:', err);
        setIsRecording(false);
        Alert.alert('Screen Recording', 'Failed to start recording');
      });
  };

  const stopRecording = () => {
    RNFFmpeg.cancel();
    setIsRecording(false);
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
        <RNCamera style={{ flex: 1 }} type={RNCamera.Constants.Type.back}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => setIsCameraEnabled(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
      {isCameraEnabled ? (
        Platform.OS === 'windows' ? (
          <View style={styles.webviewContainer}>
            <WebView
              style={{ flex: 1 }}
              javaScriptEnabled
              source={{
                html: `
                  <!DOCTYPE html>
                  <html>
                    <body>
                      <video id="video" autoplay style="width: 100%; height: 100%;"></video>
                      <script>
                        const video = document.getElementById('video');
                        navigator.mediaDevices.getUserMedia({ video: true })
                          .then(stream => {
                            video.srcObject = stream;
                          })
                          .catch(error => {
                            console.error('Error accessing webcam:', error);
                          });
                      </script>
                    </body>
                  </html>
                `,
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsCameraEnabled(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cameraContainer}>
            <RNCamera style={{ flex: 1 }} type={RNCamera.Constants.Type.back}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => setIsCameraEnabled(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </RNCamera>
          </View>
        )
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsCameraEnabled(true)}
        >
          <Text style={styles.buttonText}>Turn on Camera</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputPage;
