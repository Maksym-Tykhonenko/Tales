import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DailyBonusModal({ visible, onClaim, onClose }) {
  const [bonusAmount, setBonusAmount] = useState(0);

  useEffect(() => {
    const getBonusAmount = async () => {
      const lastClaimedDay = parseInt(await AsyncStorage.getItem('lastClaimedDay')) || 0;
      const currentDay = (lastClaimedDay % 5); // Rotate every 5 days
      
      // Set bonus amount based on the current day
      const bonuses = [100, 500, 1000, 2000, 3000];
      setBonusAmount(bonuses[currentDay]);
    };

    if (visible) {
      getBonusAmount();
    }
  }, [visible]);

  const handleClaim = async () => {
    await onClaim(bonusAmount); // Invoke the function to claim the bonus
    const lastClaimedDay = parseInt(await AsyncStorage.getItem('lastClaimedDay')) || 0;
    await AsyncStorage.setItem('lastClaimedDay', (lastClaimedDay + 1).toString()); // Update the last claimed day
    onClose(); // Close the modal
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Claim Your Sweet Bonus!</Text>
          <Image source={require('../../assets/images/gift-icon.jpeg')} style={styles.icon} />
          <Text style={styles.bonusText}>You have received: {bonusAmount} points!</Text>
          <Button title="Claim" onPress={handleClaim} />
          <Button title="Close" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  bonusText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
