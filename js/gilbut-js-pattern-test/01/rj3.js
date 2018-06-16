// SVG 라인을 생성하는 함수

// 다른 전역 변수와 충돌을 피하기 위해 이름공간을 생성한다.
var rj3 = {};

// svg라는 하위 이름공간을 만든다.
rj3.svg = {};

// rj3.svg 이름공간에 line 함수를 넣는다.
rj3.svg.line = function() {
  var getX = function(point) {
        return point[0];
      },
      getY = function(point) {
        return point[1];
      },
      interpolate = function(points) {
        return points.join('L');
      };

  function line(data) {
    var segments = [],
        points = [],
        i = -1,
        n = data.length,
        d;

    function segment() {
      segments.push('M', interpolate(points));
    }

    while (++i < n) {
      d = data[i];
      points.push([+getX.call(this, d, i), +getY.call(this, d, i)]);
    }

    if (points.length) {
      segment();
    }

    return segments.length ? segments.join('') : null;
  }

  line.x = function(functoGetX) {
    if (!arguments.length) return getX;
    getX = functoGetX;
    return line;
  };

  line.y = function(functoGetY) {
    if (!arguments.length) return getY;
    getY = functoGetY;
    return line;
  };

  return line;
};
