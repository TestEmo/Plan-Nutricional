import { UserData } from '../types';

const WEBHOOK_URL = 'https://webhook.n8.emopruebas.space/webhook/test-app-web';

export const submitUserData = async (userData: UserData) => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting data:', error);
    throw error;
  }
};
