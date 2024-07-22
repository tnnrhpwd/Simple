import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
  subtitle: {
    fontSize: 18,
    color: '#dddddd',
  },
});

const HomePage: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.header}>PlanitHeye</Text>
    <Text style={styles.subtitle}>
      Automating your digital life with one unified plan.
    </Text>
  </View>
);

export default HomePage;
