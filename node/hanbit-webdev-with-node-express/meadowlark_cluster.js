var cluster = require('cluster');
function startWorker() {
  var worker = cluster.fork();
  console.log('CLUSTER: Worker %d started', worker.id);
}
if (cluster.isWorker) {
  require('os').cpus().forEach(function() {
    startWorker();
  });
  // 연결이 끊기는 워커를 기록합니다. 워커의 연결이 끊기면 종료해야 하므로, exit 이벤트가 발생하길 기다렸다가 새 워커를 만들어 대체합니다.
  cluster.on('disconnect', function(worker) {
    console.log('CLUSTER: Worker %d disconnected from the cluster.', worker.id);
  });
  // 워커가 종료되면 새 워커를 만들어 대체합니다.
  cluster.on('exit', function(worker, code, signal) {
    console.log('CLUSTER: Worker %d died with exit code %d (%s)', worker.id, code, signal);
    startWorker();
  });
} else {
  // 워커에서 앱을 시작합니다. meadowlark.js 참고
  require('./meadowlark.js')();
}
