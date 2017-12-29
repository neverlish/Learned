// 5 실전코드조각1 - 2 효율 높이기

var _ = require('../partial');
var {users, posts, comments} = require('./data');

// 5. users + posts + comments (index_by와 group_by로 효율 높이기)

var users2 = _.index_by(users, 'id');
/*
{ '101': { id: 101, name: 'ID' },
  '102': { id: 102, name: 'BJ' },
  '103': { id: 103, name: 'PJ' },
  '104': { id: 104, name: 'HA' },
  '105': { id: 105, name: 'JE' },
  '106': { id: 106, name: 'JI' } }
*/

function find_user_by_id(user_id) {
  // return _.find(users, function(user) {
  //   return user.id === user_id;
  // });
  return users2[user_id];
}

/*
var comments2 = _.map(comments, function(comment) {
  return _.extend({
    // user: _.find(users, function(user) {
    //   return user.id === comment.user_id;
    // })
    user: find_user_by_id(comment.user_id)
  }, comment);
});
*/
var comments2 = _.go(
  comments,
  _.map(function(comment) {
    return _.extend({
      user: find_user_by_id(comment.user_id)
    }, comment)
  }),
  _.group_by('post_id'));

/*
var posts2 = _.map(posts, function(post) {
  // return _.extend({
  //   user: find_user_by_id(post.user_id)
  // }, post)
  return _.extend({
    comments: comments2[post.id],
    user: find_user_by_id(post.user_id)
  }, post);
});
*/

var posts2 = _.go(
  posts,
  _.map(function(post) {
    return _.extend({
      comments: comments2[post.id],
      user: find_user_by_id(post.user_id)
    }, post);
  }));

var posts3 = _.group_by(posts2, 'user_id');

var users3 = _.map(users2, function(user) {
  return _.extend({
    // posts: _.filter(posts2, function(post) {
    //   return post.user_id == user.id;
    // })
    posts: posts3[user.id] || []
  }, user);
});

console.log(users3);
/*
[ { posts: [ [Object], [Object] ], id: 101, name: 'ID' },
  { posts: [ [Object], [Object] ], id: 102, name: 'BJ' },
  { posts: [ [Object] ], id: 103, name: 'PJ' },
  { posts: [], id: 104, name: 'HA' },
  { posts: [], id: 105, name: 'JE' },
  { posts: [], id: 106, name: 'JI' } ]
*/

// 5.1 특정인의 posts의 모든 comments 거르기
var user = users3[0];
/*
_.go(user.posts,
  _.pluck('comments'),
  console.log);
*/
console.log(_.deep_pluck(user, 'posts.comments'));
/*
[ [ { user: [Object],
      id: 301,
      body: '댓글1',
      user_id: 105,
      post_id: 201 },
    { user: [Object],
      id: 302,
      body: '댓글2',
      user_id: 104,
      post_id: 201 },
    { user: [Object],
      id: 310,
      body: '댓글10',
      user_id: 105,
      post_id: 201 } ],
  [ { user: [Object],
      id: 307,
      body: '댓글7',
      user_id: 102,
      post_id: 205 } ] ]
*/

// 5.2 특정인의 posts에 comments를 단 친구의 이름들 뽑기
/*
_.go(user.posts,
  _.pluck('comments'),
  _.flatten,
  _.pluck('user'),
  _.pluck('name'),
  _.uniq,
  console.log); 
// console.log(_.uniq(_.deep_pluck(user, 'posts.comments.user.name')));
*/

_.go(user, _.deep_pluck('posts.comments.user.name'), _.uniq, console.log); // [ 'JE', 'HA', 'BJ' ]


// 5.3 특정인의 posts에 comment를 단 친구들 카운트 정보
/*
_.go(user.posts,
  _.pluck('comments'),
  _.flatten,
  _.pluck('user'),
  _.pluck('name'),
  _.count_by,
  console.log); 
*/
_.go(user, _.deep_pluck('posts.comments.user.name'), _.count_by, console.log);
  
// { JE: 2, HA: 1, BJ: 1 }

// 5.4 특정인이 comment를 단 posts 거르기

console.log(
  _.filter(posts2, function(post) {
    return _.find(post.comments, function(comment) {
      return comment.user_id === 105;
    });
  })
);
/*
[ { comments: [ [Object], [Object], [Object] ],
    user: { id: 101, name: 'ID' },
    id: 201,
    body: '내용1',
    user_id: 101 },
  { comments: [ [Object], [Object] ],
    user: { id: 103, name: 'PJ' },
    id: 203,
    body: '내용3',
    user_id: 103 } ]
*/
