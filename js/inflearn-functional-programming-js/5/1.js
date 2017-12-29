// 5 실전코드조각1 - 1 users, posts, comments

var _ = require('../partial');
var {users, posts, comments} = require('./data');

// 1. 특정인의 posts의 모든 comments 거르기

function posts_by(attr) {
  return _.where(posts, attr);
}

var comments_by_posts = _.pipe(
  _.pluck('id'),
  function(post_ids) {
    return _.filter(comments, function(comment) {
      return _.contains(post_ids, comment.post_id);
    });
  }
)

_.go(
  // _.filter(posts, function(post) {
  //   return post.user_id == 101;
  // }),
  posts_by({ user_id: 101 }),
  // _.pluck('id'),
  // function(posts) {
  //   return _.filter(comments, function(comment) {
  //     return _.find(posts, function(post) {
  //       return post.id === comment.post_id;
  //     });
  //   });
  // },
  comments_by_posts,
  console.log);
/*
[ { id: 301, body: '댓글1', user_id: 105, post_id: 201 },
  { id: 302, body: '댓글2', user_id: 104, post_id: 201 },
  { id: 310, body: '댓글10', user_id: 105, post_id: 201 } ]
*/


/*
_.go(
  // _.filter(posts, function(post) {
  //   return post.user_id == 101;
  // }),
  // _.where(posts, { user_id: 101 }),
  posts_by({ user_id: 101 }),
  // _.map(function(post) {
  //   return post.id
  // }),
  // _.pluck('id'),
  // function(post_ids) {
  //   return _.filter(comments, function(comment) {
  //     return _.contains(post_ids, comment.post_id);
  //   });
  // },
  comments_by_posts,
  console.log);
*/

var f1 = _.pipe(posts_by, comments_by_posts);

console.log(f1({user_id: 101}));

/*
[ { id: 301, body: '댓글1', user_id: 105, post_id: 201 },
  { id: 302, body: '댓글2', user_id: 104, post_id: 201 },
  { id: 310, body: '댓글10', user_id: 105, post_id: 201 } ]
*/

// 2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기

/*
_.go(
  posts_by({ user_id: 101 }),
  comments_by_posts,
  _.map(function(comment) {
    return _.find(users, function(user) {
      return user.id == comment.user_id;
    }).name;
  }),
  _.uniq,
  console.log); 
*/

var comments_to_user_names =  _.map(function(comment) {
  return _.find(users, function(user) {
    return user.id == comment.user_id;
  }).name;
})


var f2 = _.pipe(f1, comments_to_user_names, _.uniq,);

console.log(f2({user_id: 101})); // [ 'JE', 'HA', 'BJ' ]

// 3. 특정인의 posts에 comments를 단 친구들 카운트 정보
/*
_.go(
  posts_by({ user_id: 101 }),
  comments_by_posts,
  _.map(function(comment) {
    return _.find(users, function(user) {
      return user.id == comment.user_id;
    }).name;
  }),
  _.count_by,
  console.log); 
*/

var f3 = _.pipe(f1, comments_to_user_names, _.count_by);

console.log(f3({user_id: 101})); // { JE: 2, HA: 1, BJ: 1 }

// 4. 특정인이 comment를 단 posts 거르기

_.go(
  _.where(comments, { user_id: 105 }),
  _.pluck('post_id'),
  _.uniq,
  function(post_ids) {
    return _.filter(posts, function(post) {
      return _.contains(post_ids, post.id);
    });
  },
  console.log);
/*
[ { id: 201, body: '내용1', user_id: 101 },
  { id: 203, body: '내용3', user_id: 103 } ] 
*/

module.exports = {

}
