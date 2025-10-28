# 대전관저고 과학실 예약시스템

고등학교 과학실(물지실, 화생실) 예약을 위한 웹 애플리케이션입니다.

## 🎯 주요 기능

- ✅ 주간 시간표 형태의 예약 시스템
- ✅ 물지실/화생실 2개 과학실 관리
- ✅ 1~7교시 예약 가능
- ✅ 실시간 예약 동기화 (Firebase)
- ✅ 예약 생성/삭제 기능
- ✅ 이름 필수, 과목/학반 선택 입력
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 서울 시간대 기준

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Date**: date-fns

## 📦 설치 방법

### 1. 저장소 클론

```bash
git clone <repository-url>
cd Science-lab-reservation
```

### 2. 의존성 설치

```bash
npm install
```

### 3. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `science-lab-reservation`)
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

### 4. Firestore 데이터베이스 생성

1. Firebase Console에서 "Firestore Database" 메뉴 선택
2. "데이터베이스 만들기" 클릭
3. **프로덕션 모드**로 시작 (권장)
4. 위치 선택: `asia-northeast3 (Seoul)` 권장
5. 완료 대기

### 5. Firebase 웹 앱 등록

1. Firebase Console 프로젝트 설정 (⚙️ 아이콘)
2. "내 앱"에서 웹 앱 추가 (`</>` 아이콘)
3. 앱 닉네임 입력 (예: `science-lab-web`)
4. Firebase Hosting 설정하지 않음
5. **SDK 설정 및 구성** 정보 복사

### 6. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 7. Firestore 보안 규칙 설정

Firebase Console > Firestore Database > 규칙 탭에서 다음 규칙 추가:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reservations/{document=**} {
      // 모든 사용자가 읽기 가능
      allow read: if true;
      // 모든 사용자가 쓰기/삭제 가능 (학교 내부망에서만 사용 권장)
      allow write, delete: if true;
    }
  }
}
```

⚠️ **보안 강화가 필요한 경우**: Firebase Authentication을 추가하여 인증된 사용자만 접근하도록 설정하세요.

### 8. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 🚀 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com) 가입
2. GitHub 저장소 연결
3. 프로젝트 임포트
4. 환경 변수 설정 (`.env.local` 내용 복사)
5. 배포 시작

## 📖 사용 방법

### 예약 생성

1. 원하는 날짜와 교시의 빈 셀 클릭
2. 예약 모달에서 정보 입력
   - **성함** (필수)
   - 과목 (선택)
   - 학반 (선택)
3. "예약하기" 버튼 클릭

### 예약 삭제

1. 예약된 셀에 마우스 호버
2. 우측 상단의 X 버튼 클릭
3. 확인 다이얼로그에서 "확인" 클릭

### 주 이동

- **이전 주**: 헤더의 왼쪽 화살표(◀) 클릭
- **다음 주**: 헤더의 오른쪽 화살표(▶) 클릭

## 📁 프로젝트 구조

```
Science-lab-reservation/
├── app/
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지
├── components/
│   ├── Header.tsx           # 헤더 (제목, 날짜 네비게이션)
│   ├── TimeTable.tsx        # 시간표 컴포넌트
│   ├── TimeTableCell.tsx    # 시간표 셀
│   └── ReservationModal.tsx # 예약 모달
├── lib/
│   ├── firebase.ts          # Firebase 초기화
│   ├── firestore.ts         # Firestore CRUD 함수
│   └── utils.ts             # 유틸리티 함수
├── types/
│   └── index.ts             # TypeScript 타입 정의
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎨 커스터마이징

### 색상 변경

`tailwind.config.ts`에서 과학실별 색상 커스터마이징:

```typescript
colors: {
  physics: {  // 물지실
    500: '#14b8a6',
    600: '#0d9488',
  },
  chemistry: {  // 화생실
    500: '#a855f7',
    600: '#9333ea',
  },
}
```

### 교시 수 변경

`lib/utils.ts`에서 `PERIODS` 배열 수정:

```typescript
export const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8]; // 8교시까지
```

### 과학실 추가

1. `types/index.ts`에서 `RoomType` 수정
2. `lib/utils.ts`에서 `ROOMS` 배열 수정
3. `components/TimeTable.tsx`에서 색상 추가
4. `app/page.tsx`에서 TimeTable 컴포넌트 추가

## 🐛 문제 해결

### Firebase 연결 오류

- `.env.local` 파일이 올바르게 설정되었는지 확인
- 환경 변수명이 `NEXT_PUBLIC_` 접두사로 시작하는지 확인
- 개발 서버 재시작 (`npm run dev`)

### 예약이 표시되지 않음

- Firebase Console에서 Firestore 규칙 확인
- 브라우저 개발자 도구에서 네트워크 오류 확인
- Firestore 데이터베이스가 생성되었는지 확인

### 날짜가 잘못 표시됨

- 서울 시간대(`Asia/Seoul`)가 올바르게 적용되는지 확인
- 브라우저 시간대 설정 확인

## 📞 지원

문제가 발생하거나 기능 요청이 있으면 이슈를 등록해주세요.

## 📄 라이선스

MIT License

---

**만든 사람**: 대전관저고등학교
**버전**: 1.0.0
**최종 업데이트**: 2025년 10월

