import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../BottomMenu/Settings';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
export default function SettingsRoute() {
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [vibrationSensitivity, setVibrationSensitivity] = useState(0.5);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedVolume = await AsyncStorage.getItem('musicVolume');
        if (savedVolume !== null) {
          const parsedVolume = JSON.parse(savedVolume);
          setMusicVolume(parsedVolume); // Set volume directly
        }

        const savedVibration = await AsyncStorage.getItem('vibrationSensitivity');
        if (savedVibration !== null) {
          const parsedVibration = JSON.parse(savedVibration);
          setVibrationSensitivity(parsedVibration); // Set vibration sensitivity directly
        }
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };

    loadSettings();
  }, []);

  const SettingsScreen = () => (
    <Settings
      musicVolume={musicVolume}
      setMusicVolume={setMusicVolume}
      vibrationSensitivity={vibrationSensitivity}
      setVibrationSensitivity={setVibrationSensitivity} // Pass this prop as well
    />
  );
  
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerShown: false,
    }}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
