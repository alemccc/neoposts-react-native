import { useState } from 'react';

import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
} from 'expo-local-authentication';

export function useLocalAuth() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAvailability = async () => {
    const hasHardware = await hasHardwareAsync();
    const isEnrolled = await isEnrolledAsync();

    console.log('hasHardware:', hasHardware, 'isEnrolled:', isEnrolled);
    return hasHardware && isEnrolled;
  };

  const authenticate = async (
    promptMessage = 'Authenticate to continue',
  ) => {
    setIsAuthenticating(true);
    setError(null);

    try {
      const available = await checkAvailability();
      console.log('Biometric availability:', available);

      if (!available) {
        setError('No biometrics set up.');
        setIsAuthenticating(false);
        return false;
      }

      const result = await authenticateAsync({
        promptMessage,
        disableDeviceFallback: true,
      });

      setIsAuthenticating(false);
      if (!result.success) {
        setError(result.error || 'Authentication failed.');
      }

      return result.success;
    } catch (e: any) {
      setError(e.message || 'Authentication error.');
      setIsAuthenticating(false);
      return false;
    }
  };

  return { authenticate, isAuthenticating, error };
}
