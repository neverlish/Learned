console.log([
  process.version, // v8.11.3 설치된 노드의 버전입니다.
  process.arch, // x64 프로세서 아키텍처 정보입니다. arm, ia32 등의 값일 수도 있습니다.
  process.platform, // darwin 운영체제 플랫폼 정보입니다. linux나 darwin, freebsed 등의 값일 수도 있습니다.
  process.pid, // 59606 현재 프로세스의 아이디입니다. 프로세스를 여러 개 가질 때 구분할 수 있습니다.
  process.uptime(), // 0.062 프로세스가 시작된 후 흐른 시간입니다. 단위는 초입니다.
  process.execPath, // 노드의 경로입니다
  process.cwd(), // 현재 프로세스가 실행되는 위치입니다.
].join('\n'));

console.dir(process.cpuUsage()); // { user: 55250, system: 15732 } 현재 cpu 사용량입니다
