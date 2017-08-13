console.log('handler_info 파일 로딩됨.');

var handler_info = [
  {file: './echo', method: 'echo'},
  {file: './echo_error', method: 'echo_error'},
  {file: './add', method: 'add'},
  {file: './listuser', method: 'listuser'},
  {file: './echo_encrypted', method: 'echo_encrypted'}
];

module.exports = handler_info;
