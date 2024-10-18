import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
    const [totalCoins, setTotalCoins] = useState(0);

    const [pastries, setPastries] = useState({
        donuts: { prepared: 0, price: 200, cookingTime: 1200000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/donut.png') },
        candies: { prepared: 0, price: 400, cookingTime: 2400000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/candy.png') },
        croissants: { prepared: 0, price: 600, cookingTime: 3000000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/croissant.png') },
        cakes: { prepared: 0, price: 1000, cookingTime: 3600000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/cake.png') },
    });

    useEffect(() => {
        const loadCoinsAndPastries = async () => {
            try {
                const savedCoins = await AsyncStorage.getItem('totalCoins');
                const savedPastries = await AsyncStorage.getItem('pastries');

                if (savedCoins !== null) {
                    setTotalCoins(parseInt(savedCoins));
                } else {
                    // If no saved coins are found, keep it at default (0)
                    setTotalCoins(0);
                }

                if (savedPastries !== null) {
                    setPastries(JSON.parse(savedPastries));
                } else {
                    // If no saved pastries are found, keep it at default
                    setPastries({
                        donuts: { prepared: 0, price: 200, cookingTime: 1200000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/donut.png') },
                        candies: { prepared: 0, price: 400, cookingTime: 2400000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/candy.png') },
                        croissants: { prepared: 0, price: 600, cookingTime: 3000000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/croissant.png') },
                        cakes: { prepared: 0, price: 1000, cookingTime: 3600000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/cake.png') },
                    });
                }
            } catch (error) {
                console.error('Failed to load data:', error);
                // If an error occurs, also set to default values
                setTotalCoins(0);
                setPastries({
                    donuts: { prepared: 0, price: 200, cookingTime: 1200000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/donut.png') },
                    candies: { prepared: 0, price: 400, cookingTime: 2400000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/candy.png') },
                    croissants: { prepared: 0, price: 600, cookingTime: 3000000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/croissant.png') },
                    cakes: { prepared: 0, price: 1000, cookingTime: 3600000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/cake.png') },
                });
            }
        };

        loadCoinsAndPastries();
    }, []);

    const resetPastries = async () => {
        const resetPastries = {
            donuts: { prepared: 0, price: 200, cookingTime: 1200000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/donut.png') },
            candies: { prepared: 0, price: 400, cookingTime: 2400000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/candy.png') },
            croissants: { prepared: 0, price: 600, cookingTime: 3000000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/croissant.png') },
            cakes: { prepared: 0, price: 1000, cookingTime: 3600000, isPreparing: false, startTime: null, image: require('../assets/images/bakeryImgs/cake.png') },
        };

        setPastries(resetPastries); // Update pastries state
        await AsyncStorage.removeItem('pastries'); // Clear AsyncStorage
        console.log('Pastries have been reset');
    };

    const resetCoins = async () => {
        try {
            await AsyncStorage.removeItem('totalCoins'); // Delete local save
            setTotalCoins(0); // Set coins to 0
            console.log('Points reset to 0');
        } catch (error) {
            console.error('Failed to reset points:', error);
        }
    };

    return (
        <CoinContext.Provider value={{ totalCoins, setTotalCoins, resetCoins, resetPastries, pastries, setPastries }}>
            {children}
        </CoinContext.Provider>
    );
};
