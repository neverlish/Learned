var listuser = function(req, res) {
  var database = req.app.get('database');

  if (database) {
    database.UserModel.findAll(function(err, results) {
      if (err) {
        callback(err, null);
        return;
      }

      if (results) {
        console.dir(results);

        res.writeHead('200', {'Content-Type': 'application/json; charset=utf8'});
        res.write(JSON.stringify(results));
        res.end();
      } else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 리스트 조회 실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
}

module.exports.listuser = listuser;
