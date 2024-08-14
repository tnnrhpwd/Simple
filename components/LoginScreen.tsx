// components/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../services/AuthService';
// import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const isAuthenticated = await AuthService.login(email, password);
      if (isAuthenticated) {
        await AsyncStorage.setItem('userToken', 'your_generated_token');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#333333"
          placeholder="Email"
          value={email}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#333333"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  form: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 32,
  },
  input: {
    width: '100%',
    height: 48,
    paddingHorizontal: 8,
    marginVertical: 8,
    backgroundColor: '#dddddd',
    color: '#333333',
  },
  button: {
    width: '100%',
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

export default LoginScreen;
