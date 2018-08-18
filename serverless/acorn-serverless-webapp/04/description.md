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
