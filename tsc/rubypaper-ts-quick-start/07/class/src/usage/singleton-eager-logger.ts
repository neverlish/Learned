// 07-3-5 정적 변수와 정적 메서드 - 정적 변수와 정적 메서드를 싱글턴 패턴에 적용하기 - 부지런한 초기화를 수행하는 EagerLogger 클래스

class EagerLogger {
  // #1 부지런한 초기화
  private static uniqueObject: EagerLogger = new EagerLogger();

  // #2 private을 붙여 객체로 생성되지 않도록 함
  private EagerLogger() { }

  // #3 static을 붙여 외부 접근을 가능케 함
  public static getLogger(): EagerLogger {
    return this.uniqueObject;
  }

  // #4 정보 로그를 출력
  public info(message: string) {
    console.log(`[info] ${message}`);
  }

  // #5 경고 로그를 출력
  public warnning(message: string) {
    console.log(`[warn] ${message}`);
  }
}

// #6 유일한 객체를 얻고 메서드(info, warnning)를 사용함
let eagerLogger: EagerLogger = EagerLogger.getLogger();
let eagerLogger2: EagerLogger = EagerLogger.getLogger();

eagerLogger.info('1번 : 정보 log'); // [info] 1번 : 정보 log
eagerLogger.warnning('2번 : 경고 log'); // [warn] 2번 : 경고 log
eagerLogger.info(`3번 : ${eagerLogger === eagerLogger2}`); // [info] 3번 : true
