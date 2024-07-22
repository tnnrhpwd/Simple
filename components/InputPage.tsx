import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

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

const InputPage: React.FC = () => {
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Input Page</Text>
      {isCameraEnabled ? (
        <View style={styles.cameraContainer}>
          <RNCamera
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.back}
          >
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
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Close</Text>
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
          <Text style={{ color: '#ffffff' }}>Turn on Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputPage;
