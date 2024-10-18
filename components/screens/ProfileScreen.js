import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileScreen () {
  const [name, setName] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Load profile data on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedName = await AsyncStorage.getItem('profileName');
        const savedPhoto = await AsyncStorage.getItem('profilePhoto');
        if (savedName) setName(savedName);
        if (savedPhoto) setPhotoUri(savedPhoto);
      } catch (error) {
        console.error('Error loading profile', error);
      }
    };
    loadProfile();
  }, []);

  // Save profile data
  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('profileName', name);
      if (photoUri) await AsyncStorage.setItem('profilePhoto', photoUri);
      alert('Profile saved!');
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile', error);
    }
  };

  // Choose profile picture
  const choosePhoto = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri);
      }
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
    setTimeout(() => setShowTooltip(false), 2000);  // Hide tooltip after 2 seconds
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/bcgr.jpeg')}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleTooltip}>
          <Icon name="information-variant" size={40} color="#FFD700" />
        </TouchableOpacity>
        {showTooltip && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>Customize your profile here! Change your name or profile picture anytime.</Text>
          </View>
        )}
      </View>
{/* 
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleEditMode} style={[{marginBottom: 20}]}>
          <Icon name={editMode ? "check" : "pencil"} size={30} color="#FFD700" />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity onPress={editMode ? choosePhoto : null} style={styles.photoContainer}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.circularImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.inputRow}>
        <View style={styles.nameTextBox}>
          <Text style={styles.inputLabel}>Name:</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={'white'}
              value={name}
              onChangeText={setName}
              autoCorrect={false}
            />
          ) : (
            <Text style={styles.nameText}>{name}</Text>
          )}
        </View>
          <TouchableOpacity onPress={toggleEditMode} style={styles.penIcon}>
            <Icon name={editMode ? "check" : "pencil"} size={25} color="#FFD700" />
          </TouchableOpacity>
      </View>

      {editMode && (
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensure the background fills the screen
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  photoContainer: {
    marginBottom: 20,
  },
  nameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 10,
    textAlign: 'center',
    paddingRight: 10
  },
  nameTextBox: {
    borderWidth: 2,
    borderColor: '#FFD700',
    color: '#00000080',
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 40,
    justifyContent: 'center',
  },
  circularImage: {
    width: 250, // Set width of the circular image
    height: 250, // Set height of the circular image
    borderRadius: 125, // Make it circular
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  placeholderImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#FFD700',
    borderWidth: 2,
    width: '60%',
    // marginTop: 20,
    // paddingLeft: 10,
    // paddingRight: 10,
    borderRadius: 40,
    backgroundColor: '#00000080',
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 18
  },
  inputRow: {
    flexDirection: 'row',  // Arrange elements in a row
    alignItems: 'center',  // Center elements vertically
    marginTop: 20,         // Top margin for better visibility
  },
  inputLabel: {
    color: '#FFD700',        // Color of the "Name:" text
    fontSize: 18,          // Font size
    fontWeight: '900',     // Semi-bold font
    lineHeight: 40,        // Set line height to match the height of TextInput
    // top: 8,
    paddingHorizontal: 10
  },
  saveButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    marginTop: 40,
    borderRadius: 40,
    width: '50%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    top: 70,
    right: 40, 
  },
  tooltip: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#00000080',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#FFD700',
    width: 200, // Максимальна ширина підказки
  },
  tooltipText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center', // Центрування тексту всередині підказки
  },
  penIcon: {
    marginLeft: 10, 
  },
});
