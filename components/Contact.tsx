import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

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

const Contact: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = () => {
    // logic to submit the form goes here
    console.log(
      `Form submitted: email=${email} name=${name} message=${message}`,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#333333"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#333333"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#333333"
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://linkedin.com')}
        >
          <Text style={{ color: '#007700', fontSize: 18 }}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com')}>
          <Text style={{ color: '#007700', fontSize: 18 }}>GitHub</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Contact;
