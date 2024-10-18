import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground, Share } from 'react-native';
import { CoinContext } from '../CoinProvider'; // Import the CoinContext

export default function Results() {
    const { totalCoins } = useContext(CoinContext); // Get totalCoins from context

    // Fictitious players data
    const players = [
        { id: 1, name: 'Olivia Johnson', coins: 5861 },
        { id: 2, name: 'Ethan Smith', coins: 5754 },
        { id: 3, name: 'Sophia Jones', coins: 4123 },
        { id: 4, name: 'Ava Williams', coins: 3511 },
        { id: 5, name: 'Noah Wilson', coins: 3488 },
        { id: 6, name: 'Mia Hernandez', coins: 1962 },
        { id: 7, name: 'Mason Garcia', coins: 1864 },
        { id: 8, name: 'Christopher Taylor', coins: 1481 },
        { id: 9, name: 'Corey Taylor', coins: 910 },
    ];

    // Function to handle sharing
    const handleShare = () => {
        const options = {
            message: `I have ${totalCoins} points in the quiz game! Can you beat me?`,
        };
        Share.share(options)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };

    return (
        <ImageBackground 
            source={require('../../assets/images/bcgr.jpeg')} // Background image
            style={styles.container}
            blurRadius={3}
        >
            <View style={[styles.playerCoinsBox, { width: 135, flexDirection: 'row', height: 40, justifyContent: 'center' }]}>
                <Text style={[styles.coins]}>{totalCoins} </Text>
                <Image style={[styles.coinIcon]} source={require('../../assets/images/coin.png')} />
            </View>

            <Text style={styles.subtitle}>Top Players</Text>
            <FlatList
                data={players}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.playerRow}>
                        <Text style={styles.playerName}>{item.name}</Text>
                        <Text style={[styles.coins, {position: 'absolute', left: 280}]}>{item.coins}</Text>
                        <Image style={[styles.coinIcon, {position: 'absolute', marginLeft: 335}]} source={require('../../assets/images/coin.png')} />
                    </View>
                )}
            />

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        backgroundColor: '#00000080',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#FFD700',
        left: 20
    },
    playerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#00000040',
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000', // Button shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderColor: '#FFD700',
        borderWidth: 2,
        width: 370,
        // right: 35,
        height: 43,
        alignSelf: 'center'
    },
    playerName: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
    },
    coins: {
        fontSize: 16,
        fontWeight: '900',
        color: '#FFD700',
    },
    shareButton: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 100,
        width: 250,
        alignSelf: 'center'
    },
    shareText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    coinIcon: {
        width: 20,
        height: 20,
        // marginRight: 5, // Space between the coin and the price
        alignSelf: 'center',
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
});
