import React, { useState } from 'react';
import { ScrollView, View, Text, Button, Modal, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function WelcomeScreen({ onStartAdventure }) {
  const [modalVisible, setModalVisible] = useState(true);

  const startAdventure = () => {
    setModalVisible(false);
    onStartAdventure(); // Передаємо стан старту пригоди
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/bcgr.jpeg')}
      style={styles.background}
      blurRadius={3}
    >
      <ScrollView>
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <View style={styles.containerText}>
              <Text style={styles.title}>Welcome to Tales of Sweet Fortune Quest!</Text>
              <Text style={styles.subtitle}>Embark on a Delicious Adventure!</Text>
              <Text style={styles.body}>
                Dive into a world where sweet treats and fortune intertwine. Explore captivating stories, solve tasty puzzles, and uncover the secrets of sweet wonders from around the globe. 
                Whether you're a candy connoisseur or a curious explorer, an exciting journey awaits!
              </Text>
              <Text style={styles.readyText}>
                Ready to start your adventure? Click below to begin your journey and unlock the magic of sweet fortune!
              </Text>
            </View>
              <TouchableOpacity style={styles.button} onPress={startAdventure}>
                <Text style={styles.buttonText}>Start the Adventure</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%'
  },
  modalContent: {
    width: 400,
    backgroundColor: '#00000040',
    paddingTop: 120,
    borderRadius: 10,
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'Chalkboard',
  },
  prompt: {
    fontSize: 18,
    fontStyle: 'Chalkboard',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00000040',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderColor: '#FFD700',
    borderWidth: 2,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerText: { 
    borderRadius: 40, // Rounded corners
    padding: 20, // Padding inside the box
    margin: 20, // Margin outside the box
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow radius for iOS
    elevation: 5, // Shadow elevation for Android
    width: 350,
    height: 420,
  },
  title: {
    fontSize: 24, // Title font size
    fontWeight: '900', // Title font weight
    color: '#6d6875', // Title color
    marginBottom: 10, // Spacing below the title
    fontStyle: 'Chalkboard',
    textAlign: 'center',
    color: '#FFD700',
  },
  subtitle: {
    fontSize: 20, // Subtitle font size
    fontWeight: 'bold', // Subtitle font weight
    color: '#8e9bff', // Subtitle color
    marginBottom: 15, // Spacing below the subtitle
    fontStyle: 'Chalkboard',
    textAlign: 'center',
    color: '#FFD700'
  },
  body: {
    fontSize: 16, // Body text font size
    color: '#333', // Body text color
    marginBottom: 15, // Spacing below the body text
    lineHeight: 24, // Line height for better readability
    textAlign: 'center', 
    color: '#FFD700'
  },
  readyText: {
    fontSize: 16, // Ready text font size
    fontWeight: 'bold', // Ready text font weight
    color: '#6d6875', // Ready text color
    fontStyle: 'Chalkboard',
    textAlign: 'center', 
    color: '#FFD700'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
