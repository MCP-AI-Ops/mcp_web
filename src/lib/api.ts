// src/lib/api.ts
import { API_BASE_URL } from './config';

interface PredictResponse {
  predictions: number[][];
  confidence?: number;
}

interface AnomalyResponse {
  anomalies: number[];
  scores?: number[];
}

interface ModelInfoResponse {
  model_name: string;
  version: string;
  [key: string]: any;
}

export const api = {
  // 헬스체크
  checkHealth: async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error('Health check failed');
    return response.json();
  },

  // 24시간 예측
  predict24h: async (sequence: number[][], context: string = 'normal'): Promise<PredictResponse> => {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sequence, context })
    });
    if (!response.ok) throw new Error('Prediction failed');
    return response.json();
  },

  // 이상 탐지
  detectAnomalies: async (data: number[], method: string = 'both'): Promise<AnomalyResponse> => {
    const response = await fetch(`${API_BASE_URL}/anomaly/detect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, method })
    });
    if (!response.ok) throw new Error('Anomaly detection failed');
    return response.json();
  },

  // 모델 정보
  getModelInfo: async (): Promise<ModelInfoResponse> => {
    const response = await fetch(`${API_BASE_URL}/model/info`);
    if (!response.ok) throw new Error('Failed to fetch model info');
    return response.json();
  }
};
