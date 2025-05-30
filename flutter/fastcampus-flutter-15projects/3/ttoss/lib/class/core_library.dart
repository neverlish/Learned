main() {
  // String content = '과일들: ';
  //
  // StringBuffer stringBuffer = StringBuffer(content);
  // stringBuffer.writeAll(['사과', '오렌지', '수박', '체리'], ', ');
  // print(stringBuffer.toString());

  final findNumberRegExp = RegExp(r'\d+');
  const exampleUriPath =
      '?param1=good&param2=33&param3=22.4&color[]=red&color[]=blue&color[]=3';

  // final matches = findNumberRegExp.allMatches(exampleUriPath);
  // for (final match in matches) {
  //   final matchedString = exampleUriPath.substring(match.start, match.end);
  //   print(matchedString);
  // }

  // final findHashTagRegExp = RegExp(r'(#[\d|A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ][^를 ]*)');
  // const hashContent = '문장에 #해를시 #태그를 찾아주세요. #플러터 #좋아유';
  //
  // final hashMatches = findHashTagRegExp.allMatches(hashContent);
  // for (final match in hashMatches) {
  //   final matchedString = hashContent.substring(match.start, match.end);
  //   print(matchedString);
  // }

  final uri = Uri.parse(exampleUriPath);

  print(uri.scheme);
  print(uri.host);
  print(uri.path);

  for (final pathSegment in uri.pathSegments) {
    print(pathSegment);
  }

  final params = uri.queryParametersAll;
  final param4 = params['color[]'];
  print(param4);
}
