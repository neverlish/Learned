// 반복 테스트와 초기화에 필요한 메서드
describe('테스트 블록', function() {
  before(function() {
    // 이 블록 안 테스트들을 실행하기에 앞서 한 번 실행되는 부분
  });

  after(function() {
    // 이 블록 안 테스트들을 모두 실행한 후에 한 번 실행되는 부분
  });

  beforeEach(function() {
    // 이 블록 안 각 테스트가 실행되기 전에 실행
  });

  afterEach(function() {
    // 이 블록 안 각 테스트가 실행된 후에 실행
  });

  // 테스트 코드
});
