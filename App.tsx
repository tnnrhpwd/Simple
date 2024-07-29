/**
 * React Native App @format
 */

import React from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import HomePage from './components/HomePage';
import About from './components/About';
import Contact from './components/Contact';
import InputPage from './components/InputPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#3C3C3C',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  navbarContainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#1C1C1C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navbarButton: {
    color: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentPage, setCurrentPage] = React.useState('HomePage');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'HomePage':
        return <HomePage />;
      case 'About':
        return <About />;
      case 'Contact':
        return <Contact />;
      case 'InputPage':
        return <InputPage />;
      default:
        return null;
    }
  };

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.navbarContainer}>
  //       <Text
  //         style={styles.navbarButton}
  //         onPress={() => navigateTo('HomePage')}>
  //         Home
  //       </Text>
  //       <Text
  //         style={styles.navbarButton}
  //         onPress={() => navigateTo('InputPage')}>
  //         InputPage
  //       </Text>
  //       <Text style={styles.navbarButton} onPress={() => navigateTo('About')}>
  //         About
  //       </Text>
  //       <Text style={styles.navbarButton} onPress={() => navigateTo('Contact')}>
  //         Contact
  //       </Text>
  //     </View>
  //     <View style={styles.pageContainer}>{renderPage()}</View>
  //   </View>
  // );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Text
            style={styles.navbarButton}
            onPress={() => navigateTo('HomePage')}
          >
            Home
          </Text>
          <Text
            style={styles.navbarButton}
            onPress={() => navigateTo('InputPage')}
          >
            InputPage
          </Text>
          <Text style={styles.navbarButton} onPress={() => navigateTo('About')}>
            About
          </Text>
          <Text
            style={styles.navbarButton}
            onPress={() => navigateTo('Contact')}
          >
            Contact
          </Text>
        </View>
        <View style={styles.pageContainer}>{renderPage()}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
