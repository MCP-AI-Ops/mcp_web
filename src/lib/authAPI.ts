// src/lib/authAPI.ts

import { API_BASE_URL } from './config';

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    let errorMessage = '요청에 실패했습니다.';
    try {
      const errorData = await res.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch {
      errorMessage = res.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return res.json();
};

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);  // { access_token, token_type }
  },

  signup: async (formData: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return handleResponse(res);
  },

  // 프로젝트 정보 업데이트 (사용자 정보 업데이트)
  // TODO: 백엔드에 사용자 정보 업데이트 API가 추가되면 해당 엔드포인트로 변경
  updateProject: async (projectData: {
    github_repo_url: string;
    expected_users: number;
  }, token: string) => {
    // 현재는 백엔드에 프로젝트 업데이트 API가 없으므로
    // 로컬 스토리지에 저장하거나, 백엔드 API가 추가되면 해당 엔드포인트 사용
    // 예: PUT /auth/profile 또는 PUT /user/project
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });
    return handleResponse(res);
  }
};
