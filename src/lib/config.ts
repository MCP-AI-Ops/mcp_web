/**
 * API 설정
 * 
 * 로컬 개발: 기본값으로 localhost 사용
 * 프로덕션: Vercel 환경 변수에서 EC2 IP/도메인 설정 필요
 * 
 * Vercel 환경 변수 설정:
 * - VITE_API_BASE_URL: http://ec2-ip:8000 또는 https://api.domain.com
 * - VITE_DEPLOY_API_BASE_URL: http://ec2-ip:8001 또는 https://deploy.domain.com
 */

// 일반 백엔드 API URL (8000 포트)
// 로컬 개발: http://localhost:8000
// 프로덕션: 환경 변수로 EC2 IP/도메인 설정 필수
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// MCP 배포 요청 전용 API URL (8001 포트)
// 로컬 개발: http://localhost:8001
// 프로덕션: 환경 변수로 EC2 IP/도메인 설정 필수
export const DEPLOY_API_BASE_URL = import.meta.env.VITE_DEPLOY_API_BASE_URL || 'http://localhost:8001';

// 프로덕션 환경에서 환경 변수 미설정 시 경고
if (import.meta.env.PROD) {
  if (!import.meta.env.VITE_API_BASE_URL) {
    console.warn('⚠️ VITE_API_BASE_URL 환경 변수가 설정되지 않았습니다. EC2 IP/도메인을 설정해주세요.');
  }
  if (!import.meta.env.VITE_DEPLOY_API_BASE_URL) {
    console.warn('⚠️ VITE_DEPLOY_API_BASE_URL 환경 변수가 설정되지 않았습니다. EC2 IP/도메인을 설정해주세요.');
  }
}

// 추가 설정이 필요한 경우 여기에 추가
export const config = {
  apiBaseUrl: API_BASE_URL,
  deployApiBaseUrl: DEPLOY_API_BASE_URL,
  // 다른 설정들...
};
