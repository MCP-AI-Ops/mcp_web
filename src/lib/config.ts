// 환경 변수에서 API URL 가져오기, 없으면 기본값 사용
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// 추가 설정이 필요한 경우 여기에 추가
export const config = {
  apiBaseUrl: API_BASE_URL,
  // 다른 설정들...
};
