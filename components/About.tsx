import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
  description: {
    fontSize: 18,
    color: '#dddddd',
    textAlign: 'center',
    marginHorizontal: 16,
    marginVertical: 32,
  },
});

const About = () => (
  <View style={styles.container}>
    <Text style={styles.header}>About PlanitHeye</Text>
    <Text style={styles.description}>
      PlanitHeye is a digital life automation platform that replicates the
      actions of humans in a manner that allows users to automate, share, and
      record their digital lives. Our goal is to provide a unified solution for
      managing all aspects of your digital life, from scheduling and reminders
      to document management and more. With PlanitHeye, you can simplify and
      streamline your digital routine, freeing up more time for the things that
      matter most.
    </Text>
  </View>
);

export default About;
