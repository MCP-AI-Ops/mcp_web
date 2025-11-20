/**
 * API 설정
 * 
 * 로컬 개발: 기본값으로 localhost 사용
 * 프로덕션: Vercel 환경 변수에서 EC2 IP/도메인 설정 필요
 * 
 * Vercel 환경 변수 설정:
 * - VITE_API_BASE_URL: https://api.launcha.cloud
 * - VITE_DEPLOY_API_BASE_URL: https://deploy.launcha.cloud
 * - VITE_BACKEND_API_BASE_URL: https://backend.launcha.cloud (backend_api용)
 */

const isBrowser = typeof window !== "undefined";
const runtimeOrigin = isBrowser ? window.location.origin : undefined;
const PROD_DEFAULT_API = "https://api.launcha.cloud";
const PROD_DEFAULT_DEPLOY = "https://deploy.launcha.cloud";
const isProdEnv = Boolean(import.meta.env.PROD);
const isDev = !isProdEnv;

// MCP Core API URL (plans, auth 등 - 8000 포트)
// 로컬 개발: http://localhost:8000
// 프로덕션: VITE_API_BASE_URL → 없다면 현재 Origin(또는 api.launcha.cloud) 사용

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (isDev ? "http://localhost:8000" : runtimeOrigin || PROD_DEFAULT_API);

// MCP 배포 요청 전용 API URL (deploy_main - 8001 포트)
// 로컬 개발: http://localhost:8001
// 프로덕션: VITE_DEPLOY_API_BASE_URL → 없으면 deploy.launcha.cloud
export const DEPLOY_API_BASE_URL =
  import.meta.env.VITE_DEPLOY_API_BASE_URL ||
  (isDev ? "http://localhost:8001" : PROD_DEFAULT_DEPLOY);

// 자연어 → MCPContext 변환을 담당하는 backend_api 서버 URL
// 로컬 개발: http://localhost:8001
// 프로덕션: VITE_BACKEND_API_BASE_URL → 없으면 API_BASE_URL과 동일한 Origin 사용
export const BACKEND_API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_BASE_URL ||
  (isDev ? "http://localhost:8001" : API_BASE_URL);

// 프로덕션 환경에서 환경 변수 미설정 시 경고
if (import.meta.env.PROD) {
  if (!import.meta.env.VITE_API_BASE_URL) {
    console.warn('⚠️ VITE_API_BASE_URL 환경 변수가 설정되지 않았습니다. EC2 IP/도메인을 설정해주세요.');
  }
  if (!import.meta.env.VITE_DEPLOY_API_BASE_URL) {
    console.warn('⚠️ VITE_DEPLOY_API_BASE_URL 환경 변수가 설정되지 않았습니다. EC2 IP/도메인을 설정해주세요.');
  }
  if (!import.meta.env.VITE_BACKEND_API_BASE_URL) {
    console.warn('⚠️ VITE_BACKEND_API_BASE_URL 환경 변수가 설정되지 않았습니다. backend_api URL을 설정해주세요.');
  }
}

// 추가 설정이 필요한 경우 여기에 추가
export const config = {
  apiBaseUrl: API_BASE_URL,
  deployApiBaseUrl: DEPLOY_API_BASE_URL,
  // 다른 설정들...
};
