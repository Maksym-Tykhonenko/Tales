import React, { useEffect, useRef, useState } from 'react';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Enable playback in silence mode (iOS only)
Sound.setCategory('Playback');

export default function BackgroundMusic({ volume }) {
  const soundRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [storedVolume, setStoredVolume] = useState(volume);

  const tracks = [
    require('../assets/music/BlissfulSunnyAfternoon.mp3'), 
    require('../assets/music/DreamyChildhoodToybox.mp3'), 
    require('../assets/music/EchoesOfLaughter.mp3'),
    require('../assets/music/MedievalMeadowMusings.mp3'), 
    require('../assets/music/ShimmeringChildhoodMemories.mp3'), 
    require('../assets/music/SunnyPlaygroundMemories.mp3'), 
    require('../assets/music/SunshineMeadow.mp3'), 
    require('../assets/music/SweetCreamyDelight.mp3'), 
    require('../assets/music/ToyBoxSymphony.mp3'), 
    require('../assets/music/WhimsyUnderMoonlight.mp3'),  
  ];

useEffect(() => {
    // Load the current track
    soundRef.current = new Sound(tracks[currentTrack], (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }

      // Play the sound if successfully loaded
      soundRef.current.setVolume(volume); // Set initial volume
      soundRef.current.play((success) => {
        if (!success) {
          console.log('Playback failed due to audio decoding errors');
        } else {
          console.log('Track finished playing!');
          playNextTrack(); // Play next track after the current one finishes
        }
      });
    });

    // Cleanup function to stop and release sound
    return () => {
      if (soundRef.current) {
        soundRef.current.stop(() => {
          console.log('Music stopped successfully!');
        });
        soundRef.current.release();
      }
    };
  }, [currentTrack]); // Re-run effect only when the track changes

  useEffect(() => {
    if (soundRef.current) {
      const roundedVolume = Math.round(storedVolume * 100) / 100;
      soundRef.current.setVolume(roundedVolume); // Round the volume
      console.log(`Volume set to: ${roundedVolume}`);
    }
  }, [storedVolume]); // Update volume whenever stored volume changes

  const checkVolumeChange = async () => {
    try {
      const volumeValue = await AsyncStorage.getItem('musicVolume');
      if (volumeValue !== null) {
        const parsedVolume = JSON.parse(volumeValue);
        if (parsedVolume !== storedVolume) {
          setStoredVolume(parsedVolume); // Update storedVolume if it changes
        }
      }
    } catch (error) {
      console.error('Failed to fetch volume from AsyncStorage', error);
    }
  };

  const playNextTrack = () => {
    // Move to the next track in the list, or loop back to the first one
    setCurrentTrack((prevTrack) => (prevTrack + 1) % tracks.length);
  };

  useEffect(() => {
    const intervalId = setInterval(checkVolumeChange, 100);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return null; // This component does not render anything
};
