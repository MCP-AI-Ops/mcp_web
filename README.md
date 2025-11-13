# LaunchA Cloud - Frontend

React + TypeScript 기반 MCP 예측/이상탐지 플랫폼 프론트엔드

## 기술 스택

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **State Management**: Context API + TanStack Query
- **Deployment**: Vercel

## 프로젝트 구조

```
mcp_web/
├── src/
│   ├── pages/          # 페이지 컴포넌트
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Predict.tsx (Dashboard)
│   │   ├── Projects.tsx
│   │   └── Settings.tsx
│   ├── components/     # 재사용 가능한 컴포넌트
│   │   ├── CreateProjectDialog.tsx
│   │   ├── navigation.tsx
│   │   └── ...
│   ├── contexts/       # Context API
│   │   └── AuthContext.tsx
│   ├── lib/           # API 및 유틸리티
│   │   ├── authAPI.ts
│   │   ├── mcpAPI.ts
│   │   └── config.ts
│   └── App.tsx        # 라우팅 설정
├── vercel.json        # Vercel 배포 설정
└── package.json
```

## 환경 변수 설정

### 개발 환경

`.env` 파일 생성 (또는 `.env.local`):

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 프로덕션 환경 (Vercel)

Vercel 대시보드에서 환경 변수 설정:

```
VITE_API_BASE_URL=https://your-api-domain.com
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## API 엔드포인트

### 인증 API (`/auth`)

- `POST /auth/signup` - 회원가입
- `POST /auth/login` - 로그인
- `DELETE /auth/delete` - 계정 삭제

### 예측 API (`/plans`)

- `POST /plans` - Context JSON을 기반으로 예측 요청

**요청 예시:**
```json
{
  "service_id": "svc-1234567890",
  "metric_name": "cpu_usage",
  "context": {
    "github_url": "https://github.com/username/repo",
    "expected_users": 100
  }
}
```

**응답 예시:**
```json
{
  "prediction": {
    "service_id": "svc-1234567890",
    "metric_name": "cpu_usage",
    "model_version": "web_normal_v1",
    "generated_at": "2025-01-19T...",
    "predictions": [...]
  },
  "recommended_flavor": "medium",
  "expected_cost_per_day": 2.8,
  "generated_at": "2025-01-19T...",
  "notes": "(더미) cost/flavor 룰 기반 산정"
}
```

## 배포 (Vercel)

### 1. Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 2. GitHub 연동

1. GitHub 저장소에 코드 푸시
2. Vercel 대시보드에서 프로젝트 import
3. 환경 변수 설정 (`VITE_API_BASE_URL`)
4. 자동 배포 완료

### 3. 환경 변수 설정

Vercel 대시보드 → Settings → Environment Variables:

- `VITE_API_BASE_URL`: 백엔드 API URL

## 주요 기능

### 1. 인증 시스템
- JWT 기반 토큰 인증
- localStorage에 토큰 저장
- PrivateRoute/PublicRoute로 라우팅 보호
- 테스트 계정 로그인 기능

### 2. 프로젝트 생성
- GitHub Repository URL 입력
- 예상 사용자 수 입력
- Context JSON 자동 생성 및 MCP API로 전송
- 자동 배포 트리거

### 3. 대시보드
- Metrics Overview (프로젝트 수, 배포 수, VM 수 등)
- Resource Usage Charts (CPU/Memory)
- Activity Log

## 백엔드 연동

백엔드 API는 `mcp_core` 디렉토리에 있습니다.

### CORS 설정

백엔드(`mcp_core/app/main.py`)에서 CORS가 설정되어 있어야 합니다:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:5173",
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 문제 해결

### CORS 에러

- 백엔드의 CORS 설정 확인
- 프론트엔드 도메인이 `allow_origins`에 포함되어 있는지 확인

### API 연결 실패

- `VITE_API_BASE_URL` 환경 변수 확인
- 백엔드 서버가 실행 중인지 확인
- 네트워크 탭에서 요청/응답 확인

## 라이선스

MIT
