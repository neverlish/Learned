## 1 아마존 S3에서 정적 파일 서비스

### 버킷 생성
- 버킷 네임: 도메인 이름과 같게 설정(예: jinhohyeon.com)
- 퍼블릭 권한 관리 - 모두 읽기 가능

### 웹 호스팅 활성화
- 버킷 속성 - 정적 웹 사이트 호스팅 -> 활성화
  - '이 버킷을 사용해 웹사이르르 호스팅한다'
    - 인덱스 문서: index.html
    - 오류 문서: error.html
    - 리디렉션 규칙
    ```
    <RoutingRules>
      <RoutingRule>
        <Condition>
          <HttpErrorCodeReturnedEquals>
            404
          </HttpErrorCodeReturnedEquals>
        </Condition>
        <Redirect>
          <ReplaceKeyWith>not-found.html</ReplaceKeyWith>
        </Redirect>
      </RoutingRule>
    </RoutingRules>
    ```

### 오류 처리

#### 리다이렉션 이용
- 리디렉션 규칙 변경
```
<RoutingRules>
  <RoutingRule>
    <Condition>
      <HttpErrorCodeReturnedEquals>
        404
      </HttpErrorCodeReturnedEquals>
    </Condition>
    <Redirect>
      <ReplaceKeyPrefixWith>#!/</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>
</RoutingRules>
```

### www 앵커
- 버킷 생성: www.jinhohyeon.com
  - 정적 웹 사이트 호스팅 - 요청 리디렉션
    - 대상 버킷 또는 도메인: jinhohyeon.com

### 정적 파일 업로드
- index.html 업로드
  - 퍼블릭 권한 관리: 이 객체에 퍼블릭 읽기 액세스 권한을 부여함

### 웹사이트 자동 배포
- `aws s3 sync ./path/to/folder s3://my-bucket-name --acl public-read`

## 2 루트 53 설정

### 호스팅 영역 생성
- AWS Route53 페이지 - DNS 관리 -> 지금 시작하기
- Create Hosted Zone
  - Domain name: jinhohyeon.com -> Create

### 레코드 셋 생성
- jinhohyeon.com, www.jinhohyeon.com 두 개의 레코드 셋 생성
  - Create Record Set
    - 첫번째 레코드
      - Name: 빈칸
      - 타입: A - IPv4 address
      - 별칭: YES
      - 별칭 타겟 : S3 버킷 엔드포인트
    - 두번쩨 레코드
      - Name: www
      - 타입: CNAME - Canonical name
      - 별칭: No
      - 값: www.jinhohyeon.com.s3-website.ap-northeast-2.amazonaws.com

## 3 클라우드프론트 설정

### 클라우드프론트 배포 생성
- CloudFront -> Create Distribution
  - Web -> Get Started
    - Origin Settings
      - Origin Domain Name 설정 -> Origin ID는 자동으로 설정됨
    - Default Cache Behavior Settings
      - Viewer Protocol Policy: HTTP and HTTPS
      - Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
      - Cached HTTP Methods: OPTIONS 체크
      - Object Caching: Use Origin Cache Headers
      - Compress Objects Automatically: Yes
    - Distribution Settings
      - Alternate Domain Name(CNAMEs): jinhohyeon.com, www.jinhohyeon.com
    - Create Distribution

### 클라우드프론트 캐싱 관리
- 모든 파일의 캐시 무효화 요청
  - `$ aws cloudfront create-invalidation --distribution-id=DISTRIBUTION_ID --paths /*`
- 클라이언트 캐시 무효화
  - `$ aws s3 cp index.html s3://my-bucket-name --cache-control no-cache --acl public-read

## 4 HTTPS 지원 설정

### 메일 익스체인지 레코드 생성
- www.zoho.com/mail에서 비즈니스 계정 생성
  - 도메인 주소 입력
  - 관리자 계정명은 admin
- Verify -> ...from the list: Others
  - CNAME Method 선택
  - CNAME, Destination 표시 테이블의 값으로 루트 53 레코드 셋 생성 후 Process to CNAME Verification
- 계정 추가 -> Create Account -> Process
- zoho에서 Configure Email Delivery로 이동
  - MX Records 테이블 확인
  - 방금 생성한 라우트53 레코드 셋은 삭제
  - 위 테이블의 값들로 MX 타입의 새로운 레코드 셋을 생성(예: 10 mx.zoho.com\n20 mx2.zoho.com)

### AWS 인증서 관리자에게 무료 인증서 요청하기
- AWS Certification managet -> 인증서 프로비저닝 시작하기 -> 인증서 요청
  - 도메인 이름이 URL 2개 추가(jinhohyeon.com, www.jinhohyeon.com)
  - 이메일 검증 -> zoho admin 계정 메일함에서 링크 수신 후 확인 링크 클릭
