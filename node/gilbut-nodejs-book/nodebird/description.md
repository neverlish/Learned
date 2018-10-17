## 09 - 1 프로젝트 구조 갖추기
- `$ sequelize init`

## 09 - 2 데이터베이스 세팅하기

- `$ sequelize db:create`

## 09 - 3 Passport 모듈로 로그인 구현하기

#### 카카오개발자 키 획득
- Kakao 개발자 앱 만들기 -> REST API 키
- 설정 -> 일반 -> 플랫폼 추가
  - 주소: http://localhost:8001
  - Redirect path: /auth/kakao/callback
- 설정 -> 사용자 관리
  - ON, 이메일 '연결시 선택', 수집 목적 입력

## 15 - 1 서비스 운영을 위한 패키지
#### pm2
- pm2 목록 확인
  - `$ pm2 list`
- pm2 종료
  - `$ pm2 kill`
- 서버 재시작
  - `$ pm2 reload all`
