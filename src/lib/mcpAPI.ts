// src/lib/mcpApi.ts

import { API_BASE_URL } from './config';

export const mcpApi = {
  predictWithContext: async (payload: any, token: string) => {
    const res = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Predict failed');
    return res.json();
  }
};
