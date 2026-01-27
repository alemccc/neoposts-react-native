import { StyleSheet } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import Form from '@/components/Form';

import {
  createPostSchema,
  type CreatePostFormValues,
} from '@/constants/validations';

import { useCreatePostMutation } from '@/store/apis/postsApi';

const CreatePost = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const createPostFormFields = [
    {
      name: 'title',
      label: t('createPost.fields.title'),
      secureTextEntry: false,
    },
    {
      name: 'body',
      label: t('createPost.fields.content'),
      secureTextEntry: false,
      multiline: true,
    },
  ] as const;

  const onSubmit = async ({ title, body }: CreatePostFormValues) => {
    try {
      await createPost({
        title,
        body,
        publishedAt: new Date().toISOString(),
      });

      Toast.show({
        type: 'success',
        text2: t('createPost.success'),
      });

      router.back();
    } catch {
      Toast.show({
        type: 'error',
        text2: t('createPost.error'),
      });
    }
  };

  return (
    <Form
      buttonText={t('createPost.submit')}
      formFields={createPostFormFields}
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      errors={errors}
      title={t('createPost.title')}
    />
  );
};

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default CreatePost;
