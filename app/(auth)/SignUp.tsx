import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormField from "@/components/FormField";
import COLORS from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { signUpSchema, type SignUpFormValues } from "@/constants/validations";
import { useSignUpMutation } from "@/store/apis/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState<string | null>(null);

  const signUpFormFields = [
    { name: "name", label: t("signUp.fields.name"), secureTextEntry: false },
    { name: "email", label: t("signUp.fields.email"), secureTextEntry: false },
    {
      name: "password",
      label: t("signUp.fields.password"),
      secureTextEntry: true,
    },
    {
      name: "confirmPassword",
      label: t("signUp.fields.confirmPassword"),
      secureTextEntry: true,
    },
  ] as const;

  const [signUp, { data, isError, isLoading, isSuccess }] = useSignUpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    signUp({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirmation: data.confirmPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));

      router.replace("/");
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError) {
      setApiError(t("signUp.error"));
    }
  }, [isError, t]);

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
      automaticallyAdjustKeyboardInsets
    >
      <Text style={styles.title}>{t("signUp.title")}</Text>

      <Text style={styles.subtitle}>{t("signUp.subtitle")}</Text>

      {apiError && (
        <View style={styles.apiErrorContainer}>
          <Text style={styles.apiErrorText}>{apiError}</Text>
        </View>
      )}

      {signUpFormFields.map(({ name, label, secureTextEntry }) => (
        <FormField
          key={name}
          name={name}
          label={label}
          error={errors[name]}
          secureTextEntry={secureTextEntry}
          control={control}
        />
      ))}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.black} />
        ) : (
          <Text style={{ fontSize: 18 }}>{t("signUp.signUp")}</Text>
        )}
      </Pressable>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: fonts.bold,
    textAlign: "center",
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.subtitle,
    marginBottom: 10,
  },
  submitButton: {
    width: 200,
    height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.black,
    alignSelf: "center",
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
    textAlign: "center",
  },
});

export default SignUp;
