import React from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainMenu() {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={require('../../../assets/images/bcgr.jpeg')} // Background image
      style={styles.background}
      blurRadius={3}
    >
      <ScrollView>
      <View style={styles.container}>
        <Image 
          source={require('../../../assets/images/bcgr.jpeg')} // Source of the circular image
          style={styles.circularImage} 
        />

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QuizSelectionScreen')}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Results')}>
            <Text style={styles.buttonText}>Results</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileScreen')}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure it fills the width
    padding: 20, // Add some padding for better spacing
    marginTop: 60
  },
  buttonsContainer: {
    width: '80%',
    paddingTop: 40,
    marginBottom: 35
  },
  button: {
    backgroundColor: '#00000040', // Semi-transparent button color
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000', // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  buttonText: {
    color: '#FFD700', // Gold color for button text
    fontSize: 18,
    fontWeight: '900',
  },
  background: {
    flex: 1, // Ensure the background fills the screen
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  circularImage: {
    width: 250, // Set width of the circular image
    height: 250, // Set height of the circular image
    borderRadius: 125, // Make it circular // Add some space below the image
    borderWidth: 2,
    borderColor: '#FFD700'
  },
});
