import React, { useState, useContext, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Button, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CoinContext } from '../../CoinProvider';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const preparationCosts = {
    donuts: 100,
    candies: 200,
    croissants: 300,
    cakes: 500,
};

export default function Bakery() {
    const { totalCoins, setTotalCoins, pastries, setPastries } = useContext(CoinContext);
    const [currentScreen, setCurrentScreen] = useState(0); 
    const preparationTimeoutRef = useRef({});
    const [progressState, setProgressState] = useState({});

    // Load pastries and totalCoins from AsyncStorage on component mount
    useEffect(() => {
      const loadPastriesAndCoins = async () => {
          try {
              const storedPastries = await AsyncStorage.getItem('pastries');
              if (storedPastries) {
                  const parsedPastries = JSON.parse(storedPastries);
                  Object.keys(parsedPastries).forEach((type) => {
                      const currentTime = Date.now();
                      const pastry = parsedPastries[type];
  
                      if (pastry.startTime) {
                          const elapsedTime = currentTime - pastry.startTime;
                          if (elapsedTime >= pastry.cookingTime) {
                              // If enough time has passed, the pastry is done
                              pastry.prepared += 1;
                              pastry.isPreparing = false;
                              pastry.startTime = null;
                              setProgressState((prevState) => ({ ...prevState, [type]: 1 })); // Full progress
                          } else {
                              // If still cooking, calculate progress
                              const progress = elapsedTime / pastry.cookingTime;
                              setProgressState((prevState) => ({ ...prevState, [type]: progress }));
                              // Resume cooking with remaining time
                              const remainingTime = pastry.cookingTime - elapsedTime;
                              resumeCooking(type, remainingTime);
                          }
                      }
                  });
                  setPastries(parsedPastries);
              }
  
              const storedCoins = await AsyncStorage.getItem('totalCoins');
              if (storedCoins !== null) {
                  setTotalCoins(parseInt(storedCoins));
              }
          } catch (error) {
              console.error('Failed to load data:', error);
          }
      };
  
      loadPastriesAndCoins();
  }, []);
  
  const resumeCooking = (type, remainingTime) => {
    const intervalId = startProgress(type, Date.now(), remainingTime);
    preparationTimeoutRef.current[type] = setTimeout(() => {
        const updatedPastries = { ...pastries };
        updatedPastries[type].prepared += 1;
        updatedPastries[type].isPreparing = false;
        updatedPastries[type].startTime = null;
        setPastries(updatedPastries);
        clearInterval(intervalId);
        setProgressState((prevState) => ({ ...prevState, [type]: 1 })); // Mark progress as done
    }, remainingTime);
};


    useEffect(() => {
      const storePastriesAndCoins = async () => {
          try {
              await AsyncStorage.setItem('pastries', JSON.stringify(pastries));
              await AsyncStorage.setItem('totalCoins', totalCoins.toString());
          } catch (error) {
              console.error('Failed to save data:', error);
          }
      };
      storePastriesAndCoins();
    }, [pastries, totalCoins]);

    const preparePastry = (type) => {
      const updatedPastries = { ...pastries };
      if (!updatedPastries[type].isPreparing && totalCoins >= preparationCosts[type]) {
          setTotalCoins(totalCoins - preparationCosts[type]);

          const startTime = Date.now(); // Start time of preparation
          updatedPastries[type].isPreparing = true;
          updatedPastries[type].startTime = startTime; // Save start time for calculation
          setPastries(updatedPastries); // Update state to reflect that cooking has started

          // Start progress tracking
          const intervalId = startProgress(type, startTime, updatedPastries[type].cookingTime);
          preparationTimeoutRef.current[type] = setTimeout(() => {
              const finalUpdatedPastries = { ...updatedPastries };
              finalUpdatedPastries[type].prepared += 1;
              finalUpdatedPastries[type].isPreparing = false;
              finalUpdatedPastries[type].startTime = null;
              setPastries(finalUpdatedPastries);
              clearInterval(intervalId); // Stop the progress interval
              setProgressState((prevState) => ({ ...prevState, [type]: 1 })); // Set progress to 100% when done
          }, updatedPastries[type].cookingTime);
      }
    };


    const sellPastry = (type) => {
        if (pastries[type].prepared > 0) {
            setTotalCoins(totalCoins + pastries[type].price);
            const updatedPastries = { ...pastries };
            updatedPastries[type].prepared -= 1;
            setPastries(updatedPastries);
        }
    };

    const resetPreparation = () => {
      const resetPastries = { ...pastries };
  
      Object.keys(resetPastries).forEach((type) => {
          if (resetPastries[type].isPreparing) {
              resetPastries[type].isPreparing = false;
              resetPastries[type].startTime = null; // Stop preparation
              
              // Clear the preparation timeout and interval
              clearTimeout(preparationTimeoutRef.current[type]); // Clear the timeout
              delete preparationTimeoutRef.current[type]; // Remove the reference
  
              // Reset the progress for this pastry
              setProgressState((prevState) => ({
                  ...prevState,
                  [type]: 0, // Reset progress to 0 for the type
              }));
          }
      });
  
      setPastries(resetPastries); // Update the pastries state
    };
  

  const startProgress = (type, startTime, cookingTime) => {
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / cookingTime, 1)

        if (progress >= 1) {
            clearInterval(intervalId); // Stop updating when progress reaches 100%
            setProgressState((prevState) => ({ ...prevState, [type]: 1 }));
        } else {
            setProgressState((prevState) => ({ ...prevState, [type]: progress }));
        }
    }, 100); // Update progress every 100 milliseconds for smooth animation
    return intervalId;
};

  return (
      // <View style={styles.container}>
          <ImageBackground 
              source={require('../../../assets/images/bcgr.jpeg')} // Background image
              style={styles.container}
              blurRadius={3}
              zIndex={-2}
          >
            <View style={[styles.playerCoinsBox, { width: 135, flexDirection: 'row', height: 40 }]}>
                <Text style={[styles.coins, { left: 25, position: 'absolute' }]}>{totalCoins}</Text>
                <Image style={[styles.coinIcon, { left: 100, position: 'relative' }]} source={require('../../../assets/images/coin.png')} />
            </View>

          {currentScreen === 0 ? (
              <>
                  <FlatList
                      data={Object.keys(pastries)}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                          <View style={styles.pastryContainer}>
                              <Image source={pastries[item].image} style={styles.pastryImage} />
                              <Text style={styles.text}>{pastries[item].prepared}</Text>
                              <TouchableOpacity style={[styles.preparationButton, 
                                pastries[item].isPreparing || totalCoins < preparationCosts[item]
                                 ? {backgroundColor: '#00000040'}
                                 : null]} onPress={() => preparePastry(item)} disabled={pastries[item].isPreparing || totalCoins < preparationCosts[item]}>

                                  <Text style={[styles.preparationText, pastries[item].isPreparing || totalCoins < preparationCosts[item]
                                 ? {color: '#fff'}
                                 : null]}>{pastries[item].isPreparing ? `${preparationCosts[item]}` : `${preparationCosts[item]}`}
                                 </Text>

                                  <Image style={[styles.coinIcon, { left: 110, top: 10 }]} source={require('../../../assets/images/coin.png')} />
                              </TouchableOpacity>
                              <Progress.Bar 
                                  progress={pastries[item].isPreparing && progressState[item] !== undefined ? progressState[item] : 0} // Dummy progress value
                                  width={330} 
                                  height={10}
                                  color={'#d25871'}
                                  unfilledColor={'#ddd'}
                                  borderWidth={0}
                                  style={styles.progressBar}
                                  backgroundColor={'#00000080'}
                              />
                          </View>
                      )}
                  />
                  <View style={[styles.navigationContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }]}>
  
                    <TouchableOpacity onPress={() => setCurrentScreen(1)}>
                      <Icon name="arrow-left-bold-circle" size={50} style={styles.arrow} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.resetButton} onPress={resetPreparation}>
                      <Text style={styles.resetText}>Reset Preparation</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setCurrentScreen(1)}>
                      <Icon name="arrow-right-bold-circle" size={50} style={styles.arrow} />
                    </TouchableOpacity>

                  </View>
              </>
          ) : (
            <>
            <FlatList
              data={Object.keys(pastries)}
              keyExtractor={(item) => item}
              numColumns={2} // Розміщуємо елементи у дві колонки
              columnWrapperStyle={styles.row} // Додаємо відступи між елементами в рядку
              key={`column_${2}`} // Додаємо ключ для FlatList, щоб уникнути помилки
              zIndex={0}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.pastryContainerSell, 
                    pastries[item].prepared === 0
                                 ? {backgroundColor: '#ff000040'}
                                 : null]}
                  onPress={() => sellPastry(item)}
                  disabled={pastries[item].prepared === 0}
                >
                  <Image source={pastries[item].image} style={styles.pastryImage} />
                  <Text style={[styles.sellText, { left: -10 }, ]}>{pastries[item].prepared}</Text>
                  <Text style={[styles.sellText, { color: '#FFD700' }]}>Sell</Text>
                  <Text style={[styles.sellText, { position: 'absolute', left: 50, top: 70 }]}>{pastries[item].price}</Text>
                  <Image style={[styles.coinIcon, { left: 95, position: 'absolute', top: 69 }]} source={require('../../../assets/images/coin.png')} />
                </TouchableOpacity>
              )}
            />
            <ScrollView style={[{alignSelf: 'center', position: 'absolute', marginTop: 350, height: 390, zIndex: 0}]} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 125 }} >
              <Image source={require('../../../assets/images/bakeryImgs/bakery.png')} style={[styles.bakeryCounter, {height: 390, margin: 0}]} />
            </ScrollView>

            <View style={[styles.navigationContainer, { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }]}>
              <TouchableOpacity onPress={() => setCurrentScreen(0)}>
                <Icon name="arrow-left-bold-circle" style={[styles.arrow]} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setCurrentScreen(0)}>
                <Icon name="arrow-right-bold-circle" style={[styles.arrow]} />
              </TouchableOpacity>
            </View>
          </>
          )}
        </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#00000080',
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  coinIcon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  text: {
    left: 75,
    fontWeight: '900',
    color: '#FFD700',
    position: 'absolute',
    fontSize: 16
  },
  pastryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: '95%',
    height: 70,
    backgroundColor: '#00000040',
    marginTop: 40,
    borderRadius: 40,
    padding: 15,
    borderColor: '#FFD700',
    borderWidth: 1,
    marginBottom: 35
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute', 
    top: 700,
  },
  arrow: {
    fontSize: 50,
    paddingBottom: 90,
    color: '#FFD700',
  },
  playerCoinsBox: {
    backgroundColor: '#00000040', // Semi-transparent button color
    paddingVertical: 5,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000', // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    borderColor: '#FFD700',
    borderWidth: 2,
    width: 100,
    height: 50,
    alignSelf: 'center'
  },
  coins: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFD700',
  },
  coinIcon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    position: 'absolute'
  },
  pastryImage: {
    width: 50,
    height: 50,
    // alignSelf: 'center', 
  },
  progressBar: {
    position: 'absolute',
    top: 90,
    left: 20,
  },
  resetButton: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    width: 180,
    alignSelf: 'center',
    height: 40,
    marginBottom: 90
  },
  resetText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000',
  },
  preparationButton: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 100,
    width: 180,
    alignSelf: 'center',
    height: 40,
    marginTop: 100
  },
  preparationText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000',
  },
  bakeryCounter: {
    // position: 'absolute',
    // alignSelf: 'center',
    resizeMode: 'contain',
    width: 230,

    // height: 'auto'
  },
  pastryContainerSell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    top: 20,
    width: '40%',
    height: 60,
    backgroundColor: '#00000040',
    borderRadius: 40,
    padding: 15,
    borderColor: '#FFD700',
    borderWidth: 1
  },
  sellText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
  }
});
