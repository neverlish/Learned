// 08 Collect Related Strings in a String Enum in TypeScript

const enum MediaTypes {
  JSON = 'application/json'
} // preserveConstEnums일 때, const를 붙일 때와 아닐때, js로 컴파일된 결과가 다름

enum Ports {
  SSL = 443
}

fetch('https://example.com/api/endpoint', {
  // headers: {
  //   Accept: MediaTypes.JSON
  // }
}).then(function(response) {
  // ....
});
