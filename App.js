import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { enableScreens } from 'react-native-screens';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DailyBonusModal from './components/screens/DailyBonusModal';
import WelcomeScreen from './components/screens/WelcomeScreen';
import BackgroundMusic from './components/BackgroundMusic';
import { CoinProvider, CoinContext } from './components/CoinProvider';
import { QuizProvider } from './components/QuizProvider';

import MainMenuRoute from './components/screens/routes/MainMenuRoute';
import MagazineRoute from './components/screens/routes/MagazineRoute';
import BakeryRoute from './components/screens/routes/BakeryRoute';
import RecipeBookRoute from './components/screens/routes/RecipeBookRoute';
import SettingsRoute from './components/screens/routes/SettingsRoute';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import QuizModal from './components/screens/QuizModal';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

enableScreens();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QuizProvider>
        <CoinProvider>
          <MainApp />
        </CoinProvider>
      </QuizProvider>
    </GestureHandlerRootView>
  );
}

function MainApp() {
  const [isAdventureStarted, setIsAdventureStarted] = useState(false);
  const [bonusModalVisible, setBonusModalVisible] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [vibrationSensitivity, setVibrationSensitivity] = useState(0.5);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const { totalCoins, setTotalCoins } = useContext(CoinContext); // Access coins from context

  useEffect(() => {
    // Initialize manifest and settings on app load
    const initializeApp = async () => {
      try {
        // Ensure the manifest file or other setup is done
        await checkForDailyBonus();
        // await ensureManifestExists(); // Call a function to check and create the manifest
        await loadSettings();         // Load any saved settings (e.g., music volume)
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setLoading(false); // Stop loading after initialization
      }
    };

    initializeApp();
  }, []);

  // // Manifest initialization function
  // const ensureManifestExists = async () => {
  //   try {
  //     const manifestExists = await AsyncStorage.getItem('manifest');
  //     if (!manifestExists) {
  //       // If no manifest exists, create one with default values
  //       const defaultManifest = { progress: {}, settings: {} };
  //       await AsyncStorage.setItem('manifest', JSON.stringify(defaultManifest));
  //       console.log('Manifest created');
  //     } else {
  //       console.log('Manifest already exists');
  //     }
  //   } catch (error) {
  //     console.error('Error ensuring manifest exists:', error);
  //   }
  // };

  useEffect(() => {
    checkForDailyBonus();
  }, []);

  const startAdventure = async () => {
    setIsAdventureStarted(true);
    // await checkForDailyBonus();
  };

  const handleQuizCompletion = async (pointsEarned) => {
    // console.log(`Points earned: ${pointsEarned}`);  // Log the points earned
    const newTotalCoins = totalCoins + pointsEarned; // Calculate new total coins
    setTotalCoins(newTotalCoins); // Use context to update coins
    // console.log(`Total coins now: ${newTotalCoins}`);
  };

  const checkForDailyBonus = async () => {
    try {
      // Retrieve lastClaimedDate from AsyncStorage
      const storedLastClaimedDate = await AsyncStorage.getItem('lastClaimedDate');
      
      // Get today's date (year, month, day)
      const today = new Date();
      
      // If lastClaimedDate is not found, set it to today and save it to AsyncStorage
      if (!storedLastClaimedDate) {
        await AsyncStorage.setItem('lastClaimedDate', today.toISOString());
        console.log('lastClaimedDate not found. Setting to today:', today.toISOString());
        return;
      }
      
      // Parse the stored last claimed date
      const lastClaimedDate = new Date(storedLastClaimedDate);
      
      // Check if a new daily bonus can be claimed (if the last claimed date is before today)
      const isSameDay = lastClaimedDate.getDate() === today.getDate() &&
                        lastClaimedDate.getMonth() === today.getMonth() &&
                        lastClaimedDate.getFullYear() === today.getFullYear();
      
      if (!isSameDay) {
        setBonusModalVisible(true);  // Show the bonus modal
        // Update lastClaimedDate to today
        await AsyncStorage.setItem('lastClaimedDate', today.toISOString());
      } else {
        console.log('Daily bonus already claimed today.');
      }
    } catch (error) {
      console.error('Failed to check for daily bonus:', error);
    }
  };
  

  const handleCloseQuizModal = () => {
    setModalVisible(false);
  };

  const handleStartQuiz = (topic) => {
    setSelectedTopic(topic);
    setModalVisible(true);
  };

  const loadSettings = async () => {
    try {
      const savedVolume = await AsyncStorage.getItem('musicVolume');
      if (savedVolume !== null) {
        const parsedVolume = JSON.parse(savedVolume);
        setMusicVolume(Math.round(parsedVolume * 100) / 100);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleClaimBonus = async (amount) => {
    try {
      const newTotalCoins = totalCoins + amount; // Calculate new total coins
      setTotalCoins(newTotalCoins); // Update total coins

      const lastClaimedDay = new Date().getDate();
      await AsyncStorage.setItem('lastClaimedDay', lastClaimedDay.toString());
      setBonusModalVisible(false);
    } catch (error) {
      console.error('Failed to claim bonus:', error);
    }
  };

  // const SettingsScreen = () => (
  //   <Settings
  //     musicVolume={musicVolume}
  //     setMusicVolume={setMusicVolume}
  //     vibrationSensitivity={vibrationSensitivity}
  //     setVibrationSensitivity={setVibrationSensitivity}
  //   />
  // );

  useEffect(() => {
    const loadSettings = async () => {
      const savedVolume = await AsyncStorage.getItem('musicVolume');
      if (savedVolume !== null) {
        const parsedVolume = JSON.parse(savedVolume);
        setMusicVolume(Math.round(parsedVolume * 100) / 100);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const initializeAsyncStorage = async () => {
      try {
        // Introduce a delay before using AsyncStorage
        setTimeout(async () => {
          const value = await AsyncStorage.getItem('dailyBonus');
          if (value !== null) {
            console.log('Daily bonus retrieved:', value);
          } else {
            console.log('No daily bonus found.');
          }
        }, 1000); // Delay for 1 second to ensure proper loading
      } catch (error) {
        console.error('Failed to check for daily bonus:', error);
      }
    };
  
    initializeAsyncStorage();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text>Loading app...</Text>
      </View>
    );
  }

  return (
<NavigationContainer>
  <SafeAreaView style={styles.main}>
    <BackgroundMusic volume={musicVolume} />
    <Stack.Navigator screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerShown: false,
    }}>
      {!isAdventureStarted ? (
        <Stack.Screen name="Welcome">
          {props => <WelcomeScreen {...props} onStartAdventure={startAdventure} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Main">
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarStyle: {
                    backgroundColor: 'transparent',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: 'absolute',
                    borderColor: 'transparent',
                    left: 10,
                    right: 10,
                    bottom: 5,
                    height: 90,
                    margin: -5,
                    borderTopWidth: 0,
                    padding: 20
                  },
                  tabBarActiveTintColor: '#FFD700',
                  tabBarInactiveTintColor: '#fff',
                  tabBarShowLabel: false,
                  tabBarVisibilityAnimationConfig: false,
                }}
                initialRouteName="Main Menu"
              >
                <Tab.Screen 
                  name="Main Menu" 
                  component={MainMenuRoute}  // Import Main Menu stack navigator
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="home" color={color} size={40}/>
                    ),
                  }} 
                />
                <Tab.Screen 
                    name="Magazine" 
                    component={MagazineRoute}  // Import Bakery stack navigator
                    options={{
                      tabBarIcon: ({ color }) => (
                        <Icon name="book" color={color} size={40} />
                      ),
                    }} 
                />
                <Tab.Screen 
                  name="Bakery" 
                  component={BakeryRoute}  // Import Bakery stack navigator
                  options={{
                    tabBarIcon: ({ color }) => (
                      <Icon name="food-croissant" color={color} size={40} />
                    ),
                  }} 
                />
                <Tab.Screen 
                  name="RecipeBook" 
                  component={RecipeBookRoute}  // Import Bakery stack navigator
                  options={{
                    tabBarIcon: ({ color }) => (
                      <Icon name="book-open-blank-variant" color={color} size={40} />
                    ),
                  }} 
                />
                <Tab.Screen 
                  name="Settings" 
                  component={SettingsRoute}  // Import Bakery stack navigator
                  options={{
                    tabBarIcon: ({ color }) => (
                      <Icon name="cogs" color={color} size={40} />
                    ),
                  }} 
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
    {/* Modals */}
    {/* <DailyBonusModal 
      visible={bonusModalVisible} 
      onClaim={handleClaimBonus} 
      onClose={() => setBonusModalVisible(false)} 
    /> */}
    {/* {isModalVisible && (
      <QuizModal 
        isVisible={isModalVisible} 
        selectedTopic={selectedTopic} 
        onClose={handleCloseQuizModal}
        onComplete={handleQuizCompletion} 
      />
    )} */}
  </SafeAreaView>
</NavigationContainer>
  );  
}

const styles = StyleSheet.create({
  main: { 
    flex: 1, 
    justifyContent: 'center',
  },
});