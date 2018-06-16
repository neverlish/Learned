// 외부 객체에서 값을 얻게끔 라인 생성기를 확장

rj3.svg.samples = {};

rj3.svg.samples.functionBasedLine = function functionBasedLine() {
  var firstXCode = 10,
      xDistanceBetweenPoints = 50,
      lineGenerator,
      svgHeight = 200; // 이렇게 하면 안됨

  lineGenerator = rj3.svg.line()
    .x(function(d, i) { return firstXCode + i * xDistanceBetweenPoints; })
    .y(function(d) { return svgHeight - this.getValue(d); });

  return lineGenerator;
};

(function() {
  var yearlyPriceGrapher = {
        lineGenerator: rj3.svg.samples.functionBasedLine(),
        getValue: function getValue(year) {
          // 마치 웹 서비스처럼 호출합니다
          return 10 * Math.pow(1.8, year - 2010);
        }
      },
      years = [2010, 2011, 2012, 2013, 2014, 2015],
      path = yearlyPriceGrapher.lineGenerator(years);

  document.getElementById('pathFromFunction').setAttribute('d', path)
}());
