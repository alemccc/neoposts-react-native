import { useState } from 'react';

import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { speak, pause, resume, isSpeakingAsync } from 'expo-speech';
import { franc } from 'franc-min';

interface SpeechProps {
  text: string;
}

const LANG_MAP = {
  'eng': 'en-US',
  'spa': 'es-ES',
};

const detectLanguage = (text: string) => {
  const code = franc(text);

  return LANG_MAP[code as keyof typeof LANG_MAP] || 'es-ES';
};

const Speech = ({ text }: SpeechProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeechEnd = () => setIsSpeaking(false);
  const handleSpeechContinue = () => setIsSpeaking(true);

  const speakText = () => {
    const language = detectLanguage(text);
    speak(text, {
      language,
      onStart: handleSpeechContinue,
      onDone: handleSpeechEnd,
      onStopped: handleSpeechEnd,
      onError: handleSpeechEnd,
    });
  };

  const pauseSpeech = () => {
    pause();
    handleSpeechEnd();
  };

  const playSpeech = async () => {
    const isAudioPaused = await isSpeakingAsync();

    if (isSpeaking) {
      pauseSpeech();
    } else if (isAudioPaused) {
      resume();
      handleSpeechContinue();
    } else {
      speakText();
    }
  };

  return (
    <View style={styles.container}>
      {isSpeaking ? (
        <TouchableOpacity onPress={pauseSpeech} accessibilityLabel="Pause">
          <Ionicons name='pause' style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={playSpeech} accessibilityLabel="Play">
          <Ionicons name='play' style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
});

export default Speech;
