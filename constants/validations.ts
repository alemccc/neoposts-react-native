import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required'),
    email: z
      .string()
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required'),
  body: z
    .string()
    .min(1, 'Body is required'),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;
export type CreatePostFormValues = z.infer<typeof createPostSchema>;
