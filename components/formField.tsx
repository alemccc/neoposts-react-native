import {
  StyleSheet,
  Text, TextInput,
  View
} from 'react-native';

import { Controller } from 'react-hook-form';

import { FormFieldType } from '@/constants/types';

const FormField = ({
  name,
  label,
  error,
  secureTextEntry = false,
  control,
}: FormFieldType) => (
  <View>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <Text style={styles.formLabel}>{label}</Text>
          <TextInput
            style={[styles.textInput, error && styles.textInputError]}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            autoCapitalize={name === 'email' ? 'none' : 'sentences'}
            keyboardType={name === 'email' ? 'email-address' : 'default'}
          />
        </>
      )}
    />

    {error && (
      <Text style={styles.errorText}>
        {error.message}
      </Text>
    )}
  </View>
);

export const styles = StyleSheet.create({
  formLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 4,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  textInputError: {
    borderColor: '#dc3545',
  },
});

export default FormField;
