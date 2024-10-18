import React, { useEffect, useContext, useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CoinContext } from '../../CoinProvider'; // Adjust the path as needed
import { resetPurchases } from './Magazine';
import { resetProgressInTopics } from '../TopicSelectionScreen';

export default function Settings({ musicVolume, setMusicVolume }) {
  const { resetCoins, resetPastries } = useContext(CoinContext); // Access resetCoins and resetPastries from context
  const [vibrationSensitivity, setVibrationSensitivity] = React.useState(0.5);
  const [tempMusicVolume, setTempMusicVolume] = React.useState(musicVolume);
  const [topics, setTopics] = useState([]);

  const debounceTimeoutRef = useRef(null); // Ref to store the debounce timeout

  const debounce = (callback, delay) => {
    return (...args) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current); // Clear the previous timeout
      }
      debounceTimeoutRef.current = setTimeout(() => {
        callback(...args); // Call the callback function after the delay
      }, delay);
    };
  };

  // const updateVolume = async (value) => {
  //   await AsyncStorage.setItem('musicVolume', JSON.stringify(value)); // Save to AsyncStorage
  //   console.log(`Volume saved to AsyncStorage: ${value}`);
  // };

  const handleVolumeChange = (value) => {
    setTempMusicVolume(value); // Set temporary volume
    console.log(`Temporary Volume: ${value}`);
    // debounce(updateVolume, 300)(value); // Call the debounced updateVolume function
  };

  const handleVibrationChange = (value) => {
    setVibrationSensitivity(value);
  };

  const loadTopics = async () => {
    try {
      const savedTopics = await AsyncStorage.getItem('purchasedTopics');
      if (savedTopics) {
        setTopics(JSON.parse(savedTopics)); // Initialize topics state
      } else {
        // Initialize with default topics if none are saved
        const defaultTopics = [ /* your default topics data */ ];
        setTopics(defaultTopics);
      }
    } catch (error) {
      console.error('Failed to load topics', error);
    }
  };
  
  // Function to reset unlocked articles similar to resetUnlocked from RecipeBook.js
  const resetUnlockedInSettings = async () => {
    try {
      // Load the current articles from AsyncStorage
      const savedArticles = await AsyncStorage.getItem('articlesAndRecipes');
      let articlesAndRecipes = [];
      
      if (savedArticles !== null) {
        articlesAndRecipes = JSON.parse(savedArticles);
      }

      // Map over the articles and lock them
      const resetArticles = articlesAndRecipes.map(article => ({
        ...article,
        unlocked: false,  // Set unlocked to false for all articles
      }));

      // Save the updated articles back to AsyncStorage
      await AsyncStorage.setItem('articlesAndRecipes', JSON.stringify(resetArticles));

      // Alert.alert('Progress reset', 'All articles have been locked again.');
    } catch (error) {
      console.error('Error resetting articles:', error);
      // Alert.alert('Error', 'Failed to reset articles.');
    }
  };

  const resetProgressInTopics = async () => {
    try {
      // Load the saved topics from AsyncStorage
      const savedTopics = await AsyncStorage.getItem('topics');
      let topics = savedTopics ? JSON.parse(savedTopics) : [];
  
      // Reset all topics except the first one (ID '1')
      const resetTopics = topics.map(topic => ({
        ...topic,
        unlocked: topic.id === '1', // Keep the first topic unlocked
      }));
  
      // Update the state and save to AsyncStorage
      setTopics(resetTopics);
      await AsyncStorage.setItem('topics', JSON.stringify(resetTopics));
  
      // Alert.alert('Progress reset', 'All topics have been locked again except the first one.');
    } catch (error) {
      console.error('Failed to reset progress in topics:', error);
      // Alert.alert('Error', 'Failed to reset topic progress.');
    }
  };
  

  useEffect(() => {
    loadTopics();
  }, []); // Load topics when component mounts

  const saveSettings = async () => {
    try {
      setMusicVolume(tempMusicVolume); // Update music volume in context when saving
      await AsyncStorage.setItem('musicVolume', JSON.stringify(tempMusicVolume)); // Ensure it’s saved in AsyncStorage
      await AsyncStorage.setItem('vibrationSensitivity', JSON.stringify(vibrationSensitivity));
      // alert('Settings Saved!');
    } catch (error) {
      console.error('Failed to save settings', error);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedVolume = await AsyncStorage.getItem('musicVolume');
        const savedVibration = await AsyncStorage.getItem('vibrationSensitivity');
  
        // Set musicVolume to saved value or default to 0.5
        const volume = savedVolume !== null ? JSON.parse(savedVolume) : 0.5;
        setMusicVolume(volume);
        setTempMusicVolume(volume); // Ensure tempMusicVolume is also set
  
        // Set vibrationSensitivity to saved value or default to 0.5
        const vibration = savedVibration !== null ? JSON.parse(savedVibration) : 0.5;
        setVibrationSensitivity(vibration);
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };
  
    loadSettings();
  }, []); // Only run once on mount

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('purchasedTopics');  // Remove purchased topics
      await AsyncStorage.removeItem('articlesAndRecipes');  // Remove articles and recipes
      // await AsyncStorage.removeItem('musicVolume');  // Remove music volume settings
      // await AsyncStorage.removeItem('vibrationSensitivity');  // Remove vibration settings
      await AsyncStorage.removeItem('coins');  // Remove stored coins
      await AsyncStorage.removeItem('pastries');  // Remove pastries
  
      console.log('Selected items removed from AsyncStorage.');
    } catch (error) {
      console.error('Failed to remove items from AsyncStorage:', error);
    }
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/bcgr.jpeg')}
      style={styles.background}
      blurRadius={3}
    >
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.option}>
          <Text style={styles.label}>Music Volume: {Math.round(tempMusicVolume * 100)}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={tempMusicVolume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor="#FFD700"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FFD700"
          />
        </View>
        
        <View style={styles.option}>
          <Text style={styles.label}>Vibration Sensitivity: {Math.round(vibrationSensitivity * 100)}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={vibrationSensitivity}
            onValueChange={handleVibrationChange}
            minimumTrackTintColor="#FFD700"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FFD700"
          />
        </View>

        {/* Reset Progress Button */}
        <TouchableOpacity style={styles.resetButton} onPress={async () => {
          try {
            if (topics.length === 0) {
              await loadTopics();  // Ensure topics are loaded
            }

            await resetCoins();
            await resetPastries();
            await resetPurchases(topics, setTopics);  // Reset purchases
            await resetProgressInTopics();  // Reset topics
            await resetUnlockedInSettings();  // Reset articles

            // clearStorage()

            alert('Progress has been reset!');
          } catch (error) {
            console.error('Error resetting progress:', error);
          }
        }}>
          <Text style={styles.buttonText}>Reset Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={async () => {
          try {
            if (topics.length === 0) {
              await loadTopics();  // Ensure topics are loaded
            }
            clearStorage()

            alert('Progress has been reset!');
          } catch (error) {
            console.error('Error resetting progress:', error);
          }
        }}>
          <Text style={styles.buttonText}>Delete Cache</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={saveSettings}>
          <Text style={styles.buttonText}>Save Settings</Text>
        </TouchableOpacity>

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
    // padding: 10,
    marginTop: 60,
    marginBottom: 50
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: '#FFD700',
    fontWeight: '900'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: 300, // Adjust width as needed
    height: 40,
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
    marginTop: 80,
    width: 300
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '900',
  },
  option: {
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
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: '#ff000040',
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
    marginTop: 10,
    width: 300
  }
});