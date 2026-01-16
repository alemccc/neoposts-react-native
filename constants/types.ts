import { Control, FieldError } from 'react-hook-form';

import { SignUpFormValues } from '@/constants/validations';

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
}

export interface SignUpResponse {
  allowPasswordChange: boolean;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  provider: string;
  uid: string;
  updatedAt: string;
}

export type FormFieldType = {
  name: keyof SignUpFormValues;
  label: string;
  error?: FieldError;
  secureTextEntry?: boolean;
  control: Control<SignUpFormValues>;
};
