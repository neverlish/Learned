var nconf = require('nconf');
nconf.env();

console.log('JAVA_HOMe 환경 변수의 값 : %s', nconf.get('JAVA_HOME'));
