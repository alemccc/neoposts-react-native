import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Controller, FieldValues, Control, Path } from 'react-hook-form';

import COLORS from '@/constants/colors';

interface FormFieldType<T extends FieldValues> {
  name: Path<T>;
  label: string;
  errorMessage?: string;
  secureTextEntry?: boolean;
  control: Control<T>;
  multiline?: boolean;
  onFocus?: () => void;
}

const FormField = <T extends FieldValues>({
  name,
  label,
  errorMessage,
  secureTextEntry = false,
  control,
  multiline = false,
  onFocus,
}: FormFieldType<T>) => (
  <View>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <Text style={styles.formLabel}>{label}</Text>
          <TextInput
            style={[
              styles.textInput,
              multiline && styles.textArea,
              errorMessage && styles.textInputError,
            ]}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            autoCapitalize={name === 'email' ? 'none' : 'sentences'}
            keyboardType={name === 'email' ? 'email-address' : 'default'}
            multiline={multiline}
            onFocus={onFocus}
          />
        </>
      )}
    />

    {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
  </View>
);

export const styles = StyleSheet.create({
  formLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 4,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    borderRadius: 5,
  },
  textInputError: {
    borderColor: COLORS.red,
  },
  textArea: {
    height: 140,
    textAlignVertical: 'top',
  },
});

export default FormField;
