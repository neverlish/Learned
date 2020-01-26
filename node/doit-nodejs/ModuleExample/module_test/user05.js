// module.exports가 사용되면 exports는 무시됨
module.exports = {
  getUser: function() {
    return {id: 'test01', name: '소녀시대'};
  },
  group: {id: 'group01', name: '친구'}
}

exports.group = {id: 'group02', name: '가족'};
