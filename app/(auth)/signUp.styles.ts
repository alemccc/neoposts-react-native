import { StyleSheet } from 'react-native';

import { fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: fonts.bold,
    textAlign: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  submitButton: {
    width: 200,
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 30,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    backgroundColor: '#fff',
    gap: 20,
  },
  apiErrorContainer: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
  },
  apiErrorText: {
    color: '#721c24',
    textAlign: 'center',
  },
});
