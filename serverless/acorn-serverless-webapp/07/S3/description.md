## 3 아마존 S3(미디어 파일용)

### 파일 업로드와 다운로드
- 파일 업로드 시 CORS 사용
  - 버킷 속성 - Permissions - CORS 구성
    - `<AllowMethod>POST</AllowedPost>` 추가
