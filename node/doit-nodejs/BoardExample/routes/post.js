var Entities = require('html-entities').AllHtmlEntities;

var addpost = function(req, res) {
  console.log('post 모듈 안에 있는 addpost 호출됨.');

  var paramTitle = req.param('title');
  var paramContents = req.param('contents');
  var paramWriter = req.param('writer');
  var database = req.app.get('database');
  
  if (database.db) {
    // 1. 아이디를 이용해 사용자 검색
    database.UserModel.findById(paramWriter, function(err, result) {
      if(err) {throw err;}

      if(result == undefined || result.length < 1) {
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>사용자 [' + paramWriter + '] 를 찾을 수 없습니다.</h2>');
        res.end();
        return;
      }

      var userObjectId = result._id;
      console.log('사용자 ObjectId : ' + paramWriter + ' -> ' + userObjectId);

      // save()로 저장
      var post = new database.PostModel({
        title: paramTitle,
        contents: paramContents,
        writer: userObjectId
      });

      post.savePost(function(err, result) {
        if(err) {throw err;}

        console.log('글 데이터 추가함.');
        console.log(result);
        console.log('글 작성', '포스팅 글을 생성했습니다. : ' + post._id);

        return res.redirect('/process/showpost/' + post._id);
      })
    })
  }
};

var showpost = function(req, res) {
  console.log('post 모듈 안에 있는 showpost 호출됨.');

  var paramId = req.param('id');
  console.log('전달 받은 id : ' + paramId);

  var database = req.app.get('database');

  if (database.db) {
    // 1. 글 조회
    database.PostModel.load(paramId, function(err, results) {
      if(err) {throw err;}

      if(results) {
        console.dir(results);
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});

        // 뷰 템플릿을 사용하여 렌더링한 후 전송
        var context = {
          title: '글 조회',
          posts: results,
          Entities: Entities
        };

        req.app.render('showpost', context, function(err, html) {
          if(err) {throw err;}
          console.log('응답 웹 문ㅁ서 : ' + html);
          res.end(html);
        });
      }
    })
  }
};

module.exports.addpost = addpost;
module.exports.showpost = showpost;
