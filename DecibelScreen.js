import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';

const DecibelScreen = () => {
  const [decibelValue, setDecibelValue] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access microphone denied!');
        return;
      }

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      newRecording.setOnRecordingStatusUpdate((status) => {
        const amplitude = status.metering;
        if (!isNaN(amplitude)) {
          const decibelValue = status.metering;
          console.log('Decibel value:', decibelValue);
          setDecibelValue(decibelValue);
        }
      });

      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording && isRecording) {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        setRecording(null);
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  useEffect(() => {
    return () => {
      if (recording) {
        recording.setOnRecordingStatusUpdate(null);
      }
    };
  }, [recording]);

  return (
    <View style={styles.container}>
      <Text>Decibel Value: {decibelValue}</Text>
      {!isRecording ? (
        <Button title="Start Recording" onPress={startRecording} />
      ) : (
        <Button title="Stop Recording" onPress={stopRecording} />
      )}
    </View>
  );
};


const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default DecibelScreen;
