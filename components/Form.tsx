import type { ReactNode } from 'react';

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { Control, FieldValues, FieldErrors, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FormField from '@/components/FormField';

import COLORS from '@/constants/colors';
import { fonts } from '@/constants/fonts';

interface FormFieldType<T extends FieldValues> {
  name: Path<T>;
  label: string;
  secureTextEntry: boolean;
  multiline?: boolean;
}

interface FormType<T extends FieldValues> {
  errorMessage?: string | null;
  formFields: readonly FormFieldType<T>[];
  onSubmit: () => void;
  isLoading: boolean;
  errors: FieldErrors<T>;
  control: Control<T>;
  buttonText: string;
  title?: string;
  children?: ReactNode;
  onEmailFocus?: () => void;
}

const Form = <T extends FieldValues>({
  errorMessage,
  formFields,
  onSubmit,
  isLoading,
  errors,
  control,
  buttonText,
  title,
  children,
  onEmailFocus,
}: FormType<T>) => {
  const { t } = useTranslation();

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
      automaticallyAdjustKeyboardInsets
    >
      <Text style={styles.title}>
        {title || t('common.appName')}
      </Text>

      {formFields.map(({ name, label, secureTextEntry, multiline }) => (
        <FormField<T>
          key={name}
          name={name}
          label={label}
          errorMessage={errors?.[name]?.message as string}
          secureTextEntry={secureTextEntry}
          control={control}
          multiline={multiline}
          onFocus={name === 'email' ? onEmailFocus : undefined}
        />
      ))}

      {errorMessage && (
        <View style={styles.apiErrorContainer}>
          <Text style={styles.apiErrorText}>
            {errorMessage}
          </Text>
        </View>
      )}

      <Pressable
        onPress={onSubmit}
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.black} />
        ) : (
          <Text style={{ fontSize: 18 }}>
            {buttonText}
          </Text>
        )}
      </Pressable>

      {children}
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: fonts.bold,
    textAlign: 'center',
    padding: 20,
  },
  submitButton: {
    width: 200,
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.black,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    marginTop: 30,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    padding: 20,
    backgroundColor: COLORS.white,
    gap: 20,
  },
  apiErrorContainer: {
    backgroundColor: COLORS.errorBackground,
    borderColor: COLORS.errorBorder,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
  },
  apiErrorText: {
    color: COLORS.errorText,
    textAlign: 'center',
  },
});

export default Form;
