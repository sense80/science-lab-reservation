# Firebase 설정 가이드

이 문서는 Firebase를 처음 사용하시는 분들을 위한 상세 설정 가이드입니다.

## 📋 목차

1. [Firebase 프로젝트 생성](#1-firebase-프로젝트-생성)
2. [Firestore 데이터베이스 설정](#2-firestore-데이터베이스-설정)
3. [웹 앱 등록 및 설정](#3-웹-앱-등록-및-설정)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [보안 규칙 설정](#5-보안-규칙-설정)
6. [테스트](#6-테스트)

---

## 1. Firebase 프로젝트 생성

### 1.1 Firebase Console 접속

1. 웹 브라우저에서 [https://console.firebase.google.com/](https://console.firebase.google.com/) 접속
2. Google 계정으로 로그인

### 1.2 새 프로젝트 추가

1. **"프로젝트 추가"** 버튼 클릭
2. **프로젝트 이름** 입력
   - 예: `science-lab-reservation` 또는 `관저고-과학실-예약`
3. **계속** 클릭
4. **Google Analytics** 설정 (선택사항)
   - 필요 없으면 비활성화 가능
5. **프로젝트 만들기** 클릭
6. 프로젝트 생성 완료 대기 (약 30초)

---

## 2. Firestore 데이터베이스 설정

### 2.1 Firestore 데이터베이스 생성

1. 왼쪽 메뉴에서 **"Firestore Database"** 클릭
2. **"데이터베이스 만들기"** 버튼 클릭

### 2.2 보안 규칙 선택

**프로덕션 모드**를 선택하세요 (권장)
- ✅ 프로덕션 모드: 나중에 규칙을 직접 설정
- ❌ 테스트 모드: 30일 후 자동으로 쓰기 권한이 차단됨

**다음** 클릭

### 2.3 Cloud Firestore 위치 선택

- **asia-northeast3 (Seoul)** 선택 (한국)
- 또는 **asia-northeast1 (Tokyo)** 선택 (일본)

⚠️ **중요**: 위치는 나중에 변경할 수 없습니다!

**사용 설정** 클릭

### 2.4 완료 대기

데이터베이스 생성이 완료될 때까지 기다립니다 (약 1분).

---

## 3. 웹 앱 등록 및 설정

### 3.1 프로젝트 설정 열기

1. 왼쪽 상단의 **⚙️ (톱니바퀴) 아이콘** 클릭
2. **"프로젝트 설정"** 클릭

### 3.2 웹 앱 추가

1. 아래로 스크롤하여 **"내 앱"** 섹션 찾기
2. **웹 아이콘 (`</>`)** 클릭
3. **앱 닉네임** 입력
   - 예: `science-lab-web`
4. ❌ "Firebase Hosting 설정" 체크 해제 (필요 없음)
5. **앱 등록** 클릭

### 3.3 SDK 구성 정보 복사

다음과 같은 형식의 코드가 표시됩니다:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**이 정보를 메모장에 복사해두세요!** (다음 단계에서 사용)

**콘솔로 이동** 클릭

---

## 4. 환경 변수 설정

### 4.1 .env.local 파일 생성

프로젝트 루트 폴더(package.json이 있는 곳)에서:

1. `.env.local` 파일 생성
2. 다음 내용 입력:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=복사한_apiKey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=복사한_authDomain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=복사한_projectId
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=복사한_storageBucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=복사한_messagingSenderId
NEXT_PUBLIC_FIREBASE_APP_ID=복사한_appId
```

### 4.2 예시

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=science-lab-reservation.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=science-lab-reservation
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=science-lab-reservation.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

⚠️ **주의사항**:
- 따옴표 없이 입력
- 공백 없이 입력
- `=` 앞뒤에 공백 없이

---

## 5. 보안 규칙 설정

### 5.1 Firestore 보안 규칙 열기

1. Firebase Console에서 **Firestore Database** 메뉴
2. 상단의 **"규칙"** 탭 클릭

### 5.2 규칙 작성

기존 규칙을 삭제하고 다음 규칙을 복사-붙여넣기:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // reservations 컬렉션 규칙
    match /reservations/{document=**} {
      // 모든 사용자가 읽기 가능
      allow read: if true;
      // 모든 사용자가 쓰기/삭제 가능
      allow write, delete: if true;
    }
  }
}
```

### 5.3 규칙 게시

**게시** 버튼 클릭

### 5.4 보안 강화 (선택사항)

학교 외부에서 접근을 제한하려면:

#### 방법 1: Firebase Authentication 사용

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reservations/{document=**} {
      // 로그인한 사용자만 접근
      allow read, write, delete: if request.auth != null;
    }
  }
}
```

#### 방법 2: IP 제한 (Firestore는 지원 안 함)
- 대신 Next.js middleware에서 처리

---

## 6. 테스트

### 6.1 개발 서버 실행

터미널에서:

```bash
npm run dev
```

### 6.2 브라우저에서 확인

[http://localhost:3000](http://localhost:3000) 접속

### 6.3 테스트 예약 생성

1. 빈 셀 클릭
2. 이름 입력 (예: "테스트")
3. "예약하기" 클릭
4. 예약이 표시되는지 확인

### 6.4 Firebase Console에서 확인

1. Firebase Console > Firestore Database
2. `reservations` 컬렉션 생성 확인
3. 문서(예약 데이터) 확인

---

## 🔍 문제 해결

### 오류: "Firebase: Error (auth/api-key-not-valid)"

**원인**: API 키가 잘못되었습니다.

**해결**:
1. `.env.local` 파일의 `NEXT_PUBLIC_FIREBASE_API_KEY` 확인
2. Firebase Console > 프로젝트 설정에서 올바른 키 복사
3. 개발 서버 재시작 (`Ctrl+C` 후 `npm run dev`)

---

### 오류: "Missing or insufficient permissions"

**원인**: Firestore 보안 규칙이 잘못되었습니다.

**해결**:
1. Firebase Console > Firestore Database > 규칙 탭
2. 위의 [5.2 규칙 작성](#52-규칙-작성) 내용 복사
3. **게시** 클릭

---

### 데이터가 표시되지 않음

**확인 사항**:
1. `.env.local` 파일이 프로젝트 루트에 있는지
2. 환경 변수명에 `NEXT_PUBLIC_` 접두사가 있는지
3. 개발 서버를 재시작했는지
4. 브라우저 개발자 도구(F12) > Console 탭에서 오류 확인

---

### 네트워크 오류

**확인 사항**:
1. 인터넷 연결 확인
2. 방화벽 설정 확인
3. Firebase Console에서 프로젝트 상태 확인

---

## 📞 추가 도움말

- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Firestore 시작하기](https://firebase.google.com/docs/firestore/quickstart)
- [Next.js + Firebase 가이드](https://firebase.google.com/docs/web/setup)

---

## ✅ 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] Firebase 프로젝트 생성 완료
- [ ] Firestore 데이터베이스 생성 완료
- [ ] 웹 앱 등록 완료
- [ ] SDK 구성 정보 복사 완료
- [ ] `.env.local` 파일 생성 및 설정 완료
- [ ] Firestore 보안 규칙 설정 완료
- [ ] 개발 서버 실행 성공
- [ ] 테스트 예약 생성 성공
- [ ] Firebase Console에서 데이터 확인 완료

모두 체크되었다면 설정 완료입니다! 🎉

