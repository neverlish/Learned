
var route_loader = {};

var config = require('../config');


route_loader.init = function(app) {
	console.log('route_loader.init 호출됨.');
	return initRoutes(app);
}

// route_info에 정의된 라우팅 정보 처리
function initRoutes(app) {

	var infoLen = config.route_info.length;
	console.log('설정에 정의된 라우팅 모듈의 수 : %d', infoLen);
 
	for (var i = 0; i < infoLen; i++) {
		var curItem = config.route_info[i];
			
		// 모듈 파일에서 모듈 불러옴
		var curModule = require(curItem.file);
		console.log('%s 파일에서 모듈정보를 읽어옴.', curItem.file);
		
		//  라우팅 처리
		if (curItem.type == 'get') {
			app.get(curItem.path, curModule[curItem.method]);
		} else if (curItem.type == 'post') {
			app.post(curItem.path, curModule[curItem.method]);
		} else {
			app.post(curItem.path, curModule[curItem.method]);
		}
		
		
		console.log('라우팅 모듈 [%s]이(가) 설정됨.', curItem.method);
	}

}

module.exports = route_loader;

