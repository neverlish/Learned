## 3 아마존 S3(미디어 파일용)

### 파일 업로드와 다운로드
- 파일 업로드 시 CORS 사용
  - 버킷 속성 - Permissions - CORS 구성
    - `<AllowMethod>POST</AllowedPost>` 추가

### 데이터 백업과 복구
- 버전 관리
  - S3 버킷 - 속성 - 버전 관리
- 수명 주기
  - S3 버킷 - 관리 - 수명 주기
