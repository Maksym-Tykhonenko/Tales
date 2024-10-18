import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function About ({ navigation }) {
    return (
        <ImageBackground 
            source={require('../../assets/images/bcgr.jpeg')} // Background image
            style={styles.container}
            blurRadius={3}
        >
            <Text style={styles.title}>About the App</Text>
            <Text style={styles.description}>
                Welcome to Tales of Sweet Fortune Quest—a unique combination of exciting quizzes and captivating stories that will take you on a journey through the sweet legends of luck and fortune. Explore hidden symbols, ancient traditions, and delightful rituals from various cultures connected to luck and success.
            </Text>

            <TouchableOpacity style={[styles.backButton]} onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    backButton: {
        backgroundColor: '#FFD700',
        padding: 12,
        borderRadius: 30,
        alignItems: 'center',
        width: 180,
        alignSelf: 'center',
        height: 40,
        top: 80
      },
      backText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
      },
    title: {
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 20,
        color: '#FFD700',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        color: '#FFD700',
        fontWeight: '400'
    },
});