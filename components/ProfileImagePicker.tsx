import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';

import {
  launchImageLibraryAsync,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

import COLORS from '@/constants/colors';

interface ProfileImagePickerProps {
  onChange: (uri: string) => void;
}

const ProfileImagePicker = ({ onChange }: ProfileImagePickerProps) => {
  const { t } = useTranslation();

  const pickImage = async () => {
    const permissionResult = await requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(t('camera.permissionRequired'), t('camera.permissionToLibrary'));
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0].uri) {
      onChange(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(t('camera.permissionRequired'), t('camera.permissionToCamera'));
      return;
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0].uri) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.buttons}>
      <Pressable
        onPress={pickImage}
      >
        <Text style={styles.editPhoto}>
          {t('camera.chooseFromLibrary')}
        </Text>
      </Pressable>
      <Pressable
        onPress={takePhoto}
      >
        <Text style={styles.editPhoto}>
          {t('camera.takePhoto')}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    gap: 15,
  },
  editPhoto: {
    fontSize: 14,
    color: COLORS.primary,
  },
});

export default ProfileImagePicker;
