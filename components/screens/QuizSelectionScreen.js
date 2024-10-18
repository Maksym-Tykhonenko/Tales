import React from 'react';
import { ImageBackground, Text, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';

export default function QuizSelectionScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../../assets/images/bcgr.jpeg')} // Background image
      style={styles.background}
      blurRadius={3}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.descriptionBox}>
          <Text style={styles.title}>Welcome to Tales of Sweet Fortune Quest!</Text>
          
          <Text style={styles.subtitle}>Greetings, traveler! You’ve entered a world of sweet challenges and fortune-filled adventures. Before your journey begins, you must choose your path:</Text>

          <Text style={styles.bulletPoint}>- Main Quiz Path: Test your knowledge and skill by venturing into the heart of our quiz challenges.</Text>
          
          <Text style={styles.bulletPoint}>- Fortune's Favourite - Hard Mode: For the bravest and boldest only! Step into Fortune’s Favourite and prove that you’re worthy of the ultimate challenge, where only the chosen ones thrive.</Text>
          
          <Text style={styles.footer}>Choose wisely, and let your adventure unfold!</Text>
        </View>

        {/* TouchableOpacity for Topic Selection */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TopicSelectionScreen')}
        >
          <Text style={styles.buttonText}>Go to Main Quiz</Text>
        </TouchableOpacity>

        {/* TouchableOpacity for True or False Quiz */}
        <TouchableOpacity
          style={[styles.button, styles.trueFalseButton]} // Additional styling for this button
          onPress={() => navigation.navigate('TrueFalseQuiz')}
        >
          <Text style={styles.buttonText}>Fortune's Favourite</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50, // Padding to ensure spacing at the top and bottom
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', 
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', 
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  bulletPoint: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFD700', 
    textAlign: 'left',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  footer: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
  descriptionBox: {
    backgroundColor: '#00000040', // Semi-transparent button color
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000', // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    borderColor: '#FFD700',
    borderWidth: 2,
    width: '95%',
    alignSelf: 'center',
    // marginBottom: 50,
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
});
